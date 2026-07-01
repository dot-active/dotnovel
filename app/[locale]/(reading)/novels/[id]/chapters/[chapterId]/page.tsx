import { notFound, redirect } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { cookies } from 'next/headers'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import ReaderClient from './_components/ReaderClient'

export default async function ChapterPage({
  params: { locale, id, chapterId },
}: {
  params: { locale: string; id: string; chapterId: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations('reader')

  const [chapter, { userId }, novelCards] = await Promise.all([
    prisma.chapter.findFirst({
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
    }),
    auth(),
    prisma.novelCard.findMany({
      where: { novelId: id, isActive: true },
      include: {
        translations: { where: { locale, status: 'published' } },
      },
      orderBy: { createdAt: 'asc' },
    }),
  ])

  if (!chapter) notFound()

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
    .filter((c) => c.translations.length > 0)
    .map((c) => ({
      id: c.id,
      title: c.translations[0].title,
      description: c.translations[0].description,
      imageUrl: c.imageUrl,
    }))

  return (
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
  )
}
