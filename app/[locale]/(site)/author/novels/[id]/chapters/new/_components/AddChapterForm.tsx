'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { createChapter } from '@/lib/actions/author'
import styles from './AddChapterForm.module.css'

interface Props {
  novelId: string
  locale: string        // browsing locale (for redirect path)
  sourceLocale: string  // chapter writing locale
  defaultOrder: number
  volumes?: { id: string; title: string }[]
}

export default function AddChapterForm({ novelId, locale, sourceLocale, defaultOrder, volumes = [] }: Props) {
  const t = useTranslations('author.form')
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [submitting, setSubmitting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [volumeId, setVolumeId] = useState('')

  async function handleSubmit(publishStatus: 'published' | 'draft', continueAdding: boolean) {
    const key = publishStatus + (continueAdding ? '-continue' : '')
    setSubmitting(key)
    setError(null)

    try {
      const formData = new FormData(formRef.current!)
      formData.set('novelId', novelId)
      formData.set('sourceLocale', sourceLocale)
      formData.set('browsingLocale', locale)
      formData.set('publishStatus', publishStatus)
      formData.set('continueAdding', String(continueAdding))
      if (volumeId) formData.set('volumeId', volumeId)

      const result = await createChapter(formData)
      if ('error' in result && result.error) {
        setError(result.error)
        setSubmitting(null)
        return
      }
      if (result.redirectUrl) {
        router.push(result.redirectUrl)
        router.refresh()
        // keep overlay visible until component unmounts after navigation
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setSubmitting(null)
    }
  }

  const busy = submitting !== null
  const continuing = submitting === 'published-continue'

  return (
    <>
      {continuing && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingBar}>
            <div className={styles.loadingBarFill} />
          </div>
          <p className={styles.loadingText}>{t('submitting')}</p>
        </div>
      )}
    <form ref={formRef} className={styles.form}>
      <div className={styles.row}>
        <div className={styles.field} style={{ flex: '1 1 auto' }}>
          <label className={styles.label}>
            {t('chapterTitle')} <span className={styles.required}>*</span>
          </label>
          <input
            name="title"
            type="text"
            required
            placeholder={t('chapterTitlePlaceholder')}
            className={styles.input}
          />
        </div>

        <div className={styles.field} style={{ flex: '0 0 120px' }}>
          <label className={styles.label}>{t('chapterOrder')}</label>
          <input
            name="order"
            type="number"
            min={0}
            defaultValue={defaultOrder}
            required
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field} style={{ flex: '0 0 auto' }}>
          <label className={styles.label}>{t('language_label')}</label>
          <div className={styles.localeBadge}>{sourceLocale}</div>
        </div>

        {volumes.length > 0 && (
          <div className={styles.field} style={{ flex: '1 1 auto' }}>
            <label className={styles.label}>{t('volume_label')}</label>
            <select
              value={volumeId}
              onChange={(e) => setVolumeId(e.target.value)}
              className={styles.input}
            >
              <option value="">{t('volume_none')}</option>
              {volumes.map((v) => (
                <option key={v.id} value={v.id}>{v.title}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          {t('chapterContent')} <span className={styles.required}>*</span>
        </label>
        <textarea
          name="content"
          required
          rows={22}
          placeholder={t('chapterContentPlaceholder')}
          className={styles.textarea}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.footer}>
        <button
          type="button"
          disabled={busy}
          className={styles.draftBtn}
          onClick={() => handleSubmit('draft', false)}
        >
          {submitting === 'draft' ? '…' : t('saveDraft')}
        </button>
        <div className={styles.publishGroup}>
          <button
            type="button"
            disabled={busy}
            className={styles.secondaryBtn}
            onClick={() => handleSubmit('published', false)}
          >
            {submitting === 'published' ? '…' : t('submitChapter')}
          </button>
          <button
            type="button"
            disabled={busy}
            className={styles.primaryBtn}
            onClick={() => handleSubmit('published', true)}
          >
            {submitting === 'published-continue' ? '…' : t('submitAndContinue')}
          </button>
        </div>
      </div>
    </form>
    </>
  )
}
