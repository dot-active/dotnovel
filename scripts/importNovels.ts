import { PrismaClient } from '@prisma/client'
import { PrismaNeonHTTP } from '@prisma/adapter-neon'
import { neon, types } from '@neondatabase/serverless'
import * as fs from 'fs'
import * as path from 'path'

interface ClerkUser {
  id: string
  first_name: string | null
  last_name: string | null
  username: string | null
}

async function getAuthorNameFromClerk(userId: string): Promise<string> {
  const secretKey = process.env.CLERK_SECRET_KEY
  if (!secretKey) return userId

  try {
    const response = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.warn(`  ⚠️  未能从 Clerk 获取用户 ${userId}，使用默认值`)
      return userId
    }

    const user: ClerkUser = await response.json()
    return user.first_name || user.username || userId
  } catch (error) {
    console.warn(`  ⚠️  Clerk API 错误：${error instanceof Error ? error.message : '未知错误'}`)
    return userId
  }
}

// Load .env.local and .env (Next.js convention) before anything else
function loadEnvFiles() {
  for (const file of ['.env.local', '.env']) {
    const filePath = path.join(process.cwd(), file)
    if (!fs.existsSync(filePath)) continue
    const content = fs.readFileSync(filePath, 'utf-8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const idx = trimmed.indexOf('=')
      if (idx === -1) continue
      const key = trimmed.slice(0, idx).trim()
      const rawValue = trimmed.slice(idx + 1).trim()
      const value = rawValue.replace(/^["']|["']$/g, '')
      if (!process.env[key]) process.env[key] = value
    }
  }
}
loadEnvFiles()

function createPrismaClient() {
  // Same fix as lib/prisma.ts — Neon returns {} for timestamps without these parsers
  types.setTypeParser(types.builtins.TIMESTAMP, (v: string) => v)
  types.setTypeParser(types.builtins.TIMESTAMPTZ, (v: string) => v)
  types.setTypeParser(types.builtins.DATE, (v: string) => v)
  const sql = neon(process.env.DATABASE_URL!)
  const adapter = new PrismaNeonHTTP(sql)
  return new PrismaClient({ adapter })
}

const prisma = createPrismaClient()

/** Extract leading number from filename, e.g. "01-潘多拉魔盒.txt" → 1 */
function extractChapterNumber(filename: string): number | null {
  const match = filename.match(/^(\d+)/)
  return match ? parseInt(match[1], 10) : null
}

async function main() {
  const novelsDir = path.join(process.cwd(), 'content/novels')

  if (!fs.existsSync(novelsDir)) {
    console.error('❌ content/novels 目录不存在')
    process.exit(1)
  }

  const novelFolders = fs.readdirSync(novelsDir).filter(f =>
    fs.statSync(path.join(novelsDir, f)).isDirectory()
  )

  console.log(`找到 ${novelFolders.length} 个小说文件夹\n`)

  let createdNovels = 0
  let updatedNovels = 0
  let createdChapters = 0
  let updatedChapters = 0
  let failedNovels = 0

  for (const novelFolder of novelFolders) {
    try {
      const novelDir = path.join(novelsDir, novelFolder)
      const novelJsonPath = path.join(novelDir, 'novel.json')

      if (!fs.existsSync(novelJsonPath)) {
        console.warn(`⚠️  跳过 ${novelFolder}：缺少 novel.json`)
        continue
      }

      const novelData = JSON.parse(fs.readFileSync(novelJsonPath, 'utf-8'))
      console.log(`📚 处理小说：${novelFolder}`)

      // Primary locale for required Novel.title / Novel.description fields
      const locales = novelData.locales ?? {}
      const primaryLocale: string = locales['zh-CN'] ? 'zh-CN' : Object.keys(locales)[0] ?? 'zh-CN'
      const primaryLocaleData: any = locales[primaryLocale] ?? {}

      // Get author name from Clerk if authorId is available
      let authorName = novelData.author ?? novelFolder
      if (novelData.authorId) {
        authorName = await getAuthorNameFromClerk(novelData.authorId)
      }

      // Collect all titles for deduplication lookup
      const allTitles = (Object.values(locales) as any[])
        .map(l => l.title)
        .filter(Boolean) as string[]

      // --- Find existing novel ---
      let existingNovel: any = null
      if (allTitles.length > 0) {
        const existingTranslation = await prisma.novelTranslation.findFirst({
          where: {
            title: { in: allTitles },
            ...(novelData.authorId && { novel: { authorId: novelData.authorId } }),
          },
          include: { novel: true },
        })
        existingNovel = existingTranslation?.novel ?? null
      }

      let targetNovelId: string

      if (!existingNovel) {
        // ========================
        // CREATE novel
        // ========================
        const novel = await prisma.novel.create({
          data: {
            title: primaryLocaleData.title ?? novelFolder,
            author: authorName,
            description: primaryLocaleData.description,
            authorId: novelData.authorId,
            coverUrl: novelData.coverUrl,
            isAdult: novelData.isAdult ?? false,
            isFeatured: novelData.isFeatured ?? false,
            // novelStatus field: ONGOING | COMPLETED | HIATUS (enum)
            status: novelData.novelStatus ?? 'ONGOING',
            publishStatus: novelData.publishStatus ?? 'published',
            sourceLocale: novelData.sourceLocale ?? novelData.writingLanguage ?? primaryLocale,
          },
        })

        // Categories
        if (Array.isArray(novelData.categories)) {
          for (const slug of novelData.categories) {
            const cat = await prisma.category.findFirst({ where: { slug } })
            if (cat) {
              await prisma.novelCategory.create({
                data: { novelId: novel.id, categoryId: cat.id },
              })
            } else {
              console.warn(`  ⚠️  分类不存在：${slug}，跳过`)
            }
          }
        }

        // NovelTranslations for each locale
        for (const [locale, trans] of Object.entries(locales)) {
          await prisma.novelTranslation.create({
            data: {
              novelId: novel.id,
              locale,
              title: (trans as any).title,
              description: (trans as any).description ?? '',
              status: 'published',
            },
          })
        }

        targetNovelId = novel.id
        createdNovels++
        console.log(`  ✅ 创建小说 (id: ${novel.id}, sourceLocale: ${novel.sourceLocale})`)
      } else {
        // ========================
        // UPDATE novel
        // ========================
        targetNovelId = existingNovel.id

        const updateData: Record<string, any> = {}
        if (novelData.coverUrl !== undefined) updateData.coverUrl = novelData.coverUrl
        if (novelData.isAdult !== undefined) updateData.isAdult = novelData.isAdult
        if (novelData.isFeatured !== undefined) updateData.isFeatured = novelData.isFeatured
        if (novelData.publishStatus !== undefined) updateData.publishStatus = novelData.publishStatus
        if (novelData.novelStatus !== undefined) updateData.status = novelData.novelStatus
        if (novelData.authorId !== undefined) updateData.author = authorName
        // Always update sourceLocale if writingLanguage or sourceLocale is present in JSON
        if (novelData.sourceLocale !== undefined) {
          updateData.sourceLocale = novelData.sourceLocale
          console.log(`  📝 更新 sourceLocale: ${updateData.sourceLocale}`)
        } else if (novelData.writingLanguage !== undefined) {
          updateData.sourceLocale = novelData.writingLanguage
          console.log(`  📝 更新 sourceLocale (from writingLanguage): ${updateData.sourceLocale}`)
        }

        if (Object.keys(updateData).length > 0) {
          await prisma.novel.update({ where: { id: targetNovelId }, data: updateData })
        }

        // Update categories if specified
        if (Array.isArray(novelData.categories)) {
          await prisma.novelCategory.deleteMany({ where: { novelId: targetNovelId } })
          for (const slug of novelData.categories) {
            const cat = await prisma.category.findFirst({ where: { slug } })
            if (cat) {
              await prisma.novelCategory.create({
                data: { novelId: targetNovelId, categoryId: cat.id },
              })
            } else {
              console.warn(`  ⚠️  分类不存在：${slug}，跳过`)
            }
          }
        }

        // Upsert NovelTranslations
        for (const [locale, trans] of Object.entries(locales)) {
          await prisma.novelTranslation.upsert({
            where: { novelId_locale: { novelId: targetNovelId, locale } },
            update: {
              ...((trans as any).title && { title: (trans as any).title }),
              ...((trans as any).description !== undefined && {
                description: (trans as any).description,
              }),
            },
            create: {
              novelId: targetNovelId,
              locale,
              title: (trans as any).title,
              description: (trans as any).description ?? '',
              status: 'published',
            },
          })
        }

        updatedNovels++
        const updatedNovel = await prisma.novel.findUnique({ where: { id: targetNovelId } })
        console.log(`  🔄 更新小说 (id: ${targetNovelId}, sourceLocale: ${updatedNovel?.sourceLocale})`)
      }

      // ========================
      // CHAPTERS
      // ========================
      const chaptersDir = path.join(novelDir, 'chapters')
      if (!fs.existsSync(chaptersDir)) {
        console.log(`  ℹ️  无 chapters 目录，跳过章节导入`)
        continue
      }

      const localeFolders = fs.readdirSync(chaptersDir).filter(f =>
        fs.statSync(path.join(chaptersDir, f)).isDirectory()
      )

      if (localeFolders.length === 0) {
        console.log(`  ℹ️  无语言目录，跳过章节导入`)
        continue
      }

      // Build map: chapterNumber → Map<locale, filePath>
      // Chapter files can have locale-specific names; we match by leading number prefix
      const chapterMap = new Map<number, Map<string, string>>()

      for (const locale of localeFolders) {
        const localeDir = path.join(chaptersDir, locale)
        const files = fs.readdirSync(localeDir)
          .filter(f => f.endsWith('.txt'))
          .sort()

        for (const file of files) {
          const num = extractChapterNumber(file)
          if (num === null) continue
          if (!chapterMap.has(num)) chapterMap.set(num, new Map())
          chapterMap.get(num)!.set(locale, path.join(localeDir, file))
        }
      }

      const sortedOrders = Array.from(chapterMap.keys()).sort((a, b) => a - b)
      console.log(`  📖 ${sortedOrders.length} 章节，语言：${localeFolders.join(', ')}`)

      for (let i = 0; i < sortedOrders.length; i++) {
        const order = sortedOrders[i]
        const localeFiles = chapterMap.get(order)!

        // Primary locale content → Chapter.title / Chapter.content (required fields)
        const primaryChapterLocale = localeFiles.has('zh-CN')
          ? 'zh-CN'
          : localeFiles.keys().next().value!
        const primaryFilePath = localeFiles.get(primaryChapterLocale)!
        const primaryRaw = fs.readFileSync(primaryFilePath, 'utf-8')
        const primaryLines = primaryRaw.split('\n')
        const primaryTitle = primaryLines[0].trim()
        const primaryBody = primaryLines.slice(1).join('\n').trim()

        // Upsert Chapter main record
        const existingChapter = await prisma.chapter.findUnique({
          where: { novelId_order: { novelId: targetNovelId, order } },
        })

        let chapterId: string
        if (!existingChapter) {
          const chapter = await prisma.chapter.create({
            data: {
              novelId: targetNovelId,
              order,
              title: primaryTitle,
              content: primaryBody,
            },
          })
          chapterId = chapter.id
          createdChapters++
        } else {
          await prisma.chapter.update({
            where: { id: existingChapter.id },
            data: { title: primaryTitle, content: primaryBody },
          })
          chapterId = existingChapter.id
          updatedChapters++
        }

        // Upsert ChapterTranslation for each locale that has this chapter
        for (const [locale, filePath] of localeFiles.entries()) {
          const raw = fs.readFileSync(filePath, 'utf-8')
          const lines = raw.split('\n')
          const title = lines[0].trim()
          const content = lines.slice(1).join('\n').trim()

          await prisma.chapterTranslation.upsert({
            where: { chapterId_locale: { chapterId, locale } },
            update: { title, content },
            create: { chapterId, locale, title, content, status: 'published' },
          })
        }

        process.stdout.write(`\r  📄 进度：${i + 1}/${sortedOrders.length}`)
      }

      console.log() // newline after progress line

    } catch (error) {
      console.error(`\n❌ 导入失败：${novelFolder}`, error)
      failedNovels++
    }
  }

  console.log('\n=== 导入完成 ===')
  console.log(`✅ 新建小说：${createdNovels} 本`)
  console.log(`🔄 更新小说：${updatedNovels} 本`)
  console.log(`✅ 新建章节：${createdChapters} 章`)
  console.log(`🔄 更新章节：${updatedChapters} 章`)
  console.log(`❌ 失败：${failedNovels} 本`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
