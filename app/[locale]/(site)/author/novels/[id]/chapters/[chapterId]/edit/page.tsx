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
          translations: { where: { locale }, select: { title: true } },
        },
      },
      translations: { select: { locale: true, title: true, content: true } },
    },
  })

  if (!chapter || chapter.novel.authorId !== userId) notFound()

  // Prefer source locale translation for pre-fill
  const tr =
    chapter.translations.find((t) => t.locale === chapter.novel.sourceLocale) ??
    chapter.translations[0]

  const novelTitle = chapter.novel.translations[0]?.title ?? ''

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <Link href={`/author/novels/${id}/chapters`} className={styles.backLink}>
          ← {t('manageChapters')}
        </Link>
        <h1 className={styles.title}>
          {t('editChapter')} · {tr?.title ?? chapter.title}
        </h1>
        {novelTitle && <p className={styles.novelName}>{novelTitle}</p>}
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
        }}
        locale={locale}
      />
    </div>
  )
}
