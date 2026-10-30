'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import TranslateLocaleModal from '@/app/[locale]/(site)/author/novels/[id]/chapters/_components/TranslateLocaleModal'
import styles from './ManualTranslateButton.module.css'

interface Props {
  chapterId: string
  availableLocales: string[]
  localeStatus: Record<string, { status: string; totalChapters: number; doneChapters: number }>
  /** True while any translation job for this novel is queued or running. */
  translating: boolean
}

/**
 * Manual counterpart of ChapterTranslateButton: queues the chapter for the
 * local `npm run translate:manual` script instead of Trigger.dev. Both kinds
 * share one TranslationRequest row per (novel, locale), so a job of either
 * kind blocks both buttons.
 */
export default function ManualChapterTranslateButton({
  chapterId,
  availableLocales,
  localeStatus,
  translating,
}: Props) {
  const t = useTranslations('author')
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const busy = submitting || translating

  async function handleConfirm(targetLocales: string[]) {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch(`/api/chapters/${chapterId}/translate-manual`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetLocales }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || t('translateFailed'))
      if (data.conflicts?.length > 0 && data.queued?.length === 0) {
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
      <button
        type="button"
        className={`btn-secondary btn-sm ${styles.manualBtn}`}
        disabled={busy}
        onClick={() => setOpen(true)}
      >
        {busy ? t('manualTranslateQueuedBtn') : t('manualTranslateChapterBtn')}
      </button>
      {open && (
        <TranslateLocaleModal
          title={t('manualTranslateModalTitle')}
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
