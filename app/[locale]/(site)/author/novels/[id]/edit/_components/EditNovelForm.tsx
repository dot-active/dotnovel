'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { updateNovel } from '@/lib/actions/author'
import styles from './EditNovelForm.module.css'

const LOCALE_OPTIONS = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'zh-TW', label: '繁體中文' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
  { value: 'es', label: 'Español' },
]

const STATUS_OPTIONS = [
  { value: 'ONGOING', labelKey: 'ONGOING' },
  { value: 'COMPLETED', labelKey: 'COMPLETED' },
  { value: 'HIATUS', labelKey: 'HIATUS' },
]

interface NovelData {
  id: string
  title: string
  description: string
  author: string
  categoryId: string
  status: string
  coverUrl: string
  sourceLocale: string
  isAdult: boolean
}

interface Category {
  id: string
  slug: string
}

interface Props {
  novel: NovelData
  categories: Category[]
  locale: string
}

export default function EditNovelForm({ novel, categories, locale }: Props) {
  const t = useTranslations('author.form')
  const tCat = useTranslations('categories')
  const tStatus = useTranslations('novel.status')

  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [coverPreview, setCoverPreview] = useState<string>(novel.coverUrl || '')
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const allowed = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowed.includes(file.type)) { setFileError(t('coverHint')); return }
    if (file.size > 2 * 1024 * 1024) { setFileError(t('coverHint')); return }
    setFileError(null)
    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      let coverUrl = ''
      if (coverFile) {
        const fd = new FormData()
        fd.append('file', coverFile)
        fd.append('uploadId', crypto.randomUUID())
        const res = await fetch('/api/upload/cover', { method: 'POST', body: fd })
        if (!res.ok) throw new Error((await res.json()).error)
        coverUrl = (await res.json()).url
      }

      const formData = new FormData(formRef.current!)
      formData.set('novelId', novel.id)
      formData.set('locale', locale)
      if (coverUrl) formData.set('coverUrl', coverUrl)

      await updateNovel(formData)
    } catch (err) {
      if (err instanceof Error && err.message.includes('NEXT_REDIRECT')) throw err
      setError(err instanceof Error ? err.message : 'An error occurred')
      setSubmitting(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.layout}>
        <div className={styles.main}>
          {/* Pen name */}
          <div className={styles.field}>
            <label className={styles.label}>{t('penName')}</label>
            <input
              name="penName"
              type="text"
              defaultValue={novel.author}
              placeholder={t('penNamePlaceholder')}
              className={styles.input}
            />
          </div>

          {/* Title */}
          <div className={styles.field}>
            <label className={styles.label}>
              {t('title')} <span className={styles.required}>*</span>
            </label>
            <input
              name="title"
              type="text"
              required
              defaultValue={novel.title}
              placeholder={t('titlePlaceholder')}
              className={styles.input}
            />
          </div>

          {/* Description */}
          <div className={styles.field}>
            <label className={styles.label}>
              {t('description')} <span className={styles.required}>*</span>
            </label>
            <textarea
              name="description"
              required
              rows={5}
              defaultValue={novel.description}
              placeholder={t('descriptionPlaceholder')}
              className={styles.textarea}
            />
          </div>

          <div className={styles.fieldRow}>
            {/* Category */}
            <div className={styles.field}>
              <label className={styles.label}>{t('category')}</label>
              <select name="categoryId" defaultValue={novel.categoryId} className={styles.select}>
                <option value="">{t('selectCategory')}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {tCat(cat.slug as Parameters<typeof tCat>[0])}
                  </option>
                ))}
              </select>
            </div>

            {/* Story status */}
            <div className={styles.field}>
              <label className={styles.label}>{t('storyStatus')}</label>
              <select name="status" defaultValue={novel.status} className={styles.select}>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {tStatus(s.labelKey as Parameters<typeof tStatus>[0])}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Source locale (read-only) */}
          <div className={styles.field}>
            <label className={styles.label}>{t('language')}</label>
            <div className={styles.readonlyField}>
              {LOCALE_OPTIONS.find((l) => l.value === novel.sourceLocale)?.label ?? novel.sourceLocale}
              <span className={styles.readonlyHint}> · 语言不可修改</span>
            </div>
          </div>

          {/* 18+ toggle */}
          <label className={styles.toggleRow}>
            <input
              type="checkbox"
              name="isAdult"
              value="true"
              defaultChecked={novel.isAdult}
              className={styles.toggleInput}
              onChange={(e) => {
                // keep the hidden fallback in sync
                const hidden = document.querySelector<HTMLInputElement>('input[name="isAdultFallback"]')
                if (hidden) hidden.value = e.target.checked ? 'true' : 'false'
              }}
            />
            <span className={styles.toggleTrack}>
              <span className={styles.toggleThumb} />
            </span>
            <div>
              <span className={styles.toggleLabel}>{t('isAdult')}</span>
              <span className={styles.toggleHint}>{t('isAdultHint')}</span>
            </div>
          </label>
          {/* Ensure isAdult=false when checkbox is unchecked */}
          <input type="hidden" name="isAdultFallback" value={novel.isAdult ? 'true' : 'false'} />
        </div>

        {/* Cover sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.field}>
            <label className={styles.label}>{t('cover')}</label>
            <div className={styles.coverArea} onClick={() => fileInputRef.current?.click()}>
              {coverPreview ? (
                <img src={coverPreview} alt="cover" className={styles.coverPreview} />
              ) : (
                <div className={styles.coverPlaceholder}>
                  <span className={styles.coverIcon}>🖼</span>
                  <span>{t('coverUpload')}</span>
                </div>
              )}
            </div>
            <button
              type="button"
              className={styles.coverChangeBtn}
              onClick={() => fileInputRef.current?.click()}
            >
              {t('coverChange')}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className={styles.fileInput}
              onChange={handleFileChange}
            />
            {fileError && <p className={styles.fieldError}>{fileError}</p>}
            <p className={styles.hint}>{t('coverHint')}</p>
          </div>
        </div>
      </div>

      {error && <p className={styles.formError}>{error}</p>}

      <div className={styles.footer}>
        <button type="submit" disabled={submitting} className={styles.submitBtn}>
          {submitting ? t('submitting') : t('saveChanges')}
        </button>
      </div>
    </form>
  )
}
