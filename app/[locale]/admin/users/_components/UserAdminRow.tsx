'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { banUser, unbanUser } from '@/lib/actions/admin'
import styles from '../page.module.css'

interface User {
  id: string
  email: string
  createdAt: number
  banned: boolean
}

export default function UserAdminRow({ user }: { user: User }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleBan() {
    const fd = new FormData()
    fd.set('userId', user.id)
    startTransition(async () => {
      await banUser(fd)
      router.refresh()
    })
  }

  function handleUnban() {
    const fd = new FormData()
    fd.set('userId', user.id)
    startTransition(async () => {
      await unbanUser(fd)
      router.refresh()
    })
  }

  return (
    <tr className={user.banned ? styles.rowBanned : ''}>
      <td className={styles.tdEmail}>{user.email}</td>
      <td>{new Date(user.createdAt).toLocaleDateString('zh-CN')}</td>
      <td>
        {user.banned ? (
          <span className={styles.statusBanned}>已封号</span>
        ) : (
          <span className={styles.statusActive}>正常</span>
        )}
      </td>
      <td className={styles.tdActions}>
        {user.banned ? (
          <button
            onClick={handleUnban}
            disabled={isPending}
            className={styles.btnUnban}
          >
            解封
          </button>
        ) : (
          <button
            onClick={handleBan}
            disabled={isPending}
            className={styles.btnBan}
          >
            封号
          </button>
        )}
      </td>
    </tr>
  )
}
