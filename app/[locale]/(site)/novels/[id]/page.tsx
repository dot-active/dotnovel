import { notFound, redirect } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { auth } from '@clerk/nextjs/server'
import { cookies } from 'next/headers'
import { Link } from '@/i18n/navigation'
import { prisma } from '@/lib/prisma'
import { formatCount } from '@/lib/formatCount'
import FavoriteButton from './_components/FavoriteButton'
import styles from './page.module.css'

function toRoman(n: number): string {
  const map: [number, string][] = [
    [1000, 'm'], [900, 'cm'], [500, 'd'], [400, 'cd'],
    [100, 'c'], [90, 'xc'], [50, 'l'], [40, 'xl'],
    [10, 'x'], [9, 'ix'], [5, 'v'], [4, 'iv'], [1, 'i'],
  ]
  let result = ''
  let num = n
  for (const [value, numeral] of map) {
    while (num >= value) { result += numeral; num -= value }
  }
  return result
}

function formatWords(chars: number): string {
  if (chars >= 10000) return `${(chars / 10000).toFixed(1)}万字`
  if (chars >= 1000) return `${(chars / 1000).toFixed(1)}k字`
  return `${chars}字`
}

export default async function NovelDetailPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations('novel')
  const { userId } = await auth()

  const [novel, favoriteRecord] = await Promise.all([
    prisma.novel.findFirst({
      where: { id, publishStatus: 'published' },
      include: {
        translations: { where: { locale } },
        chapters: {
          where: { translations: { some: { locale } }, publishStatus: 'published' },
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

  const ageVerified = cookies().get('age_verified')?.value === '1'
  if (novel.isAdult && !ageVerified) {
    const returnUrl = encodeURIComponent(`/${locale}/novels/${id}`)
    redirect(`/${locale}/onboarding?returnUrl=${returnUrl}`)
  }

  const totalChars = novel.chapters.reduce(
    (sum, ch) => sum + (ch.translations[0]?.content.length ?? 0),
    0
  )
  const firstChapter = novel.chapters[0]
  const isFavorited = favoriteRecord !== null
  const isLive = novel.status === 'ONGOING'

  return (
    <div>
      {/* Breadcrumb */}
      <div className={styles.crumbs}>
        <Link href="/">书馆</Link>
        <span className={styles.crumbSep}>/</span>
        <span>{tr.title}</span>
      </div>

      {/* Book head: cover | meta | rail */}
      <section className={styles.bookHead}>
        {/* Cover */}
        <div className={styles.coverStack}>
          <div className={styles.cover}>
            {novel.coverUrl ? (
              <img src={novel.coverUrl} alt={tr.title} className={styles.coverImg} />
            ) : (
              <>
                <div className={styles.coverTop}>{novel.sourceLocale}</div>
                <div className={styles.coverTitle}>{tr.title.slice(0, 8)}</div>
                <div className={styles.coverBot}>{novel.author} 著</div>
              </>
            )}
          </div>
        </div>

        {/* Meta */}
        <div className={styles.bookMeta}>
          <h1 className={styles.title}>{tr.title}</h1>

          <div className={styles.byRow}>
            <div className={styles.pip}>{novel.author[0]}</div>
            <div className={styles.byText}>
              <div className={styles.byRole}>作者</div>
              <div className={styles.byName}>{novel.author}</div>
            </div>
          </div>

          <div className={styles.tags}>
            <span className={`${styles.tag} ${isLive ? styles.tagLive : styles.tagCompleted}`}>
              {isLive ? '● 连载中' : t(`status.${novel.status}`)}
            </span>
          </div>

          {tr.description && (
            <p className={styles.blurb}>{tr.description}</p>
          )}

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

        {/* Rail */}
        <aside className={styles.rail}>
          <div className={styles.statGrid}>
            <div className={styles.stat}>
              <div className={styles.statN}>{novel.chapters.length}</div>
              <div className={styles.statL}>章节</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statN}>
                {totalChars >= 10000
                  ? `${(totalChars / 10000).toFixed(1)}万`
                  : `${(totalChars / 1000).toFixed(0)}k`}
              </div>
              <div className={styles.statL}>字数</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statN}>{formatCount(novel.viewCount)}</div>
              <div className={styles.statL}>阅读</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statN}>{formatCount(novel.favoriteCount)}</div>
              <div className={styles.statL}>收藏</div>
            </div>
          </div>
        </aside>
      </section>

      {/* Chapter list */}
      <section className={styles.chaptersSection}>


        {novel.chapters.length === 0 ? (
          <p className={styles.noChapters}>{t('noChapters')}</p>
        ) : (
          <div className={styles.chapTable}>
            {novel.chapters.map((chapter, i) => {
              const chTr = chapter.translations[0]
              const wordCount = chTr?.content.length ?? 0
              const dateStr = new Date(chapter.createdAt).toLocaleDateString('zh-CN', {
                month: 'long',
                day: 'numeric',
              })
              return (
                <Link
                  key={chapter.id}
                  href={`/novels/${novel.id}/chapters/${chapter.id}`}
                  className={styles.chap}
                >
                  <span className={styles.chapIdx}>{toRoman(i + 1)}.</span>
                  <div className={styles.chapName}>{chTr?.title ?? ''}</div>
                  <span className={styles.chapWhen}>{dateStr}</span>
                  <span className={styles.chapLen}>{formatWords(wordCount)}</span>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
