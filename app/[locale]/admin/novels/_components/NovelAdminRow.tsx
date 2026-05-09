'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toggleNovelPublishStatus, deleteNovelAdmin } from '@/lib/actions/admin'
import styles from '../page.module.css'

interface Novel {
  id: string
  title: string
  categorySlug: string | null
  sourceLocale: string
  isAdult: boolean
  publishStatus: string
  chapterCount: number
}

export default function NovelAdminRow({ novel }: { novel: Novel }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [confirming, setConfirming] = useState(false)

  const isPublished = novel.publishStatus === 'published'

  function handleToggle() {
    const fd = new FormData()
    fd.set('novelId', novel.id)
    fd.set('currentStatus', novel.publishStatus)
    startTransition(async () => {
      await toggleNovelPublishStatus(fd)
      router.refresh()
    })
  }

  function handleDelete() {
    const fd = new FormData()
    fd.set('novelId', novel.id)
    startTransition(async () => {
      await deleteNovelAdmin(fd)
      router.refresh()
    })
    setConfirming(false)
  }

  return (
    <tr className={`${styles.row} ${!isPublished ? styles.rowUnpublished : ''}`}>
      <td className={styles.tdTitle}>{novel.title}</td>
      <td>{novel.categorySlug ?? '—'}</td>
      <td>{novel.sourceLocale}</td>
      <td>{novel.chapterCount}</td>
      <td>{novel.isAdult ? <span className={styles.badge18}>18+</span> : '—'}</td>
      <td>
        <span className={isPublished ? styles.statusOn : styles.statusOff}>
          {isPublished ? '上架' : '下架'}
        </span>
      </td>
      <td className={styles.tdActions}>
        <button
          onClick={handleToggle}
          disabled={isPending}
          className={styles.btnToggle}
        >
          {isPublished ? '下架' : '上架'}
        </button>
        {confirming ? (
          <>
            <button
              onClick={handleDelete}
              disabled={isPending}
              className={styles.btnDangerConfirm}
            >
              确认删除
            </button>
            <button
              onClick={() => setConfirming(false)}
              className={styles.btnCancel}
            >
              取消
            </button>
          </>
        ) : (
          <button
            onClick={() => setConfirming(true)}
            disabled={isPending}
            className={styles.btnDanger}
          >
            删除
          </button>
        )}
      </td>
    </tr>
  )
}
