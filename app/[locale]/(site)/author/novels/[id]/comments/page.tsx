import { auth } from '@clerk/nextjs/server'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { prisma } from '@/lib/prisma'
import AuthorCommentList from './_components/AuthorCommentList'
import styles from './page.module.css'

export default async function AuthorCommentsPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations('author')
  const { userId } = await auth()

  const novel = await prisma.novel.findUnique({
    where: { id },
    select: { authorId: true, title: true, translations: { where: { locale }, select: { title: true } } },
  })

  if (!novel) notFound()
  if (novel.authorId !== userId) {
    return (
      <div className={styles.forbidden}>
        <h1 className={styles.forbiddenCode}>403</h1>
        <p>您没有权限管理此小说的留言</p>
        <Link href="/author/dashboard" className={styles.back}>← 返回仪表盘</Link>
      </div>
    )
  }

  const novelTitle = novel.translations[0]?.title ?? novel.title

  // Mark all comments as read + fetch grouped data in parallel
  const [chapters] = await Promise.all([
    prisma.chapter.findMany({
      where: { novelId: id },
      select: {
        id: true,
        title: true,
        order: true,
        comments: {
          where: { isDeleted: false },
          orderBy: { createdAt: 'asc' },
          select: {
            id: true,
            content: true,
            userId: true,
            nickname: true,
            paragraphIndex: true,
            isReadByAuthor: true,
            createdAt: true,
            parentId: true,
          },
        },
      },
      orderBy: { order: 'asc' },
    }),
    prisma.comment.updateMany({
      where: { chapter: { novelId: id }, isReadByAuthor: false },
      data: { isReadByAuthor: true },
    }),
  ])

  const chaptersWithComments = chapters
    .filter((c) => c.comments.length > 0)
    .map((c) => ({
      ...c,
      comments: c.comments.map((comment) => ({
        ...comment,
        createdAt: comment.createdAt.toISOString(),
      })),
    }))

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <Link href="/author/dashboard" className={styles.back}>{t('backToDashboard')}</Link>
        <h1 className={styles.title}>{t('commentsPageTitle', { title: novelTitle })}</h1>
      </div>

      {chaptersWithComments.length === 0 ? (
        <p className={styles.empty}>{t('noComments')}</p>
      ) : (
        <AuthorCommentList chapters={chaptersWithComments} novelId={id} />
      )}
    </div>
  )
}
