'use client'

import { useState } from 'react'
import { deleteNovel } from '@/lib/actions/author'
import styles from './DeleteNovelButton.module.css'

interface Props {
  novelId: string
  locale: string
}

export default function DeleteNovelButton({ novelId, locale }: Props) {
  const [confirming, setConfirming] = useState(false)

  if (confirming) {
    return (
      <span className={styles.confirmRow}>
        <span className={styles.confirmText}>确定删除？</span>
        <form action={deleteNovel} style={{ display: 'contents' }}>
          <input type="hidden" name="novelId" value={novelId} />
          <input type="hidden" name="locale" value={locale} />
          <button type="submit" className={styles.confirmYes}>
            删除
          </button>
        </form>
        <button
          type="button"
          className={styles.confirmNo}
          onClick={() => setConfirming(false)}
        >
          取消
        </button>
      </span>
    )
  }

  return (
    <button
      type="button"
      className={styles.deleteBtn}
      onClick={() => setConfirming(true)}
    >
      删除
    </button>
  )
}
