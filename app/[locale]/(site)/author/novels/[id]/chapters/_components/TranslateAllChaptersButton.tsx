'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import TranslateLocaleModal from './TranslateLocaleModal'

interface Props {
  novelId: string
  availableLocales: string[]
  localeStatus: Record<string, { status: string; totalChapters: number; doneChapters: number }>
  /** True while any translation job for this novel is queued or running. */
  translating: boolean
}

export default function TranslateAllChaptersButton({ novelId, availableLocales, localeStatus, translating }: Props) {
  const t = useTranslations('author')
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // `submitting` covers the request that queues the job; `translating` covers
  // the background job itself, which is what actually takes a while.
  const busy = submitting || translating

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
      if (data.triggered?.length === 0 && data.conflicts?.length === 0 && data.skipped?.length > 0) {
        throw new Error(t('translateAllUpToDate'))
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
      {/* A queued job takes a while to finish, so the button reports the
          running state instead of inviting another click that would only be
          rejected as a conflict. */}
      <button
        type="button"
        className="btn-secondary"
        disabled={busy}
        onClick={() => setOpen(true)}
      >
        {busy ? t('translateInProgressBtn') : t('translateAllChapters')}
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
