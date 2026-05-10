import { setRequestLocale } from 'next-intl/server'
import { prisma } from '@/lib/prisma'
import CommentAdminRow from './_components/CommentAdminRow'
import styles from './page.module.css'

export default async function AdminCommentsPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string }
  searchParams: { chapterId?: string }
}) {
  setRequestLocale(locale)

  const { chapterId } = searchParams

  const [comments, chapters] = await Promise.all([
    prisma.comment.findMany({
      where: chapterId ? { chapterId } : undefined,
      include: {
        chapter: {
          select: {
            id: true,
            title: true,
            novel: { select: { title: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.chapter.findMany({
      select: { id: true, title: true, novel: { select: { title: true } } },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  return (
    <div>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>
          评论管理 <span className={styles.count}>({comments.length})</span>
        </h1>
        <form method="GET" className={styles.filterForm}>
          <select name="chapterId" defaultValue={chapterId ?? ''} className={styles.select}>
            <option value="">全部章节</option>
            {chapters.map((ch) => (
              <option key={ch.id} value={ch.id}>
                {ch.novel.title} — {ch.title}
              </option>
            ))}
          </select>
          <button type="submit" className={styles.filterBtn}>筛选</button>
          {chapterId && (
            <a href="?" className={styles.clearBtn}>清除</a>
          )}
        </form>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>内容</th>
              <th>作者ID</th>
              <th>章节</th>
              <th>段落</th>
              <th>状态</th>
              <th>时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((c) => (
              <CommentAdminRow
                key={c.id}
                comment={{
                  id: c.id,
                  content: c.content,
                  authorId: c.authorId,
                  chapterTitle: c.chapter.title,
                  novelTitle: c.chapter.novel.title,
                  paragraphIndex: c.paragraphIndex,
                  isDeleted: c.isDeleted,
                  createdAt: c.createdAt.toISOString(),
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
