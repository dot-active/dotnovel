import { setRequestLocale } from 'next-intl/server'
import { clerkClient } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import styles from './page.module.css'

export default async function AdminDashboardPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)

  const [novelCount, chapterCount, adultNovelCount, unpublishedNovelCount] = await Promise.all([
    prisma.novel.count(),
    prisma.chapter.count(),
    prisma.novel.count({ where: { isAdult: true } }),
    prisma.novel.count({ where: { publishStatus: 'unpublished' } }),
  ])

  const client = await clerkClient()
  const usersResult = await client.users.getUserList({ limit: 1, offset: 0 })
  const userCount = usersResult.totalCount

  const stats = [
    { label: '总小说数', value: novelCount, sub: `${unpublishedNovelCount} 已下架` },
    { label: '总章节数', value: chapterCount, sub: null },
    { label: '注册用户', value: userCount, sub: null },
    { label: '18+ 小说', value: adultNovelCount, sub: null },
  ]

  return (
    <div>
      <h1 className={styles.title}>数据统计</h1>
      <div className={styles.grid}>
        {stats.map((s) => (
          <div key={s.label} className={styles.card}>
            <span className={styles.cardValue}>{s.value.toLocaleString()}</span>
            <span className={styles.cardLabel}>{s.label}</span>
            {s.sub && <span className={styles.cardSub}>{s.sub}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
