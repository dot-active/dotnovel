import { task } from '@trigger.dev/sdk/v3'
import Anthropic from '@anthropic-ai/sdk'
import { PrismaClient } from '@prisma/client'
import { PrismaNeonHTTP } from '@prisma/adapter-neon'
import { neon, types } from '@neondatabase/serverless'

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
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    const targetLang = LOCALE_NAMES[targetLocale] ?? targetLocale

    async function translate(text: string): Promise<string> {
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

      // 2. Fetch source novel translation
      const novel = await prisma.novel.findUniqueOrThrow({
        where: { id: novelId },
        include: {
          translations: { where: { locale: { not: targetLocale }, status: 'published' }, take: 1 },
          chapters: {
            where: { publishStatus: 'published' },
            orderBy: { order: 'asc' },
            include: {
              translations: { where: { locale: { not: targetLocale }, status: 'published' }, take: 1 },
            },
          },
        },
      })

      const srcNovelTr = novel.translations[0]
      if (!srcNovelTr) throw new Error('No published novel translation found as source')

      const chapters = novel.chapters.filter(c => c.translations.length > 0)
      const totalChapters = chapters.length

      await prisma.translationRequest.update({
        where: { id: translationRequestId },
        data: { totalChapters },
      })

      // 3. Translate novel title + description
      const [translatedTitle, translatedDesc] = await Promise.all([
        translate(srcNovelTr.title),
        translate(srcNovelTr.description),
      ])

      await prisma.novelTranslation.upsert({
        where: { novelId_locale: { novelId, locale: targetLocale } },
        create: { novelId, locale: targetLocale, title: translatedTitle, description: translatedDesc, status: 'draft' },
        update: { title: translatedTitle, description: translatedDesc, status: 'draft' },
      })

      // 4. Translate each chapter
      for (let i = 0; i < chapters.length; i++) {
        const chapter = chapters[i]
        const srcTr = chapter.translations[0]

        const [tTitle, tContent] = await Promise.all([
          translate(srcTr.title),
          translate(srcTr.content),
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

      // 5. Mark complete
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
