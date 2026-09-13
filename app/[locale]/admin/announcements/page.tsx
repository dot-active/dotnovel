import { setRequestLocale } from 'next-intl/server'
import { prisma } from '@/lib/prisma'
import AnnouncementForm, { AnnouncementDeleteButton } from './_components/AnnouncementForm'
import styles from './page.module.css'

export default async function AdminAnnouncementsPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)

  const announcements = await prisma.announcement.findMany({
    include: { _count: { select: { reads: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <h1 className="admin-title">
        系统公告 <span className="admin-count">({announcements.length})</span>
      </h1>

      <div className={styles.layout}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>标题</th>
                <th>内容</th>
                <th>已读人数</th>
                <th>发布时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((a) => (
                <tr key={a.id}>
                  <td className={styles.tdTitle}>{a.title}</td>
                  <td className={styles.tdContent}>{a.content}</td>
                  <td>{a._count.reads}</td>
                  <td>{a.createdAt.toLocaleString('zh-CN')}</td>
                  <td>
                    <AnnouncementDeleteButton announcementId={a.id} />
                  </td>
                </tr>
              ))}
              {announcements.length === 0 && (
                <tr>
                  <td colSpan={5} className={styles.emptyRow}>暂无公告</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.formBox}>
          <h2 className={styles.formTitle}>发布公告</h2>
          <p className={styles.formHint}>发布后，所有注册用户都会在「我的留言 → 系统公告」中看到此公告。</p>
          <AnnouncementForm />
        </div>
      </div>
    </div>
  )
}
