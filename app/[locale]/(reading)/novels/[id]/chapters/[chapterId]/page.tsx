import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { cookies } from 'next/headers'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { SITE_URL } from '@/lib/site'
import { routing } from '@/i18n/routing'
import ReaderClient from './_components/ReaderClient'

export async function generateMetadata({
  params: { locale, id, chapterId },
}: {
  params: { locale: string; id: string; chapterId: string }
}): Promise<Metadata> {
  // Chapter pages inherit the novel's meta settings; only the title is chapter-specific.
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

  const novelTitle = translation?.metaTitle || translation?.title || ''
  const chapterTitle = chapterTr?.title ?? ''
  const title = [chapterTitle, novelTitle].filter(Boolean).join(' - ')
  const description = translation?.metaDescription || translation?.description || ''
  const finalTitle = title || chapterTitle || novelTitle

  const pathSuffix = `novels/${id}/chapters/${chapterId}`
  const canonical = `${SITE_URL}/${locale}/${pathSuffix}`
  const languages: Record<string, string> = {}
  for (const row of chapterLocales) {
    if (routing.locales.includes(row.locale as (typeof routing.locales)[number])) {
      languages[row.locale] = `${SITE_URL}/${row.locale}/${pathSuffix}`
    }
  }
  const coverUrl = translation?.novel.coverUrl

  return {
    title: finalTitle,
    description,
    // undefined rather than '' so no empty <meta name="keywords"> is emitted
    keywords: translation?.metaKeywords || undefined,
    alternates: { canonical, languages },
    openGraph: {
      title: finalTitle,
      description,
      url: canonical,
      type: 'article',
      ...(coverUrl ? { images: [{ url: coverUrl }] } : {}),
    },
    twitter: {
      card: coverUrl ? 'summary_large_image' : 'summary',
      title: finalTitle,
      description,
      ...(coverUrl ? { images: [coverUrl] } : {}),
    },
  }
}

export default async function ChapterPage({
  params: { locale, id, chapterId },
}: {
  params: { locale: string; id: string; chapterId: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations('reader')

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

  if (!chapter) notFound()

  const [{ userId }, novelCards] = await Promise.all([
    auth(),
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
  ])

  const chTr = chapter.translations.find((tr) => tr.locale === locale)
  if (!chTr) notFound()

  const ageVerified = cookies().get('age_verified')?.value === '1'
  if (chapter.novel.isAdult && !ageVerified) {
    const returnUrl = encodeURIComponent(`/${locale}/novels/${id}/chapters/${chapterId}`)
    redirect(`/${locale}/onboarding?returnUrl=${returnUrl}`)
  }

  const novelTitle =
    chapter.novel.translations.find((tr) => tr.locale === locale)?.title ?? chapter.novel.title

  // Build available-locale list: novel has translation + whether this chapter has it
  const chapterLocaleSet = new Set(chapter.translations.map((tr) => tr.locale))
  const availableLocales = chapter.novel.translations.map((tr) => ({
    locale: tr.locale,
    hasChapter: chapterLocaleSet.has(tr.locale),
  }))

  const [prevChapter, nextChapter] = await Promise.all([
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

  const paragraphTexts = chTr.content.split('\n').filter((p) => p.trim() !== '')

  const commentCounts = await prisma.comment.groupBy({
    by: ['paragraphIndex'],
    where: { chapterId, isDeleted: false, parentId: null },
    _count: { id: true },
  })
  const countMap: Record<number, number> = {}
  commentCounts.forEach((c) => { countMap[c.paragraphIndex] = c._count.id })

  const paragraphs = paragraphTexts.map((text, i) => ({
    text,
    commentCount: countMap[i] ?? 0,
  }))

  // Map raw cards to the flat CardData shape ReaderClient expects.
  // Only include cards that have a published translation in the reading locale.
  const cards = novelCards
    .filter((c) => c.translations.length > 0 && c.translations[0].titles.length > 0)
    .map((c) => ({
      id: c.id,
      titles: c.translations[0].titles,
      entries: c.translations[0].entries.map((e) => ({ content: e.content })),
      imageUrl: c.imageUrl,
    }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Chapter',
    name: chTr.title,
    isPartOf: { '@type': 'Book', name: novelTitle },
    url: `${SITE_URL}/${locale}/novels/${id}/chapters/${chapterId}`,
    inLanguage: locale,
    position: chapter.order,
  }

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <ReaderClient
      locale={locale}
      novelId={id}
      chapterId={chapterId}
      novelTitle={novelTitle}
      chapterTitle={chTr.title}
      paragraphs={paragraphs}
      cards={cards}
      userId={userId ?? null}
      prevChapter={
        prevChapter
          ? { id: prevChapter.id, title: prevChapter.translations[0]?.title ?? '' }
          : null
      }
      nextChapter={
        nextChapter
          ? { id: nextChapter.id, title: nextChapter.translations[0]?.title ?? '' }
          : null
      }
      availableLocales={availableLocales}
      tFirstChapter={t('firstChapter')}
      tLastChapter={t('lastChapter')}
      tCatalog={t('catalog')}
      />
    </>
  )
}
