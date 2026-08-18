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

export const translateNovel = task({
  id: 'translate-novel',
  maxDuration: 3600,
  run: async (payload: { translationRequestId: string; novelId: string; targetLocale: string }) => {
    const { translationRequestId, novelId, targetLocale } = payload
    const prisma = createPrisma()

    try {
      // 1. Mark as processing
      await prisma.translationRequest.update({
        where: { id: translationRequestId },
        data: { status: 'processing' },
      })

      // 2. Fetch source novel translation — this task only translates the
      // novel's own title/description. Chapter translation is a separate,
      // author-triggered flow (see translate-chapter / translate-chapters).
      const novel = await prisma.novel.findUniqueOrThrow({
        where: { id: novelId },
        include: {
          translations: { where: { locale: { not: targetLocale } } },
        },
      })

      // Prefer the novel's own sourceLocale as the translation source
      const srcNovelTr =
        novel.translations.find(t => t.locale === novel.sourceLocale) ??
        novel.translations[0]
      if (!srcNovelTr) throw new Error('No novel translation found as source')

      const convertZh = (text: string, src: string) =>
        src === 'zh-CN' ? simplifiedToTraditional(text) : traditionalToSimplified(text)

      const sourceLocale = srcNovelTr.locale

      const convertKeywordsZh = (keywords: string, src: string) =>
        keywords.split(',').map(k => convertZh(k.trim(), src)).filter(Boolean).join(', ')

      const zhLocales = new Set(['zh-CN', 'zh-TW'])
      if (zhLocales.has(sourceLocale) && zhLocales.has(targetLocale) && sourceLocale !== targetLocale) {
        // 3a. OpenCC path: zh-CN ↔ zh-TW
        const data = {
          title: convertZh(srcNovelTr.title, sourceLocale),
          description: convertZh(srcNovelTr.description, sourceLocale),
          metaTitle: srcNovelTr.metaTitle ? convertZh(srcNovelTr.metaTitle, sourceLocale) : null,
          metaDescription: srcNovelTr.metaDescription ? convertZh(srcNovelTr.metaDescription, sourceLocale) : null,
          metaKeywords: srcNovelTr.metaKeywords ? convertKeywordsZh(srcNovelTr.metaKeywords, sourceLocale) : null,
          status: 'published' as const,
        }
        await prisma.novelTranslation.upsert({
          where: { novelId_locale: { novelId, locale: targetLocale } },
          create: { novelId, locale: targetLocale, ...data },
          update: data,
        })
      } else {
        // 3b. Claude API path
        const [translatedTitle, translatedDesc, translatedMetaTitle, translatedMetaDesc, translatedKeywords] =
          await Promise.all([
            translateWithClaude(srcNovelTr.title, targetLocale, 'title'),
            translateWithClaude(srcNovelTr.description, targetLocale, 'content'),
            srcNovelTr.metaTitle ? translateWithClaude(srcNovelTr.metaTitle, targetLocale, 'title') : null,
            srcNovelTr.metaDescription ? translateWithClaude(srcNovelTr.metaDescription, targetLocale, 'content') : null,
            srcNovelTr.metaKeywords ? translateWithClaude(srcNovelTr.metaKeywords, targetLocale, 'keywords') : null,
          ])

        const data = {
          title: translatedTitle,
          description: translatedDesc,
          metaTitle: translatedMetaTitle,
          metaDescription: translatedMetaDesc,
          metaKeywords: translatedKeywords,
          status: 'published' as const,
        }
        await prisma.novelTranslation.upsert({
          where: { novelId_locale: { novelId, locale: targetLocale } },
          create: { novelId, locale: targetLocale, ...data },
          update: data,
        })
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
