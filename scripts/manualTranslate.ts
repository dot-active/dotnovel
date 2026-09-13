import { PrismaClient } from '@prisma/client'
import { PrismaNeonHTTP } from '@prisma/adapter-neon'
import { neon, types } from '@neondatabase/serverless'
import * as fs from 'fs'
import * as path from 'path'
import { simplifiedToTraditional, traditionalToSimplified } from '../src/lib/opencc'

// Manual translation workflow — never calls the Anthropic API, so it costs no
// Claude Console tokens. The translating itself is done by Claude Code (in a
// chat session or a scheduled cloud routine); this script only moves text
// between the DB and local files.
//
//   list                 show queued manual requests (status translating/processing)
//   export <requestId>   zh-CN↔zh-TW: convert with OpenCC and finish immediately
//                        other locales: write the remaining source chapters to
//                        content/manual-translations/<requestId>/NNN-<chapterId>.src.txt
//   import <requestId>   read every NNN-<chapterId>.out.txt present, upsert
//                        ChapterTranslation, and complete the request once no
//                        chapters remain (safe to run repeatedly / in batches)
//   cancel <requestId>   mark the request failed so the chapters page unlocks
//
// Progress lives in the DB, not on disk: each imported chapter is removed from
// TranslationRequest.chapterIds, so a later run — possibly on a fresh cloud
// checkout with none of the earlier files — exports only what is left.
//
// File format (both .src.txt and .out.txt): title on the first line, then the
// separator line, then the content. The separator is deliberately not "---",
// which novels use as a scene divider.

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
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL 未设置（本地放 .env，云端在环境变量里配置）')
  types.setTypeParser(types.builtins.TIMESTAMP, (v: string) => v)
  types.setTypeParser(types.builtins.TIMESTAMPTZ, (v: string) => v)
  types.setTypeParser(types.builtins.DATE, (v: string) => v)
  const sql = neon(process.env.DATABASE_URL)
  const adapter = new PrismaNeonHTTP(sql)
  return new PrismaClient({ adapter })
}

const prisma = createPrismaClient()

const SEPARATOR = '=====CONTENT====='
const WORK_ROOT = path.join(process.cwd(), 'content/manual-translations')
const ZH_LOCALES = new Set(['zh-CN', 'zh-TW'])

function serialize(title: string, content: string): string {
  return `${title}\n${SEPARATOR}\n${content}\n`
}

function parse(file: string): { title: string; content: string } {
  const raw = fs.readFileSync(file, 'utf-8').replace(/\r\n/g, '\n')
  const lines = raw.split('\n')
  const sepIdx = lines.findIndex((l) => l.trim() === SEPARATOR)
  if (sepIdx === -1) throw new Error(`${path.basename(file)} 缺少分隔行 ${SEPARATOR}`)
  const title = lines.slice(0, sepIdx).join('\n').trim()
  const content = lines.slice(sepIdx + 1).join('\n').replace(/\n+$/, '')
  if (!title) throw new Error(`${path.basename(file)} 标题为空`)
  if (!content.trim()) throw new Error(`${path.basename(file)} 正文为空`)
  return { title, content }
}

async function loadRequest(requestId: string | undefined) {
  if (!requestId) throw new Error('缺少 requestId，先运行 list 查看')
  const request = await prisma.translationRequest.findUnique({
    where: { id: requestId },
    include: { novel: { select: { id: true, title: true, sourceLocale: true } } },
  })
  if (!request) throw new Error(`找不到任务 ${requestId}`)
  if (request.source !== 'manual') throw new Error(`任务 ${requestId} 不是手动翻译任务（source=${request.source}）`)
  if (request.status !== 'translating' && request.status !== 'processing') {
    throw new Error(`任务 ${requestId} 当前状态为 ${request.status}，不在待翻译队列中`)
  }
  return request
}

/**
 * The chapters still left on the request, in reading order. A chapter deleted
 * after the job was queued can never be imported, so it is dropped here —
 * otherwise the request would wait on it forever.
 */
