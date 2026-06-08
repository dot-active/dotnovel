'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './PublishAllDraftsButton.module.css'

interface Props {
  novelId: string
}

export default function PublishAllDraftsButton({ novelId }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch(`/api/translations/${novelId}/publish-all`, { method: 'POST' })
      if (!res.ok) throw new Error('Failed')
      router.refresh()
    } catch {
      setLoading(false)
    }
  }

  return (
    <button type="button" className={styles.publishBtn} disabled={loading} onClick={handleClick}>
      {loading ? '发布中…' : '发布所有草稿'}
    </button>
  )
}
