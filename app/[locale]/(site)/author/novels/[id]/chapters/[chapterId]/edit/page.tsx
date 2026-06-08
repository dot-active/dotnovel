import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { auth } from '@clerk/nextjs/server'
import { Link } from '@/i18n/navigation'
import { prisma } from '@/lib/prisma'
import EditChapterForm from './_components/EditChapterForm'
import styles from './page.module.css'

export default async function EditChapterPage({
  params: { locale, id, chapterId },
}: {
  params: { locale: string; id: string; chapterId: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations('author')
  const { userId } = await auth()

  const chapter = await prisma.chapter.findFirst({
    where: { id: chapterId, novelId: id },
    include: {
      novel: {
        select: {
          authorId: true,
          sourceLocale: true,
          translations: { select: { locale: true, title: true } },
        },
      },
      translations: { select: { locale: true, title: true, content: true, status: true } },
    },
  })

  if (!chapter || chapter.novel.authorId !== userId) notFound()

  // Prefer source locale translation for pre-fill
  const tr =
    chapter.translations.find((t) => t.locale === chapter.novel.sourceLocale) ??
    chapter.translations[0]

  const novelTitle =
    chapter.novel.translations.find((t) => t.locale === locale)?.title ??
    chapter.novel.translations.find((t) => t.locale === chapter.novel.sourceLocale)?.title ??
    ''

  const novelLocales = chapter.novel.translations.map((t) => t.locale)

  const completedRequests = await prisma.translationRequest.findMany({
    where: { novelId: id, status: 'completed' },
    select: { targetLocale: true },
  })
  const autoTranslateLocales = completedRequests.map((r) => r.targetLocale)

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          {t('editChapter')} · {tr?.title ?? chapter.title}
        </h1>
        {novelTitle && (
          <Link href={`/author/novels/${id}/chapters`} className={styles.primaryBtn}>
            {novelTitle}
          </Link>
        )}
      </div>

      <EditChapterForm
        chapter={{
          id: chapter.id,
          novelId: id,
          title: tr?.title ?? chapter.title,
          content: tr?.content ?? chapter.content,
          order: chapter.order,
          publishStatus: chapter.publishStatus,
          sourceLocale: chapter.novel.sourceLocale,
          translations: chapter.translations,
        }}
        locale={locale}
        novelLocales={novelLocales}
        autoTranslateLocales={autoTranslateLocales}
      />
    </div>
  )
}
