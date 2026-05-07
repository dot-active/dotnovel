import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { auth } from '@clerk/nextjs/server'
import { Link } from '@/i18n/navigation'
import { prisma } from '@/lib/prisma'
import FavoriteButton from './_components/FavoriteButton'
import styles from './page.module.css'

export default async function NovelDetailPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations('novel')
  const { userId } = await auth()

  const [novel, favoriteRecord] = await Promise.all([
    prisma.novel.findUnique({
      where: { id },
      include: {
        translations: { where: { locale } },
        chapters: {
          where: { translations: { some: { locale } } },
          orderBy: { order: 'asc' },
          select: {
            id: true,
            order: true,
            createdAt: true,
            translations: { where: { locale }, select: { title: true, content: true } },
          },
        },
      },
    }),
    userId
      ? prisma.favorite.findUnique({
          where: { userId_novelId: { userId, novelId: id } },
        })
      : null,
  ])

  if (!novel || novel.translations.length === 0) notFound()

  const tr = novel.translations[0]
  const totalWords = novel.chapters.reduce(
    (sum, ch) => sum + (ch.translations[0]?.content.length ?? 0),
    0
  )
  const firstChapter = novel.chapters[0]
  const isFavorited = favoriteRecord !== null

  return (
    <div>
      <Link href="/" className={styles.backLink}>{t('backToHome')}</Link>

      <div className={styles.hero}>
        <div className={styles.cover}>
          <span className={styles.coverText}>{tr.title[0]}</span>
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{tr.title}</h1>
          <p className={styles.author}>{novel.author}</p>

          <div className={styles.tags}>
            <span className={`${styles.statusTag} ${styles[`status${novel.status}`]}`}>
              {t(`status.${novel.status}`)}
            </span>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{novel.chapters.length}</span>
              <span className={styles.statLabel}>{t('chapters')}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statValue}>{(totalWords / 10000).toFixed(1)}万</span>
              <span className={styles.statLabel}>{t('words')}</span>
            </div>
          </div>

          <div className={styles.actions}>
            {firstChapter && (
              <Link
                href={`/novels/${novel.id}/chapters/${firstChapter.id}`}
                className={styles.readBtn}
              >
                {t('startReading')}
              </Link>
            )}
            <FavoriteButton novelId={novel.id} initialFavorited={isFavorited} />
          </div>
        </div>
      </div>

      {tr.description && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('synopsis')}</h2>
          <p className={styles.description}>{tr.description}</p>
        </section>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {t('tableOfContents')}{' '}
          <span className={styles.chapterCount}>
            {t('chapterCount', { count: novel.chapters.length })}
          </span>
        </h2>
        {novel.chapters.length === 0 ? (
          <p className={styles.noChapters}>{t('noChapters')}</p>
        ) : (
          <ol className={styles.chapterList}>
            {novel.chapters.map((chapter) => {
              const chTr = chapter.translations[0]
              return (
                <li key={chapter.id}>
                  <Link
                    href={`/novels/${novel.id}/chapters/${chapter.id}`}
                    className={styles.chapterItem}
                  >
                    <span className={styles.chapterOrder}>
                      {String(chapter.order).padStart(2, '0')}
                    </span>
                    <span className={styles.chapterTitle}>{chTr?.title ?? ''}</span>
                    <span className={styles.chapterDate}>
                      {new Date(chapter.createdAt).toLocaleDateString('zh-CN', {
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ol>
        )}
      </section>
    </div>
  )
}
