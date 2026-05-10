import { auth, currentUser } from '@clerk/nextjs/server'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import styles from './layout.module.css'

export default async function AdminLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  setRequestLocale(locale)

  const { userId } = await auth()
  const user = userId ? await currentUser() : null

  if (!user || user.publicMetadata?.role !== 'admin') {
    return (
      <div className={styles.forbidden}>
        <h1 className={styles.forbiddenCode}>403</h1>
        <p className={styles.forbiddenMsg}>您没有访问此页面的权限</p>
        <Link href="/" className={styles.forbiddenBack}>← 返回首页</Link>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <nav className={styles.nav}>
        <span className={styles.brand}>Admin</span>
        <div className={styles.links}>
          <Link href="/admin/dashboard" className={styles.link}>统计</Link>
          <Link href="/admin/novels" className={styles.link}>小说</Link>
          <Link href="/admin/users" className={styles.link}>用户</Link>
          <Link href="/admin/categories" className={styles.link}>分类</Link>
          <Link href="/admin/comments" className={styles.link}>评论</Link>
        </div>
        <Link href="/" className={styles.backLink}>← 返回首页</Link>
      </nav>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
