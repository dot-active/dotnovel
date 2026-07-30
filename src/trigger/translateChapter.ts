import { task } from '@trigger.dev/sdk/v3'
import { PrismaClient } from '@prisma/client'
import { PrismaNeonHTTP } from '@prisma/adapter-neon'
import { neon, types } from '@neondatabase/serverless'
import { simplifiedToTraditional, traditionalToSimplified } from '../lib/opencc'
import { translateWithClaude } from '../lib/translate'

types.setTypeParser(types.builtins.TIMESTAMP, (v: string) => v)
types.setTypeParser(types.builtins.TIMESTAMPTZ, (v: string) => v)
types.setTypeParser(types.builtins.DATE, (v: string) => v)

function createPrisma() {
  const sql = neon(process.env.DATABASE_URL!)
  const adapter = new PrismaNeonHTTP(sql)
  return new PrismaClient({ adapter })
}

export const translateChapter = task({
  id: 'translate-chapter',
  maxDuration: 300,
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 30_000,
  },
  run: async (payload: {
    chapterId: string
    novelId: string
    sourceLocale: string
    targetLocale: string
  }) => {
    const { chapterId, novelId, sourceLocale, targetLocale } = payload
    const prisma = createPrisma()

    const [srcTr, chapter] = await Promise.all([
      prisma.chapterTranslation.findFirst({ where: { chapterId, locale: sourceLocale } }),
      prisma.chapter.findUniqueOrThrow({ where: { id: chapterId } }),
    ])

    const srcTitle = srcTr?.title ?? chapter.title
    const srcContent = srcTr?.content ?? chapter.content

    const zhLocales = new Set(['zh-CN', 'zh-TW'])
    const convertZh = (text: string, src: string) =>
      src === 'zh-CN' ? simplifiedToTraditional(text) : traditionalToSimplified(text)

    let translatedTitle: string
    let translatedContent: string

    if (zhLocales.has(sourceLocale) && zhLocales.has(targetLocale) && sourceLocale !== targetLocale) {
      translatedTitle = convertZh(srcTitle, sourceLocale)
      translatedContent = convertZh(srcContent, sourceLocale)
    } else {
      ;[translatedTitle, translatedContent] = await Promise.all([
        translateWithClaude(srcTitle, targetLocale, 'title'),
        translateWithClaude(srcContent, targetLocale, 'content'),
      ])
    }

    await prisma.chapterTranslation.upsert({
      where: { chapterId_locale: { chapterId, locale: targetLocale } },
      create: { chapterId, locale: targetLocale, title: translatedTitle, content: translatedContent, status: 'draft' },
      update: { title: translatedTitle, content: translatedContent },
    })

    await prisma.translationRequest.update({
      where: { novelId_targetLocale: { novelId, targetLocale } },
      data: {
        totalChapters: { increment: 1 },
        doneChapters: { increment: 1 },
      },
    })
  },
})
