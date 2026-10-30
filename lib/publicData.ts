import { unstable_cache, revalidateTag } from 'next/cache'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

/**
 * Cached reads for the public (reader-facing) pages.
 *
 * Every page view and every crawler hit used to run its queries straight
 * against Neon, which keeps the compute from ever suspending. These readers
 * go through the Next data cache instead, so the database is only touched on
 * a cache miss.
 *
 * Freshness: entries expire after REVALIDATE_SECONDS. Writes made through the
 * app call invalidatePublicContent() / invalidateCommentCounts() so they show
 * up right away; writes made elsewhere (Trigger.dev tasks, the manual
 * translation script) appear once the entry expires.
 *
 * Cached values round-trip through JSON, so Date fields come back as strings.
 */

const REVALIDATE_SECONDS = 600
const PUBLIC_CONTENT_TAG = 'public-content'
const COMMENT_COUNTS_TAG = 'comment-counts'

const contentCache = { tags: [PUBLIC_CONTENT_TAG], revalidate: REVALIDATE_SECONDS }

export function invalidatePublicContent() {
  revalidateTag(PUBLIC_CONTENT_TAG)
}

export function invalidateCommentCounts() {
  revalidateTag(COMMENT_COUNTS_TAG)
}

// ── Home ──────────────────────────────────────────────────────────────────

export const getHomeNovels = unstable_cache(
  async (locale: string, ageVerified: boolean) => {
    const adultFilter = ageVerified ? {} : { isAdult: false as const }
    const [featuredNovels, trendingNovels] = await Promise.all([
      prisma.novel.findMany({
        where: {
          isFeatured: true,
          publishStatus: 'published',
          translations: { some: { locale } },
          ...adultFilter,
        },
        select: {
          id: true,
          title: true,
          author: true,
          coverUrl: true,
          translations: {
            where: { locale },
            select: { title: true, description: true },
          },
        },
        orderBy: { updatedAt: 'desc' },
        take: 8,
      }),
      prisma.novel.findMany({
        where: {
          publishStatus: 'published',
          translations: { some: { locale } },
          ...adultFilter,
        },
        select: {
          id: true,
          title: true,
          author: true,
          viewCount: true,
          translations: {
            where: { locale },
            select: { title: true },
          },
        },
        orderBy: { viewCount: 'desc' },
        take: 8,
      }),
    ])
    return { featuredNovels, trendingNovels }
  },
  ['home-novels'],
  contentCache
)

// ── Novel list ────────────────────────────────────────────────────────────