async function loadRemainingChapters(
  request: { id: string; chapterIds: string[]; totalChapters: number },
  sourceLocale: string
) {
  const chapters = await prisma.chapter.findMany({
    where: { id: { in: request.chapterIds } },
    include: { translations: { where: { locale: sourceLocale } } },
    orderBy: { order: 'asc' },
  })
  if (chapters.length !== request.chapterIds.length) {
    const remaining = chapters.map((c) => c.id)
    await prisma.translationRequest.update({
      where: { id: request.id },
      data: { chapterIds: remaining, doneChapters: Math.max(0, request.totalChapters - remaining.length) },
    })
    console.log(`  ⚠️ ${request.chapterIds.length - chapters.length} 个章节已被删除，已从任务中移除`)
    request.chapterIds = remaining
  }
  // Source text follows the Trigger.dev task: the sourceLocale translation row, else the Chapter itself.
  return chapters.map((c) => ({
    id: c.id,
    order: c.order,
    title: c.translations[0]?.title ?? c.title,
    content: c.translations[0]?.content ?? c.content,
  }))
}

function fileBase(order: number, chapterId: string): string {
  return `${String(order).padStart(3, '0')}-${chapterId}`
}

/**
 * Writes one chapter's translation and ticks it off the request in the same
 * step, so progress survives a crash or the end of a cloud session. If the
 * process dies between the two writes the chapter is simply redone next run —
 * the upsert is idempotent.
 */
async function saveChapter(
  request: { id: string; chapterIds: string[]; totalChapters: number },
  targetLocale: string,
  chapterId: string,
  title: string,
  content: string
) {
  // Same semantics as the Trigger.dev task: new rows start as draft, an
  // existing row keeps its publish status and only gets new text.
  await prisma.chapterTranslation.upsert({
    where: { chapterId_locale: { chapterId, locale: targetLocale } },
    create: { chapterId, locale: targetLocale, title, content, status: 'draft' },
    update: { title, content },
  })

  const remaining = request.chapterIds.filter((id) => id !== chapterId)
  const complete = remaining.length === 0
  await prisma.translationRequest.update({
    where: { id: request.id },
    data: {
      chapterIds: remaining,
      doneChapters: Math.max(0, request.totalChapters - remaining.length),
      ...(complete ? { status: 'completed', errorMessage: null } : {}),
    },
  })
  request.chapterIds = remaining
  return complete
}

async function completeIfEmpty(request: { id: string; chapterIds: string[] }) {
  if (request.chapterIds.length > 0) return false
  await prisma.translationRequest.update({
    where: { id: request.id },
    data: { status: 'completed', errorMessage: null },
  })
  return true
}

async function cmdList() {
  const requests = await prisma.translationRequest.findMany({
    where: { source: 'manual', status: { in: ['translating', 'processing'] } },
    include: { novel: { select: { title: true, sourceLocale: true } } },
    orderBy: { createdAt: 'asc' },
  })
  if (requests.length === 0) {
    console.log('✅ 没有待手动翻译的任务')
    return
  }
  console.log(`📚 ${requests.length} 个待手动翻译任务：\n`)
  for (const r of requests) {
    console.log(`  ${r.id}`)
    console.log(`    小说：${r.novel.title}（${r.novelId}）`)
    console.log(
      `    ${r.novel.sourceLocale} → ${r.targetLocale}　状态：${r.status}　` +
        `已完成：${r.doneChapters}/${r.totalChapters}　剩余：${r.chapterIds.length} 章`
    )
  }
}

