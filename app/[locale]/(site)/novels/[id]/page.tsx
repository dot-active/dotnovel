import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { auth } from '@clerk/nextjs/server'
import { cookies } from 'next/headers'
import { Link } from '@/i18n/navigation'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { formatCount } from '@/lib/formatCount'
import { SITE_URL } from '@/lib/site'
import { routing } from '@/i18n/routing'
import FavoriteButton from './_components/FavoriteButton'
import VolumeAccordion from './_components/VolumeAccordion'
import styles from './page.module.css'

const LOCALE_FLAGS: Record<string, string> = {
  'zh-CN': '🇨🇳',
  'zh-TW': '🇹🇼',
  en: '🇺🇸',
  ja: '🇯🇵',
  ko: '🇰🇷',
  es: '🇪🇸',
}

function formatWords(chars: number, locale: string): string {
  if (locale.startsWith('zh') || locale === 'ja') {
    if (chars >= 10000) return `${(chars / 10000).toFixed(1)}万字`
    if (chars >= 1000) return `${(chars / 1000).toFixed(1)}千字`
    return `${chars}字`
  }
  if (locale === 'ko') {
    if (chars >= 10000) return `${(chars / 10000).toFixed(1)}만자`
    if (chars >= 1000) return `${(chars / 1000).toFixed(1)}천자`
    return `${chars}자`
  }
  if (chars >= 1000) return `${(chars / 1000).toFixed(1)}K`
  return `${chars}`
}

function formatCharStat(chars: number, locale: string): string {
  if (locale.startsWith('zh') || locale === 'ja') {
    if (chars >= 10000) return `${(chars / 10000).toFixed(1)}万`
    return `${(chars / 1000).toFixed(0)}千`
  }
  if (locale === 'ko') {
    if (chars >= 10000) return `${(chars / 10000).toFixed(1)}만`
    return `${(chars / 1000).toFixed(0)}천`
  }
  return `${(chars / 1000).toFixed(0)}K`
}

export async function generateMetadata({
  params: { locale, id },
}: {
  params: { locale: string; id: string }
}): Promise<Metadata> {
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

  const title = translation?.metaTitle || translation?.title || '小说详情'
  const description = translation?.metaDescription || translation?.description || ''

  const pathSuffix = `novels/${id}`
  const canonical = `${SITE_URL}/${locale}/${pathSuffix}`
  const languages: Record<string, string> = {}
  for (const row of publishedLocales) {
    if (routing.locales.includes(row.locale as (typeof routing.locales)[number])) {
      languages[row.locale] = `${SITE_URL}/${row.locale}/${pathSuffix}`
    }
  }
  const coverUrl = novel?.coverUrl

  return {
    title,
    description,
    // undefined rather than '' so no empty <meta name="keywords"> is emitted
    keywords: translation?.metaKeywords || undefined,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'book',
      ...(coverUrl ? { images: [{ url: coverUrl }] } : {}),
    },
    twitter: {
      card: coverUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(coverUrl ? { images: [coverUrl] } : {}),
    },
  }
}

