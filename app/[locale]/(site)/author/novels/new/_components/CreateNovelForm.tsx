'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { createNovel } from '@/lib/actions/author'
import styles from './CreateNovelForm.module.css'

const LOCALE_OPTIONS = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'zh-TW', label: '繁體中文' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
  { value: 'es', label: 'Español' },
]

const ALL_LOCALES = LOCALE_OPTIONS.map((l) => l.value)

interface Category {
  id: string
  slug: string
}

interface Props {
  categories: Category[]
  locale: string
  selectedCategoryIds?: string[]
}

export default function CreateNovelForm({ categories, locale, selectedCategoryIds = [] }: Props) {
  const t = useTranslations('author.form')
  const tCat = useTranslations('categories')

  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [selectedLocale, setSelectedLocale] = useState('zh-CN')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const allowed = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowed.includes(file.type)) {
      setFileError(t('coverHint'))
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setFileError(t('coverHint'))
      return
    }
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
        if (!res.ok) {
          const { error: msg } = await res.json()
          throw new Error(msg)
        }
        coverUrl = (await res.json()).url
      }

      const formData = new FormData(formRef.current!)
      formData.set('coverUrl', coverUrl)
      formData.set('sourceLocale', selectedLocale)
      formData.set('locale', locale)

      await createNovel(formData)
    } catch (err) {
      if (err instanceof Error && err.message.includes('NEXT_REDIRECT')) throw err
      setError(err instanceof Error ? err.message : 'An error occurred')
      setSubmitting(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.layout}>
        {/* ── Left column: main fields ── */}
        <div className={styles.main}>
          {/* Pen name */}
          <div className={styles.field}>
            <label className={styles.label}>{t('penName')}</label>
            <input
              name="penName"
              type="text"
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
              placeholder={t('descriptionPlaceholder')}
              className={styles.textarea}
            />
          </div>

          {/* Category */}
          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label className={styles.label}>{t('category')}</label>
              <div className={styles.checkboxGroup}>
                {categories.map((cat) => (
                  <label key={cat.id} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="categoryIds"
                      value={cat.id}
                      defaultChecked={selectedCategoryIds.includes(cat.id)}
                    />
                    <span>{tCat(cat.slug as Parameters<typeof tCat>[0])}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Writing language */}
            <div className={styles.field}>
              <label className={styles.label}>
                {t('language')} <span className={styles.required}>*</span>
              </label>
              <select
                value={selectedLocale}
                onChange={(e) => setSelectedLocale(e.target.value)}
                className={styles.select}
              >
                {LOCALE_OPTIONS.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
              <p className={styles.hint}>{t('languageHint')}</p>
            </div>
          </div>

          {/* Translation reserved (disabled) */}
          <div className={styles.translationBox}>
            <p className={styles.translationTitle}>
              {t('translationTitle')}
            </p>
            <p className={styles.translationHint}>{t('translationHint')}</p>
            <div className={styles.translationLocales}>
              {ALL_LOCALES.filter((l) => l !== selectedLocale).map((l) => {
                const opt = LOCALE_OPTIONS.find((x) => x.value === l)!
                return (
                  <label key={l} className={styles.translationLocale}>
                    <input type="checkbox" disabled />
                    <span>{opt.label}</span>
                  </label>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Right column: cover ── */}
        <div className={styles.sidebar}>
          <div className={styles.field}>
            <label className={styles.label}>{t('cover')}</label>
            <div
              className={styles.coverArea}
              onClick={() => fileInputRef.current?.click()}
            >
              {coverPreview ? (
                <img src={coverPreview} alt="cover preview" className={styles.coverPreview} />
              ) : (
                <div className={styles.coverPlaceholder}>
                  <span className={styles.coverIcon}>🖼</span>
                  <span>{t('coverUpload')}</span>
                </div>
              )}
            </div>
            {coverPreview && (
              <button
                type="button"
                className={styles.coverChangeBtn}
                onClick={() => fileInputRef.current?.click()}
              >
                {t('coverChange')}
              </button>
            )}
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
          {submitting ? t('submitting') : t('submit')}
        </button>
      </div>
    </form>
  )
}