async function cmdExport(requestId: string | undefined) {
  const request = await loadRequest(requestId)
  const { sourceLocale } = request.novel
  const { targetLocale } = request
  const chapters = await loadRemainingChapters(request, sourceLocale)

  if (await completeIfEmpty(request)) {
    console.log('✅ 该任务没有剩余章节，已标记完成')
    return
  }

  // zh-CN ↔ zh-TW is a deterministic character conversion — no translation
  // needed, so finish the whole request right here.
  if (ZH_LOCALES.has(sourceLocale) && ZH_LOCALES.has(targetLocale) && sourceLocale !== targetLocale) {
    const convert = sourceLocale === 'zh-CN' ? simplifiedToTraditional : traditionalToSimplified
    for (const c of chapters) {
      await saveChapter(request, targetLocale, c.id, convert(c.title), convert(c.content))
      console.log(`  ✅ 第 ${c.order} 章（OpenCC）`)
    }
    console.log(`🎉 ${sourceLocale} → ${targetLocale} 简繁转换完成，任务已完成`)
    return
  }

  // Start from an empty directory: the request row is reused whenever a
  // locale is re-queued, so a leftover .out.txt from an earlier job would
  // otherwise be imported as if it were a fresh translation.
  const dir = path.join(WORK_ROOT, request.id)
  fs.rmSync(dir, { recursive: true, force: true })
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(
    path.join(dir, 'task.json'),
    JSON.stringify(
      {
        requestId: request.id,
        novelId: request.novelId,
        novelTitle: request.novel.title,
        sourceLocale,
        targetLocale,
        chapters: chapters.map((c) => ({ order: c.order, id: c.id, file: fileBase(c.order, c.id) })),
      },
      null,
      2
    ) + '\n',
    'utf-8'
  )
  for (const c of chapters) {
    fs.writeFileSync(path.join(dir, `${fileBase(c.order, c.id)}.src.txt`), serialize(c.title, c.content), 'utf-8')
  }
  console.log(`📤 已导出剩余 ${chapters.length} 章（${sourceLocale} → ${targetLocale}）到：`)
  console.log(`   ${dir}`)
  console.log(`   译文写入同名 .out.txt（可以只写一部分），然后运行 import ${request.id}`)
}

async function cmdImport(requestId: string | undefined) {
  const request = await loadRequest(requestId)
  const dir = path.join(WORK_ROOT, request.id)
  if (!fs.existsSync(dir)) throw new Error(`工作目录不存在，先运行 export ${request.id}`)

  const chapters = await loadRemainingChapters(request, request.novel.sourceLocale)

  // Parse everything before writing anything, so one malformed file fails the
  // run up front instead of after some chapters were already saved.
  const ready: { id: string; order: number; title: string; content: string }[] = []
  for (const c of chapters) {
    const out = path.join(dir, `${fileBase(c.order, c.id)}.out.txt`)
    if (fs.existsSync(out)) ready.push({ id: c.id, order: c.order, ...parse(out) })
  }

  for (const c of ready) {
    await saveChapter(request, request.targetLocale, c.id, c.title, c.content)
    console.log(`  ✅ 第 ${c.order} 章`)
  }

  if (await completeIfEmpty(request)) {
    console.log(`🎉 本次导入 ${ready.length} 章，任务已全部完成（章节为草稿状态，需在后台发布）`)
  } else {
    console.log(
      `⏳ 本次导入 ${ready.length} 章，还剩 ${request.chapterIds.length} 章，任务保持等待中（下次 export 只会导出剩余章节）`
    )
  }
}

async function cmdCancel(requestId: string | undefined) {
  const request = await loadRequest(requestId)
  await prisma.translationRequest.update({
    where: { id: request.id },
    data: { status: 'failed', errorMessage: 'Cancelled manually' },
  })
  console.log(`🛑 任务 ${request.id} 已取消`)
}

async function main() {
  const [command, arg] = process.argv.slice(2)
  switch (command) {
    case 'list':
      return cmdList()
    case 'export':
      return cmdExport(arg)
    case 'import':
      return cmdImport(arg)
    case 'cancel':
      return cmdCancel(arg)
    default:
      console.error('用法：npm run translate:manual -- <list | export <id> | import <id> | cancel <id>>')
      process.exitCode = 1
  }
}

main()
  .catch((err) => {
    console.error(`❌ ${err instanceof Error ? err.message : err}`)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
