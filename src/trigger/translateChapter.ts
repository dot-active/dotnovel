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
        translateWithClaude(srcTitle),
        translateWithClaude(srcContent),
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
