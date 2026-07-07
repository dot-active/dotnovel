import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { auth } from '@clerk/nextjs/server'
import { Link } from '@/i18n/navigation'
import { prisma } from '@/lib/prisma'
import styles from './page.module.css'

const ALL_LOCALES = ['zh-CN', 'zh-TW', 'en', 'ja', 'ko', 'es'] as const
const LOCALE_SHORT: Record<string, string> = {
  'zh-CN': '简中',
  'zh-TW': '繁中',
  'en': 'EN',
  'ja': 'JA',
  'ko': 'KO',
  'es': 'ES',
}

export default async function AuthorChapterListPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations('author')
  const { userId } = await auth()

  const [novel, translationRequests] = await Promise.all([
    prisma.novel.findFirst({
      where: { id, authorId: userId! },
      include: {
        translations: {
          where: { locale: { in: [...ALL_LOCALES] } },
          select: { locale: true, title: true },
        },
        chapters: {
          orderBy: { order: 'asc' },
          include: {
            translations: {
              where: { locale: { in: [...ALL_LOCALES] } },
              select: { locale: true, title: true, status: true },
            },
          },
        },
      },
    }),
    prisma.translationRequest.findMany({
      where: { novelId: id },
      select: { targetLocale: true, status: true, triggerRunId: true },
    }),
  ])

  if (!novel) notFound()

  const novelTitle =
    novel.translations.find((tr) => tr.locale === locale)?.title ?? novel.title

  // Ordered list of locales this novel has configured (NovelTranslation exists)
  const novelLocaleSet = new Set(novel.translations.map((tr) => tr.locale))
  const novelLocales = ALL_LOCALES.filter((l) => novelLocaleSet.has(l))

  // Locales where a translation job is actively running
  const processingLocales = new Set(
    translationRequests
      .filter((r) => r.triggerRunId && (r.status === 'pending' || r.status === 'processing'))
      .map((r) => r.targetLocale)
  )

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>

          <h1 className={styles.title}>{novelTitle}-{t('manageChapters')}</h1>
        
        </div>
        <div className={styles.headerBtns}>
          <Link href={`/author/novels/${id}/edit`} className={styles.settingsBtn}>
            {t('novelSettings')}
          </Link>
          <Link href={`/author/novels/${id}/chapters/new`} className={styles.addBtn}>
            + {t('addChapter')}
          </Link>
        </div>
      </div>

      {novel.chapters.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>{t('noChaptersYet')}</p>
          <Link href={`/author/novels/${id}/chapters/new`} className={styles.emptyBtn}>
            {t('addChapter')}
          </Link>
        </div>
      ) : (
        <div className={styles.list}>
          <div className={styles.listHeader}>
            <span className={styles.colOrder}>#</span>
            <span className={styles.colTitle}>{t('chapterTitle')}</span>
            <span className={styles.colLocales}>{t('languageVersions')}</span>
            <span className={styles.colActions}>{t('actions')}</span>
          </div>
          {novel.chapters.map((chapter) => {
            const displayTr =
              chapter.translations.find((tr) => tr.locale === locale) ??
              chapter.translations.find((tr) => tr.locale === novel.sourceLocale) ??
              chapter.translations[0]

            return (
              <div key={chapter.id} className={styles.listRow}>
                <span className={styles.colOrder}>{chapter.order}</span>
                <Link
                  href={`/author/novels/${id}/chapters/${chapter.id}/edit`}
                  className={styles.chapterTitleLink}
                >
                  {displayTr?.title ?? chapter.title}
                </Link>
                <div className={styles.colLocales}>
                  {novelLocales.map((loc) => {
                    const chTr = chapter.translations.find((tr) => tr.locale === loc)
                    const isProcessing = processingLocales.has(loc)
                    const label = LOCALE_SHORT[loc] ?? loc

                    if (isProcessing && !chTr) {
                      return (
                        <span key={loc} className={styles.badgeProcessing}>{label}</span>
                      )
                    }
                    if (chTr?.status === 'published') {
                      return (
                        <span key={loc} className={styles.badgePublished}>{label}</span>
                      )
                    }
                    if (chTr?.status === 'draft') {
                      return (
                        <span key={loc} className={styles.badgeDraft}>{label}</span>
                      )
                    }
                    return (
                      <span key={loc} className={styles.badgeNone}>{label}</span>
                    )
                  })}
                </div>
                <div className={styles.colActions}>
                  <Link
                    href={`/novels/${id}/chapters/${chapter.id}`}
                    className={styles.editBtn}
                    target="_blank"
                  >
                    {t('preview')}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
