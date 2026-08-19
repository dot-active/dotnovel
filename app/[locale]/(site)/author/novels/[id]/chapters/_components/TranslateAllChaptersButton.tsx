'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import TranslateLocaleModal from './TranslateLocaleModal'

interface Props {
  novelId: string
  availableLocales: string[]
  localeStatus: Record<string, { status: string; totalChapters: number; doneChapters: number }>
}

export default function TranslateAllChaptersButton({ novelId, availableLocales, localeStatus }: Props) {
  const t = useTranslations('author')
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleConfirm(targetLocales: string[]) {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch(`/api/novels/${novelId}/chapters/translate-all`, {
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
      <button type="button" className="btn-secondary" onClick={() => setOpen(true)}>
        {t('translateAllChapters')}
      </button>
      {open && (
        <TranslateLocaleModal
          title={t('translateModalTitle')}
          availableLocales={availableLocales}
          localeStatus={localeStatus}
          submitting={submitting}
          error={error}
          onConfirm={handleConfirm}
          onClose={() => { setOpen(false); setError(null) }}
        />
      )}
    </>
  )
}
