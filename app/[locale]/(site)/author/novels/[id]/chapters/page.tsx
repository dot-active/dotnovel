import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { auth } from '@clerk/nextjs/server'
import { Link } from '@/i18n/navigation'
import { prisma } from '@/lib/prisma'
import styles from './page.module.css'

export default async function AuthorChapterListPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations('author')
  const { userId } = await auth()

  const novel = await prisma.novel.findFirst({
    where: { id, authorId: userId! },
    include: {
      translations: { where: { locale }, select: { title: true } },
      chapters: {
        orderBy: { order: 'asc' },
        include: {
          translations: {
            where: { locale: { in: ['zh-CN', 'zh-TW', 'en', 'ja', 'ko', 'es'] } },
            select: { locale: true, title: true },
          },
        },
      },
    },
  })

  if (!novel) notFound()

  const novelTitle = novel.translations[0]?.title ?? novel.title

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <Link href="/author/dashboard" className={styles.backLink}>
            ← {t('myNovels')}
          </Link>
          <h1 className={styles.title}>{t('manageChapters')}</h1>
          <p className={styles.novelName}>{novelTitle}</p>
        </div>
        <Link href={`/author/novels/${id}/chapters/new`} className={styles.addBtn}>
          + {t('addChapter')}
        </Link>
      </div>

      {novel.chapters.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>{t('noChaptersYet')}</p>
          <Link href={`/author/novels/${id}/chapters/new`} className={styles.emptyBtn}>
            {t('addChapter')}
          </Link>
        </div>
      ) : (
        <div className={styles.list}>
          <div className={styles.listHeader}>
            <span className={styles.colOrder}>#</span>
            <span className={styles.colTitle}>章节标题</span>
            <span className={styles.colStatus}>状态</span>
            <span className={styles.colActions}>操作</span>
          </div>
          {novel.chapters.map((chapter) => {
            const tr =
              chapter.translations.find((t) => t.locale === novel.sourceLocale) ??
              chapter.translations[0]
            const isDraft = chapter.publishStatus === 'draft'
            return (
              <div key={chapter.id} className={styles.listRow}>
                <span className={styles.colOrder}>{chapter.order}</span>
                <span className={styles.colTitle}>{tr?.title ?? chapter.title}</span>
                <span className={styles.colStatus}>
                  <span className={isDraft ? styles.badgeDraft : styles.badgePublished}>
                    {isDraft ? t('draft') : t('published')}
                  </span>
                </span>
                <div className={styles.colActions}>
                  <Link
                    href={`/author/novels/${id}/chapters/${chapter.id}/edit`}
                    className={styles.editBtn}
                  >
                    {t('editChapter')}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
