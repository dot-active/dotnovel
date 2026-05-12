import { cookies } from 'next/headers'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { prisma } from '@/lib/prisma'
import { formatCount } from '@/lib/formatCount'
import FilterBar from './_components/FilterBar'
import styles from './page.module.css'

const NOVELS_PER_PAGE = 20

function buildPageUrl(
  pathname: string,
  q: string,
  category: string,
  sort: string,
  page: number
) {
  const sp = new URLSearchParams()
  if (q) sp.set('q', q)
  if (category) sp.set('category', category)
  if (sort) sp.set('sort', sort)
  if (page > 1) sp.set('page', String(page))
  const qs = sp.toString()
  return qs ? `?${qs}` : '?'
}

export default async function HomePage({
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

  const orderBy =
    sort === 'views'
      ? { viewCount: 'desc' as const }
      : sort === 'favorites'
      ? { favoriteCount: 'desc' as const }
      : { updatedAt: 'desc' as const }

  const baseWhere = {
    publishStatus: 'published',
    ...(ageVerified ? {} : { isAdult: false }),
    ...(selectedCategories.length > 0
      ? { categories: { some: { category: { slug: { in: selectedCategories } } } } }
      : {}),
    ...(q
      ? {
          AND: [
            { translations: { some: { locale } } },
            {
              OR: [
                { translations: { some: { locale, title: { contains: q, mode: 'insensitive' as const } } } },
                { translations: { some: { locale, description: { contains: q, mode: 'insensitive' as const } } } },
                { author: { contains: q, mode: 'insensitive' as const } },
              ],
            },
          ],
        }
      : { translations: { some: { locale } } }),
  }

  const [novels, total, categories] = await Promise.all([
    prisma.novel.findMany({
      where: baseWhere,
      select: {
        id: true,
        title: true,
        author: true,
        description: true,
        coverUrl: true,
        status: true,
        viewCount: true,
        favoriteCount: true,
        translations: { where: { locale }, select: { title: true, description: true } },
        _count: { select: { chapters: { where: { publishStatus: 'published' } } } },
      },
      orderBy,
      take: NOVELS_PER_PAGE,
      skip: (page - 1) * NOVELS_PER_PAGE,
    }),
    prisma.novel.count({ where: baseWhere }),
    prisma.category.findMany({ orderBy: { slug: 'asc' } }),
  ])

  const totalPages = Math.ceil(total / NOVELS_PER_PAGE)

  return (
    <div>
      {/* <section className={styles.hero}>
        <h1 className={styles.heroTitle}>{t('heroTitle')}</h1>
        <p className={styles.heroSubtitle}>{t('heroSubtitle')}</p>
      </section> */}

      <FilterBar
        categories={categories}
        currentCategories={selectedCategories}
        currentSort={sort}
        currentQ={q}
      />

      <section>
        {/* <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('allNovels')}</h2>
          <span className={styles.sectionCount}>{t('novelsCount', { count: total })}</span>
        </div> */}

        {novels.length === 0 ? (
          <p className={styles.empty}>{t('empty')}</p>
        ) : (
          <div className={styles.grid}>
            {novels.map((novel) => {
              const tr = novel.translations[0]
              return (
                <Link key={novel.id} href={`/novels/${novel.id}`} className={styles.card}>
                  <div className={styles.cardCover}>
                    {novel.coverUrl ? (
                      <img src={novel.coverUrl} alt="" className={styles.cardCoverImg} />
                    ) : (
                      <span className={styles.cardCoverText}>{(tr?.title ?? novel.title)[0]}</span>
                    )}
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardMeta}>
                      <span className={`${styles.cardStatus} ${styles[`status${novel.status}`]}`}>
                        {tNovel(`status.${novel.status}`)}
                      </span>
                    </div>
                    <h3 className={styles.cardTitle}>{tr?.title ?? novel.title}</h3>
                    <p className={styles.cardAuthor}>{novel.author}</p>
                    {/* <p className={styles.cardDescription}>{tr?.description ?? novel.description}</p> */}
                    <div className={styles.cardFooter}>
                      <span className={styles.cardChapters}>
                        {tNovel('chapterCount', { count: novel._count.chapters })}
                      </span>
                      <span className={styles.cardStats}>
                        <span className={styles.cardStat}>👁 {formatCount(novel.viewCount)}</span>
                        <span className={styles.cardStat}>❤️ {formatCount(novel.favoriteCount)}</span>
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            {page > 1 && (
              <a
                href={buildPageUrl('', q, categoryParam, sort, page - 1)}
                className={styles.pageBtn}
              >
                ← 上一页
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
                      href={buildPageUrl('', q, categoryParam, sort, p as number)}
                      className={`${styles.pageNum} ${p === page ? styles.pageNumActive : ''}`}
                    >
                      {p}
                    </a>
                  )
                )}
            </div>
            {page < totalPages && (
              <a
                href={buildPageUrl('', q, categoryParam, sort, page + 1)}
                className={styles.pageBtn}
              >
                下一页 →
              </a>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
