import { clerkClient } from '@clerk/nextjs/server'
import { setRequestLocale } from 'next-intl/server'
import { prisma } from '@/lib/prisma'
import CommentAdminTable from './_components/CommentAdminTable'
import styles from './page.module.css'

function displayName(u: { username: string | null; firstName: string | null; lastName: string | null }) {
  return u.username ?? ([u.firstName, u.lastName].filter(Boolean).join(' ') || '用户')
}

const PAGE_SIZE = 50

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
    page?: string
  }
}) {
  setRequestLocale(locale)

  const { novelId, chapterId, userType, sort, q } = searchParams
  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10) || 1)

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

  const [comments, filteredCount, totalCount, todayCount, anonCount, deletedCount] = await Promise.all([
    prisma.comment.findMany({
      where,
      include: {
        chapter: { select: { id: true, title: true, novel: { select: { id: true, title: true } } } },
        parent: { select: { content: true } },
      },
      orderBy: { createdAt: sort === 'asc' ? 'asc' : 'desc' },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    }),
    prisma.comment.count({ where }),
    prisma.comment.count(),
    prisma.comment.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.comment.count({ where: { userId: null } }),
    prisma.comment.count({ where: { isDeleted: true } }),
  ])

  const totalPages = Math.max(1, Math.ceil(filteredCount / PAGE_SIZE))
  const pageQuery = (p: number) => {
    const sp = new URLSearchParams()
    if (novelId) sp.set('novelId', novelId)
    if (chapterId) sp.set('chapterId', chapterId)
    if (userType) sp.set('userType', userType)
    if (sort) sp.set('sort', sort)
    if (q) sp.set('q', q)
    sp.set('page', String(p))
    return `?${sp.toString()}`
  }

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
      <div className="stat-card-grid">
        <div className="stat-card">
          <span className="stat-card-value">{totalCount}</span>
          <span className="stat-card-label">总留言数</span>
        </div>
        <div className="stat-card">
          <span className="stat-card-value">{todayCount}</span>
          <span className="stat-card-label">今日新增</span>
        </div>
        <div className="stat-card">
          <span className="stat-card-value">{anonCount}</span>
          <span className="stat-card-label">匿名留言</span>
        </div>
        <div className="stat-card">
          <span className="stat-card-value">{deletedCount}</span>
          <span className="stat-card-label">已删除</span>
        </div>
      </div>

      <div className={styles.titleRow}>
        <h1 className={`admin-title ${styles.titleRowH1}`}>
          评论管理 <span className="admin-count">({filteredCount})</span>
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

      {totalPages > 1 && (
        <div className={styles.filterForm} style={{ marginTop: '1rem', justifyContent: 'center' }}>
          <a href={pageQuery(Math.max(1, page - 1))} className={styles.filterBtn} aria-disabled={page <= 1}>
            上一页
          </a>
          <span className="stat-card-label">第 {page} / {totalPages} 页</span>
          <a
            href={pageQuery(Math.min(totalPages, page + 1))}
            className={styles.filterBtn}
            aria-disabled={page >= totalPages}
          >
            下一页
          </a>
        </div>
      )}
    </div>
  )
}
