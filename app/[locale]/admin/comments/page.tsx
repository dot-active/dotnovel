import { clerkClient } from '@clerk/nextjs/server'
import { setRequestLocale } from 'next-intl/server'
import { prisma } from '@/lib/prisma'
import CommentAdminTable from './_components/CommentAdminTable'
import styles from './page.module.css'

function displayName(u: { username: string | null; firstName: string | null; lastName: string | null }) {
  return u.username ?? ([u.firstName, u.lastName].filter(Boolean).join(' ') || '用户')
}

export default async function AdminCommentsPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string }
  searchParams: {
    novelId?: string
    chapterId?: string
    userType?: string
    sort?: string
    q?: string
  }
}) {
  setRequestLocale(locale)

  const { novelId, chapterId, userType, sort, q } = searchParams

  const [novels, chapters] = await Promise.all([
    prisma.novel.findMany({
      select: { id: true, title: true },
      orderBy: { title: 'asc' },
    }),
    prisma.chapter.findMany({
      where: novelId ? { novelId } : undefined,
      select: { id: true, title: true, novelId: true },
      orderBy: { order: 'asc' },
    }),
  ])

  const where = {
    ...(chapterId ? { chapterId } : novelId ? { chapter: { novelId } } : {}),
    ...(userType === 'user' ? { userId: { not: null } } : userType === 'anon' ? { userId: null } : {}),
    ...(q ? { content: { contains: q, mode: 'insensitive' as const } } : {}),
  }

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const [comments, totalCount, todayCount, anonCount, deletedCount] = await Promise.all([
    prisma.comment.findMany({
      where,
      include: {
        chapter: { select: { id: true, title: true, novel: { select: { id: true, title: true } } } },
        parent: { select: { content: true } },
      },
      orderBy: { createdAt: sort === 'asc' ? 'asc' : 'desc' },
    }),
    prisma.comment.count(),
    prisma.comment.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.comment.count({ where: { userId: null } }),
    prisma.comment.count({ where: { isDeleted: true } }),
  ])

  const userIds = Array.from(new Set(comments.map((c) => c.userId).filter((id): id is string => !!id)))
  const userNames: Record<string, string> = {}
  if (userIds.length > 0) {
    const client = await clerkClient()
    const { data } = await client.users.getUserList({ userId: userIds, limit: userIds.length })
    for (const u of data) {
      userNames[u.id] = displayName(u)
    }
  }

  const rows = comments.map((c) => ({
    id: c.id,
    content: c.content,
    userId: c.userId,
    nickname: c.nickname,
    userName: c.userId ? (userNames[c.userId] ?? '用户') : null,
    ipAddress: c.ipAddress,
    novelId: c.chapter.novel.id,
    novelTitle: c.chapter.novel.title,
    chapterTitle: c.chapter.title,
    paragraphIndex: c.paragraphIndex,
    isDeleted: c.isDeleted,
    createdAt: c.createdAt.toISOString(),
    parentContent: c.parent?.content ?? null,
  }))

  return (
    <div>
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{totalCount}</span>
          <span className={styles.statLabel}>总留言数</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{todayCount}</span>
          <span className={styles.statLabel}>今日新增</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{anonCount}</span>
          <span className={styles.statLabel}>匿名留言</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{deletedCount}</span>
          <span className={styles.statLabel}>已删除</span>
        </div>
      </div>

      <div className={styles.titleRow}>
        <h1 className={styles.title}>
          评论管理 <span className={styles.count}>({rows.length})</span>
        </h1>
        <form method="GET" className={styles.filterForm}>
          <select name="novelId" defaultValue={novelId ?? ''} className={styles.select}>
            <option value="">全部小说</option>
            {novels.map((n) => (
              <option key={n.id} value={n.id}>{n.title}</option>
            ))}
          </select>
          <select name="chapterId" defaultValue={chapterId ?? ''} className={styles.select} disabled={!novelId}>
            <option value="">{novelId ? '全部章节' : '先选择小说'}</option>
            {chapters.map((ch) => (
              <option key={ch.id} value={ch.id}>{ch.title}</option>
            ))}
          </select>
          <select name="userType" defaultValue={userType ?? 'all'} className={styles.select}>
            <option value="all">全部用户</option>
            <option value="user">登录用户</option>
            <option value="anon">匿名用户</option>
          </select>
          <select name="sort" defaultValue={sort ?? 'desc'} className={styles.select}>
            <option value="desc">最新</option>
            <option value="asc">最旧</option>
          </select>
          <input
            type="text"
            name="q"
            defaultValue={q ?? ''}
            placeholder="搜索留言内容"
            className={styles.searchInput}
          />
          <button type="submit" className={styles.filterBtn}>筛选</button>
          {(novelId || chapterId || userType || sort || q) && (
            <a href="?" className={styles.clearBtn}>清除</a>
          )}
        </form>
      </div>

      <CommentAdminTable comments={rows} />
    </div>
  )
}
