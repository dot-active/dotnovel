'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import TranslateLocaleModal from './TranslateLocaleModal'
import styles from '../page.module.css'

interface Props {
  chapterId: string
  availableLocales: string[]
}

export default function ChapterTranslateButton({ chapterId, availableLocales }: Props) {
  const t = useTranslations('author')
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleConfirm(targetLocales: string[]) {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch(`/api/chapters/${chapterId}/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetLocales }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || t('translateFailed'))
      if (data.conflicts?.length > 0 && data.triggered?.length === 0) {
        throw new Error(t('translateConflict'))
      }
      setOpen(false)
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : t('translateFailed'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <button type="button" className={styles.editBtn} onClick={() => setOpen(true)}>
        {t('translateChapterBtn')}
      </button>
      {open && (
        <TranslateLocaleModal
          title={t('translateModalTitle')}
          availableLocales={availableLocales}
          submitting={submitting}
          error={error}
          onConfirm={handleConfirm}
          onClose={() => { setOpen(false); setError(null) }}
        />
      )}
    </>
  )
}
