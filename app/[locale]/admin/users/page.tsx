import { setRequestLocale } from 'next-intl/server'
import { clerkClient } from '@clerk/nextjs/server'
import UserAdminRow from './_components/UserAdminRow'
import styles from './page.module.css'

export default async function AdminUsersPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)

  const client = await clerkClient()
  const result = await client.users.getUserList({
    limit: 100,
    orderBy: '-created_at',
  })

  const users = result.data.map((u) => ({
    id: u.id,
    email: u.emailAddresses[0]?.emailAddress ?? '(no email)',
    createdAt: u.createdAt,
    banned: u.banned ?? false,
  }))

  return (
    <div>
      <h1 className={styles.title}>
        用户管理 <span className={styles.count}>({result.totalCount} 人)</span>
      </h1>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>邮箱</th>
              <th>注册时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <UserAdminRow key={u.id} user={u} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
