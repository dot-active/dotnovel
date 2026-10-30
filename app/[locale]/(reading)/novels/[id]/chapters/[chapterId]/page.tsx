import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { cookies } from 'next/headers'
import { auth } from '@clerk/nextjs/server'
import { getChapterCommentCounts, getChapterMeta, getChapterPage } from '@/lib/publicData'
import { SITE_URL } from '@/lib/site'
import { routing } from '@/i18n/routing'
import ReaderClient from './_components/ReaderClient'

export async function generateMetadata({
  params: { locale, id, chapterId },
}: {
  params: { locale: string; id: string; chapterId: string }
}): Promise<Metadata> {
  // Chapter pages inherit the novel's meta settings; only the title is chapter-specific.
  const { translation, chapterTr, chapterLocales } = await getChapterMeta(id, chapterId, locale)

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

  const [pageData, { userId }] = await Promise.all([
    getChapterPage(id, chapterId, locale),
    auth(),
  ])

  if (!pageData) notFound()
  const { chapter, novelCards, prevChapter, nextChapter } = pageData

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

  const paragraphTexts = chTr.content.split('\n').filter((p) => p.trim() !== '')

  const countMap = await getChapterCommentCounts(chapterId)

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
