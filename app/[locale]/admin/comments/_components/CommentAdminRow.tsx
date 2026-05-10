'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../page.module.css'

interface CommentRow {
  id: string
  content: string
  authorId: string
  chapterTitle: string
  novelTitle: string
  paragraphIndex: number
  isDeleted: boolean
  createdAt: string
}

export default function CommentAdminRow({ comment }: { comment: CommentRow }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [confirming, setConfirming] = useState(false)

  function handleForceDelete() {
    startTransition(async () => {
      await fetch(`/api/comments/${comment.id}`, { method: 'DELETE' })
      router.refresh()
    })
    setConfirming(false)
  }

  const time = new Date(comment.createdAt).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <tr className={`${styles.row} ${comment.isDeleted ? styles.rowDeleted : ''}`}>
      <td className={styles.tdContent}>
        {comment.isDeleted ? (
          <span className={styles.deletedText}>该评论已删除</span>
        ) : (
          comment.content
        )}
      </td>
      <td className={styles.tdMono}>{comment.authorId.slice(0, 12)}…</td>
      <td className={styles.tdChapter}>
        <span className={styles.novelName}>{comment.novelTitle}</span>
        <span className={styles.chapterName}>{comment.chapterTitle}</span>
      </td>
      <td>第{comment.paragraphIndex + 1}段</td>
      <td>
        <span className={comment.isDeleted ? styles.statusDeleted : styles.statusNormal}>
          {comment.isDeleted ? '已删除' : '正常'}
        </span>
      </td>
      <td className={styles.tdTime}>{time}</td>
      <td className={styles.tdActions}>
        {!comment.isDeleted && (
          confirming ? (
            <>
              <button
                onClick={handleForceDelete}
                disabled={isPending}
                className={styles.btnDangerConfirm}
              >
                确认
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
          )
        )}
      </td>
    </tr>
  )
}