export default async function NovelDetailPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations('novel')
  const tNav = await getTranslations('nav')
  const { userId } = await auth()

  const [novel, favoriteRecord] = await Promise.all([
    prisma.novel.findFirst({
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

  const hasVolumes = novel.volumes.length > 0

  // All published chapters (unvolumed + inside volumes), globally ordered — for stats & "start reading"
  const allChapters = [...novel.chapters, ...novel.volumes.flatMap((v) => v.chapters)].sort(
    (a, b) => a.order - b.order
  )

  // Fetch only content lengths (not the text itself) to avoid pulling the
  // entire novel's translated text over the wire just to show word counts.
  const chapterIds = allChapters.map((ch) => ch.id)
  const lengthRows =
    chapterIds.length > 0
      ? await prisma.$queryRaw<{ chapterId: string; len: number }[]>(
          Prisma.sql`SELECT "chapterId", LENGTH(content) AS len FROM chapter_translations WHERE locale = ${locale} AND status = 'published' AND "chapterId" IN (${Prisma.join(chapterIds)})`
        )
      : []
  const lengthByChapterId = new Map(lengthRows.map((r) => [r.chapterId, Number(r.len)]))

  const totalChars = allChapters.reduce(
    (sum, ch) => sum + (lengthByChapterId.get(ch.id) ?? 0),
    0
  )
  const firstChapter = allChapters[0]
  const isFavorited = favoriteRecord !== null
  const isLive = novel.status === 'ONGOING'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: tr.title,
    author: { '@type': 'Person', name: novel.author },
    ...(tr.description ? { description: tr.description } : {}),
    ...(novel.coverUrl ? { image: novel.coverUrl } : {}),
    url: `${SITE_URL}/${locale}/novels/${novel.id}`,
    inLanguage: locale,
    numberOfPages: allChapters.length,
  }

  return (
    <div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      {/* Breadcrumb */}
      <div className={styles.crumbs}>
        <Link href="/novels">{tNav('novels')}</Link>
        <span className={styles.crumbSep}>/</span>
        <span>{tr.title}</span>
      </div>

      {/* Book head: cover | meta | rail */}
      <section className={styles.bookHead}>
        {/* Cover */}
        <div className={styles.coverStack}>
          <div className={styles.cover}>
            {novel.coverUrl ? (
              <Image
                src={novel.coverUrl}
                alt={tr.title}
                fill
                sizes="280px"
                priority
                className={styles.coverImg}
              />
            ) : (
              <>
                <div className={styles.coverTop}>{novel.sourceLocale}</div>
                <div className={styles.coverTitle}>{tr.title.slice(0, 8)}</div>
                <div className={styles.coverBot}>{t('writtenBy', { author: novel.author })}</div>
              </>
            )}
          </div>
        </div>

        {/* Meta */}
        <div className={styles.bookMeta}>
          <h1 className={styles.title}>{tr.title}</h1>

          <div className={styles.byRow}>
        
              <div className={styles.byRole}>{t('authorLabel')}</div>
              <Link href={`/novels?q=${encodeURIComponent(novel.author)}`} className={styles.byName}>
                {novel.author}
              </Link>

              <div className={styles.langGroup}>
                <div className={styles.byRole}>{t('languageLabel')}</div>
                <div className={styles.byName}>{LOCALE_FLAGS[novel.sourceLocale] ?? novel.sourceLocale}</div>
              </div>

          </div>

          <div className={styles.tags}>
            <span className={`${styles.tag} ${isLive ? styles.tagLive : styles.tagCompleted}`}>
              {isLive ? `● ${t('status.ONGOING')}` : t(`status.${novel.status}`)}
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
              <div className={styles.statN}>{allChapters.length}</div>
              <div className={styles.statL}>{t('chapters')}</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statN}>{formatCharStat(totalChars, locale)}</div>
              <div className={styles.statL}>{t('words')}</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statN}>{formatCount(novel.viewCount)}</div>
              <div className={styles.statL}>{t('views')}</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statN}>{formatCount(novel.favoriteCount)}</div>
              <div className={styles.statL}>{t('favoritesLabel')}</div>
            </div>
          </div>
        </aside>
      </section>

      {/* Chapter list */}
      <section className={styles.chaptersSection}>
        {allChapters.length === 0 ? (
          <p className={styles.noChapters}>{t('noChapters')}</p>
        ) : hasVolumes ? (
          // Volume view: unvolumed "other chapters" first, then volume accordions
          <div>
            {novel.chapters.length > 0 && (
              <div className={styles.chapTable}>
                {novel.chapters.map((chapter, i) => renderChapterRow(chapter, i))}
              </div>
            )}
            {novel.volumes.map((volume, vi) => {
              const volTitle = volume.translations[0]?.title ?? '未命名'
              return (
                <VolumeAccordion
                  key={volume.id}
                  title={volTitle}
                  count={volume.chapters.length}
                  defaultOpen={vi === 0}
                >
                  <div className={styles.chapTable}>
                    {volume.chapters.map((chapter, i) => renderChapterRow(chapter, i))}
                  </div>
                </VolumeAccordion>
              )
            })}
          </div>
        ) : (
          // No volumes: original flat list (unchanged)
          <div className={styles.chapTable}>
            {novel.chapters.map((chapter, i) => renderChapterRow(chapter, i))}
          </div>
        )}
      </section>
    </div>
  )

  function renderChapterRow(
    chapter: { id: string; createdAt: Date; translations: { title: string }[] },
    i: number
  ) {
    const chTr = chapter.translations[0]
    const wordCount = lengthByChapterId.get(chapter.id) ?? 0
    const dateStr = new Date(chapter.createdAt).toLocaleDateString(locale, {
      month: 'long',
      day: 'numeric',
    })
    return (
      <Link
        key={chapter.id}
        href={`/novels/${novel!.id}/chapters/${chapter.id}`}
        className={styles.chap}
      >
        <span className={styles.chapIdx}>{i + 1}.</span>
        <div className={styles.chapName}>{chTr?.title ?? ''}</div>
        <span className={styles.chapWhen}>{dateStr}</span>
        <span className={styles.chapLen}>{formatWords(wordCount, locale)}</span>
      </Link>
    )
  }
}
