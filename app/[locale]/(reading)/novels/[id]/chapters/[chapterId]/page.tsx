import { notFound, redirect } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { cookies } from 'next/headers'
import { Link } from '@/i18n/navigation'
import { prisma } from '@/lib/prisma'
import styles from './page.module.css'

export default async function ChapterPage({
  params: { locale, id, chapterId },
}: {
  params: { locale: string; id: string; chapterId: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations('reader')

  const chapter = await prisma.chapter.findFirst({
    where: { id: chapterId, novelId: id, publishStatus: 'published' },
    include: {
      novel: {
        select: {
          title: true,
          isAdult: true,
          translations: { where: { locale }, select: { title: true } },
        },
      },
      translations: { where: { locale } },
    },
  })

  if (!chapter || chapter.translations.length === 0) notFound()

  const ageVerified = cookies().get('age_verified')?.value === '1'
  if (chapter.novel.isAdult && !ageVerified) {
    const returnUrl = encodeURIComponent(`/${locale}/novels/${id}/chapters/${chapterId}`)
    redirect(`/${locale}/onboarding?returnUrl=${returnUrl}`)
  }

  const chTr = chapter.translations[0]
  const novelTitle = chapter.novel.translations[0]?.title ?? chapter.novel.title

  const [prevChapter, nextChapter] = await Promise.all([
    prisma.chapter.findFirst({
      where: {
        novelId: id,
        order: { lt: chapter.order },
        translations: { some: { locale } },
      },
      orderBy: { order: 'desc' },
      select: { id: true, translations: { where: { locale }, select: { title: true } } },
    }),
    prisma.chapter.findFirst({
      where: {
        novelId: id,
        order: { gt: chapter.order },
        translations: { some: { locale } },
      },
      orderBy: { order: 'asc' },
      select: { id: true, translations: { where: { locale }, select: { title: true } } },
    }),
  ])

  const paragraphs = chTr.content.split('\n').filter((p) => p.trim() !== '')

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <Link href={`/novels/${id}`} className={styles.backLink}>
          ← {novelTitle}
        </Link>
        <span className={styles.topBarChapter}>{chTr.title}</span>
      </header>

      <article className={styles.article}>
        <h1 className={styles.chapterTitle}>{chTr.title}</h1>
        <div className={styles.body}>
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>

      <nav className={styles.nav}>
        <div className={styles.navSide}>
          {prevChapter ? (
            <Link
              href={`/novels/${id}/chapters/${prevChapter.id}`}
              className={styles.navBtn}
            >
              ← {prevChapter.translations[0]?.title}
            </Link>
          ) : (
            <span className={styles.navDisabled}>{t('firstChapter')}</span>
          )}
        </div>

        <Link href={`/novels/${id}`} className={styles.navCatalog}>
          {t('catalog')}
        </Link>

        <div className={`${styles.navSide} ${styles.navSideRight}`}>
          {nextChapter ? (
            <Link
              href={`/novels/${id}/chapters/${nextChapter.id}`}
              className={styles.navBtn}
            >
              {nextChapter.translations[0]?.title} →
            </Link>
          ) : (
            <span className={styles.navDisabled}>{t('lastChapter')}</span>
          )}
        </div>
      </nav>
    </div>
  )
}
