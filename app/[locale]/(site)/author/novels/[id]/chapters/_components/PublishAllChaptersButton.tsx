'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import styles from '../page.module.css'

interface Props {
  novelId: string
}

// Publishes every draft chapter translation across all locales for this
// novel — same endpoint as the dashboard's "Publish All Drafts" button,
// just surfaced here too since authors manage chapters from this page.
export default function PublishAllChaptersButton({ novelId }: Props) {
  const t = useTranslations('author')
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch(`/api/translations/${novelId}/publish-all`, { method: 'POST' })
      if (!res.ok) throw new Error('Failed')
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <button type="button" className={styles.settingsBtn} disabled={loading} onClick={handleClick}>
      {loading ? t('publishingAll') : t('publishAllChapters')}
    </button>
  )
}
