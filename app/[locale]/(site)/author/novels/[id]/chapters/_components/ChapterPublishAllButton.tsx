'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import styles from '../page.module.css'

interface Props {
  chapterId: string
}

// Publishes every draft translation of this one chapter, across all locales.
export default function ChapterPublishAllButton({ chapterId }: Props) {
  const t = useTranslations('author')
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch(`/api/chapters/${chapterId}/publish-all`, { method: 'POST' })
      if (!res.ok) throw new Error('Failed')
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <button type="button" className={styles.editBtn} disabled={loading} onClick={handleClick}>
      {loading ? t('publishingAll') : t('publishAllLocales')}
    </button>
  )
}
