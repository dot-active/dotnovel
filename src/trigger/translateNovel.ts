import { task } from '@trigger.dev/sdk/v3'
import Anthropic from '@anthropic-ai/sdk'
import { PrismaClient } from '@prisma/client'
import { PrismaNeonHTTP } from '@prisma/adapter-neon'
import { neon, types } from '@neondatabase/serverless'
import { simplifiedToTraditional, traditionalToSimplified } from '../lib/opencc'

types.setTypeParser(types.builtins.TIMESTAMP, (v: string) => v)
types.setTypeParser(types.builtins.TIMESTAMPTZ, (v: string) => v)
types.setTypeParser(types.builtins.DATE, (v: string) => v)

function createPrisma() {
  const sql = neon(process.env.DATABASE_URL!)
  const adapter = new PrismaNeonHTTP(sql)
  return new PrismaClient({ adapter })
}

const LOCALE_NAMES: Record<string, string> = {
  'zh-CN': '简体中文',
  'zh-TW': '繁体中文',
  'en': 'English',
  'ja': '日本語',
  'ko': '한국어',
  'es': 'Español',
}

export const translateNovel = task({
  id: 'translate-novel',
  maxDuration: 3600,
  run: async (payload: { translationRequestId: string; novelId: string; targetLocale: string }) => {
    const { translationRequestId, novelId, targetLocale } = payload
    const prisma = createPrisma()
    const targetLang = LOCALE_NAMES[targetLocale] ?? targetLocale

    async function translateWithClaude(text: string): Promise<string> {
      const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, timeout: 120_000 })
      const msg = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: `你是专业小说翻译，将内容翻译成${targetLang}，保持文学风格，只输出翻译结果。`,
        messages: [{ role: 'user', content: text }],
      })
      const block = msg.content[0]
      return block.type === 'text' ? block.text : ''
    }

    try {
      // 1. Mark as processing
      await prisma.translationRequest.update({
        where: { id: translationRequestId },
        data: { status: 'processing' },
      })

      // 2. Fetch source novel — include all non-target translations (any status) as source candidates
      const novel = await prisma.novel.findUniqueOrThrow({
        where: { id: novelId },
        include: {
          translations: { where: { locale: { not: targetLocale } } },
          chapters: {
            orderBy: { order: 'asc' },
            include: {
              // Include all non-target translations regardless of status so we always
              // have source text even when the author saved chapters as draft
              translations: { where: { locale: { not: targetLocale } } },
            },
          },
        },
      })

      // Prefer the novel's own sourceLocale as the translation source
      const srcNovelTr =
        novel.translations.find(t => t.locale === novel.sourceLocale) ??
        novel.translations[0]
      if (!srcNovelTr) throw new Error('No novel translation found as source')

      // All published chapters — fall back to chapter.title/content if no ChapterTranslation exists
      const chapters = novel.chapters
      const totalChapters = chapters.length

      await prisma.translationRequest.update({
        where: { id: translationRequestId },
        data: { totalChapters },
      })

      const convertZh = (text: string, src: string) =>
        src === 'zh-CN' ? simplifiedToTraditional(text) : traditionalToSimplified(text)

      const sourceLocale = srcNovelTr.locale

      const zhLocales = new Set(['zh-CN', 'zh-TW'])
      if (zhLocales.has(sourceLocale) && zhLocales.has(targetLocale) && sourceLocale !== targetLocale) {
        // 3a. OpenCC path: zh-CN ↔ zh-TW
        await prisma.novelTranslation.upsert({
          where: { novelId_locale: { novelId, locale: targetLocale } },
          create: {
            novelId,
            locale: targetLocale,
            title: convertZh(srcNovelTr.title, sourceLocale),
            description: convertZh(srcNovelTr.description, sourceLocale),
            status: 'draft',
          },
          update: {
            title: convertZh(srcNovelTr.title, sourceLocale),
            description: convertZh(srcNovelTr.description, sourceLocale),
            status: 'draft',
          },
        })

        for (const chapter of chapters) {
          // Prefer sourceLocale translation; fall back to any other translation, then native fields
          const srcTr =
            chapter.translations.find(t => t.locale === sourceLocale) ??
            chapter.translations[0]
          const srcTitle = srcTr?.title ?? chapter.title
          const srcContent = srcTr?.content ?? chapter.content

          await prisma.chapterTranslation.upsert({
            where: { chapterId_locale: { chapterId: chapter.id, locale: targetLocale } },
            create: {
              chapterId: chapter.id,
              locale: targetLocale,
              title: convertZh(srcTitle, sourceLocale),
              content: convertZh(srcContent, sourceLocale),
              status: 'draft',
            },
            update: {
              title: convertZh(srcTitle, sourceLocale),
              content: convertZh(srcContent, sourceLocale),
              status: 'draft',
            },
          })
        }
      } else {
        // 3b. Claude API path
        const [translatedTitle, translatedDesc] = await Promise.all([
          translateWithClaude(srcNovelTr.title),
          translateWithClaude(srcNovelTr.description),
        ])

        await prisma.novelTranslation.upsert({
          where: { novelId_locale: { novelId, locale: targetLocale } },
          create: { novelId, locale: targetLocale, title: translatedTitle, description: translatedDesc, status: 'draft' },
          update: { title: translatedTitle, description: translatedDesc, status: 'draft' },
        })

        for (let i = 0; i < chapters.length; i++) {
          const chapter = chapters[i]
          // Prefer sourceLocale translation; fall back to any other translation, then native fields
          const srcTr =
            chapter.translations.find(t => t.locale === sourceLocale) ??
            chapter.translations[0]
          const srcTitle = srcTr?.title ?? chapter.title
          const srcContent = srcTr?.content ?? chapter.content

          const [tTitle, tContent] = await Promise.all([
            translateWithClaude(srcTitle),
            translateWithClaude(srcContent),
          ])

          await prisma.chapterTranslation.upsert({
            where: { chapterId_locale: { chapterId: chapter.id, locale: targetLocale } },
            create: { chapterId: chapter.id, locale: targetLocale, title: tTitle, content: tContent, status: 'draft' },
            update: { title: tTitle, content: tContent, status: 'draft' },
          })

          await prisma.translationRequest.update({
            where: { id: translationRequestId },
            data: { doneChapters: i + 1 },
          })
        }
      }

      // 4. Mark complete
      await prisma.translationRequest.update({
        where: { id: translationRequestId },
        data: { status: 'completed' },
      })
    } catch (err) {
      await prisma.translationRequest.update({
        where: { id: translationRequestId },
        data: { status: 'failed', errorMessage: err instanceof Error ? err.message : String(err) },
      })
      throw err
    }
  },
})
