'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { updateChapter } from '@/lib/actions/author'
import styles from './EditChapterForm.module.css'

interface ChapterData {
  id: string
  novelId: string
  title: string
  content: string
  order: number
  publishStatus: string
  sourceLocale: string
}

interface Props {
  chapter: ChapterData
  locale: string
}

export default function EditChapterForm({ chapter, locale }: Props) {
  const t = useTranslations('author.form')
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [submitting, setSubmitting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(publishStatus: 'published' | 'draft') {
    setSubmitting(publishStatus)
    setError(null)

    try {
      const formData = new FormData(formRef.current!)
      formData.set('chapterId', chapter.id)
      formData.set('novelId', chapter.novelId)
      formData.set('browsingLocale', locale)
      formData.set('publishStatus', publishStatus)

      const result = await updateChapter(formData)
      if ('error' in result && result.error) {
        setError(result.error)
        return
      }
      if (result.redirectUrl) {
        router.push(result.redirectUrl)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setSubmitting(null)
    }
  }

  const busy = submitting !== null

  return (
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
            defaultValue={chapter.title}
            placeholder={t('chapterTitlePlaceholder')}
            className={styles.input}
          />
        </div>

        <div className={styles.field} style={{ flex: '0 0 120px' }}>
          <label className={styles.label}>{t('chapterOrder')}</label>
          <input
            name="order"
            type="number"
            min={1}
            defaultValue={chapter.order}
            required
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>{t('language_label')}</label>
        <div className={styles.localeBadge}>{chapter.sourceLocale}</div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          {t('chapterContent')} <span className={styles.required}>*</span>
        </label>
        <textarea
          name="content"
          required
          rows={22}
          defaultValue={chapter.content}
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
          onClick={() => handleSubmit('draft')}
        >
          {submitting === 'draft' ? '…' : t('saveDraft')}
        </button>
        <button
          type="button"
          disabled={busy}
          className={styles.primaryBtn}
          onClick={() => handleSubmit('published')}
        >
          {submitting === 'published' ? '…' : t('saveChanges')}
        </button>
      </div>
    </form>
  )
}