export const getNovelList = unstable_cache(
  async (params: {
    locale: string
    ageVerified: boolean
    q: string
    categories: string[]
    sort: string
    page: number
    perPage: number
  }) => {
    const { locale, ageVerified, q, categories, sort, page, perPage } = params

    const orderBy =
      sort === 'views'
        ? { viewCount: 'desc' as const }
        : sort === 'favorites'
        ? { favoriteCount: 'desc' as const }
        : { updatedAt: 'desc' as const }

    const where = {
      publishStatus: 'published',
      ...(ageVerified ? {} : { isAdult: false }),
      ...(categories.length > 0
        ? { categories: { some: { category: { slug: { in: categories } } } } }
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

    const [novels, total] = await Promise.all([
      prisma.novel.findMany({
        where,
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
          _count: { select: { chapters: { where: { translations: { some: { locale, status: 'published' } } } } } },
        },
        orderBy,
        take: perPage,
        skip: (page - 1) * perPage,
      }),
      prisma.novel.count({ where }),
    ])
    return { novels, total }
  },
  ['novel-list'],
  contentCache
)

export const getCategories = unstable_cache(
  () => prisma.category.findMany({ orderBy: { slug: 'asc' } }),
  ['categories'],
  contentCache
)

// ── Novel detail ──────────────────────────────────────────────────────────

export const getNovelMeta = unstable_cache(
  async (id: string, locale: string) => {
    const [translation, publishedLocales, novel] = await Promise.all([
      prisma.novelTranslation.findFirst({
        where: { novelId: id, locale, status: 'published' },
        select: {
          title: true,
          description: true,
          metaTitle: true,
          metaDescription: true,
          metaKeywords: true,
        },
      }),
      prisma.novelTranslation.findMany({
        where: { novelId: id, status: 'published' },
        select: { locale: true },
      }),
      prisma.novel.findUnique({ where: { id }, select: { coverUrl: true } }),
    ])
    return { translation, publishedLocales, coverUrl: novel?.coverUrl ?? null }
  },
  ['novel-meta'],
  contentCache
)

export const getNovelDetail = unstable_cache(
  async (id: string, locale: string) => {
    const novel = await prisma.novel.findFirst({
      where: { id, publishStatus: 'published' },
      include: {
        translations: { where: { locale } },
        chapters: {
          where: { volumeId: null, translations: { some: { locale, status: 'published' } } },
          orderBy: { order: 'asc' },
          select: {
            id: true,
            order: true,
            createdAt: true,
            translations: { where: { locale, status: 'published' }, select: { title: true } },
          },
        },
        volumes: {
          orderBy: { order: 'asc' },
          include: {
            translations: { where: { locale }, select: { title: true } },
            chapters: {
              where: { translations: { some: { locale, status: 'published' } } },
              orderBy: { order: 'asc' },
              select: {
                id: true,
                order: true,
                createdAt: true,
                translations: { where: { locale, status: 'published' }, select: { title: true } },
              },
            },
          },
        },
      },
    })
    if (!novel) return null

    // Fetch only content lengths (not the text itself) to avoid pulling the
    // entire novel's translated text over the wire just to show word counts.
    const chapterIds = [...novel.chapters, ...novel.volumes.flatMap((v) => v.chapters)].map((ch) => ch.id)
    const lengthRows =
      chapterIds.length > 0
        ? await prisma.$queryRaw<{ chapterId: string; len: number }[]>(
            Prisma.sql`SELECT "chapterId", LENGTH(content) AS len FROM chapter_translations WHERE locale = ${locale} AND status = 'published' AND "chapterId" IN (${Prisma.join(chapterIds)})`
          )
        : []
    const chapterLengths: Record<string, number> = {}
    for (const r of lengthRows) chapterLengths[r.chapterId] = Number(r.len)

    return { novel, chapterLengths }
  },
  ['novel-detail'],
  contentCache
)

// ── Chapter reader ────────────────────────────────────────────────────────

export const getChapterMeta = unstable_cache(
  async (id: string, chapterId: string, locale: string) => {
    const [translation, chapterTr, chapterLocales] = await Promise.all([
      prisma.novelTranslation.findFirst({
        where: { novelId: id, locale, status: 'published' },
        select: {
          title: true,
          description: true,
          metaTitle: true,
          metaDescription: true,
          metaKeywords: true,
          novel: { select: { coverUrl: true } },
        },
      }),
      prisma.chapterTranslation.findFirst({
        where: { chapterId, locale, status: 'published' },
        select: { title: true },
      }),
      prisma.chapterTranslation.findMany({
        where: { chapterId, status: 'published' },
        select: { locale: true },
      }),
    ])
    return { translation, chapterTr, chapterLocales }
  },
  ['chapter-meta'],
  contentCache
)

export const getChapterPage = unstable_cache(
  async (id: string, chapterId: string, locale: string) => {
    const chapter = await prisma.chapter.findFirst({
      where: { id: chapterId, novelId: id },
      include: {
        novel: {
          select: {
            title: true,
            isAdult: true,
            translations: { select: { locale: true, title: true } },
          },
        },
        translations: { where: { status: 'published' }, select: { locale: true, title: true, content: true } },
      },
    })
    if (!chapter) return null

    const [novelCards, prevChapter, nextChapter] = await Promise.all([
      prisma.novelCard.findMany({
        where: { novelId: id, isActive: true },
        include: {
          translations: {
            where: { locale, status: 'published' },
            include: {
              entries: {
                where: { fromChapter: { lte: chapter.order } },
                orderBy: { order: 'asc' },
              },
            },
          },
        },
        orderBy: { createdAt: 'asc' },
      }),
      prisma.chapter.findFirst({
        where: {
          novelId: id,
          order: { lt: chapter.order },
          translations: { some: { locale, status: 'published' } },
        },
        orderBy: { order: 'desc' },
        select: { id: true, translations: { where: { locale, status: 'published' }, select: { title: true } } },
      }),
      prisma.chapter.findFirst({
        where: {
          novelId: id,
          order: { gt: chapter.order },
          translations: { some: { locale, status: 'published' } },
        },
        orderBy: { order: 'asc' },
        select: { id: true, translations: { where: { locale, status: 'published' }, select: { title: true } } },
      }),
    ])

    return { chapter, novelCards, prevChapter, nextChapter }
  },
  ['chapter-page'],
  contentCache
)

/** Top-level comment count per paragraph, keyed by paragraph index. */
export const getChapterCommentCounts = unstable_cache(
  async (chapterId: string) => {
    const rows = await prisma.comment.groupBy({
      by: ['paragraphIndex'],
      where: { chapterId, isDeleted: false, parentId: null },
      _count: { id: true },
    })
    const counts: Record<number, number> = {}
    rows.forEach((c) => { counts[c.paragraphIndex] = c._count.id })
    return counts
  },
  ['chapter-comment-counts'],
  { tags: [COMMENT_COUNTS_TAG], revalidate: REVALIDATE_SECONDS }
)
