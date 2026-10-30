import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getCategories, getNovelList } from '@/lib/publicData'
import { formatCount } from '@/lib/formatCount'
import { buildAlternates } from '@/lib/site'
import FilterBar from '../_components/FilterBar'
import styles from './page.module.css'

const NOVELS_PER_PAGE = 20

const COVER_VARIANTS = [
  'coverDark',
  'coverTerracotta',
  'coverOlive',
  'coverBone',
  'coverInk',
  'coverDefault',
] as const

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

function buildPageUrl(q: string, category: string, sort: string, page: number) {
  const sp = new URLSearchParams()
  if (q) sp.set('q', q)
  if (category) sp.set('category', category)
  if (sort) sp.set('sort', sort)
  if (page > 1) sp.set('page', String(page))
  const qs = sp.toString()
  return qs ? `?${qs}` : '?'
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const tNav = await getTranslations({ locale, namespace: 'nav' })
  const title = tNav('novels')
  const { canonical, languages } = buildAlternates(locale, 'novels')

  return {
    title,
    alternates: { canonical, languages },
    openGraph: { title, url: canonical, type: 'website' },
    twitter: { card: 'summary', title },
  }
}

export default async function NovelsPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string }
  searchParams: { q?: string; category?: string; sort?: string; page?: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations('home')
  const tNovel = await getTranslations('novel')

  const ageVerified = cookies().get('age_verified')?.value === '1'

  const q = (searchParams.q ?? '').trim()
  const categoryParam = searchParams.category ?? ''
  const selectedCategories = categoryParam ? categoryParam.split(',').filter(Boolean) : []
  const sort = searchParams.sort ?? ''
  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10))

  const [{ novels, total }, categories] = await Promise.all([
    getNovelList({
      locale,
      ageVerified,
      q,
      categories: selectedCategories,
      sort,
      page,
      perPage: NOVELS_PER_PAGE,
    }),
    getCategories(),
  ])

  const totalPages = Math.ceil(total / NOVELS_PER_PAGE)

  return (
    <div>

      

      {/* Filters + sort */}
      <FilterBar
        categories={categories}
        currentCategories={selectedCategories}
        currentSort={sort}
        currentQ={q}
        total={total}
      />

      {/* Library grid */}
      {novels.length === 0 ? (
        <p className={styles.empty}>{t('empty')}</p>
      ) : (
        <section className={styles.library}>
          {novels.map((novel, i) => {
            const tr = novel.translations[0]
            const coverVariant = COVER_VARIANTS[i % COVER_VARIANTS.length]
            const isLive = novel.status === 'ONGOING'
            return (
              <Link key={novel.id} href={`/novels/${novel.id}`} className={styles.book}>
                <span className={styles.bookNum}>{toRoman(i + 1)}.</span>
                <div className={`${styles.bookCover} ${styles[coverVariant]}`}>
                  {novel.coverUrl ? (
                    <Image
                      src={novel.coverUrl}
                      alt={tr?.title ?? novel.title}
                      fill
                      sizes="(max-width: 768px) 30vw, 140px"
                      className={styles.bookCoverImg}
                    />
                  ) : (
                    (tr?.title ?? novel.title).slice(0, 6)
                  )}
                </div>
                <div className={styles.bookStatus}>
                  <span className={`${styles.blip} ${isLive ? styles.blipLive : styles.blipDone}`} />
                  {isLive
                    ? tNovel('ongoingStatus', { count: novel._count.chapters })
                    : tNovel(`status.${novel.status}`)}
                </div>
                <h3 className={styles.bookTitle}>{tr?.title ?? novel.title}</h3>
                <p className={styles.bookAuthor}>{novel.author}</p>
                <div className={styles.bookFoot}>
                  <span className={styles.bookChapters}>
                    {tNovel('chapterCount', { count: novel._count.chapters })}
                  </span>
                  <span className={styles.bookStats}>
                    <span>{tNovel('viewCount', { count: formatCount(novel.viewCount) })}</span>
                    <span>♡ {formatCount(novel.favoriteCount)}</span>
                  </span>
                </div>
              </Link>
            )
          })}
        </section>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          {page > 1 && (
            <a href={buildPageUrl(q, categoryParam, sort, page - 1)} className={styles.pageBtn}>
              {t('prevPage')}
            </a>
          )}
          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
              .reduce<(number | '…')[]>((acc, p, idx, arr) => {
                if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('…')
                acc.push(p)
                return acc
              }, [])
              .map((p, i) =>
                p === '…' ? (
                  <span key={`ellipsis-${i}`} className={styles.pageEllipsis}>…</span>
                ) : (
                  <a
                    key={p}
                    href={buildPageUrl(q, categoryParam, sort, p as number)}
                    className={`${styles.pageNum} ${p === page ? styles.pageNumActive : ''}`}
                  >
                    {p}
                  </a>
                )
              )}
          </div>
          {page < totalPages && (
            <a href={buildPageUrl(q, categoryParam, sort, page + 1)} className={styles.pageBtn}>
              {t('nextPage')}
            </a>
          )}
        </div>
      )}
    </div>
  )
}
