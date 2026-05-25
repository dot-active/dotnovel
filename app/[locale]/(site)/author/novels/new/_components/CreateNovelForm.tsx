'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
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

interface Category {
  id: string
  slug: string
}

interface Props {
  categories: Category[]
  locale: string
}

export default function CreateNovelForm({ categories, locale }: Props) {
  const t = useTranslations('author.form')
  const tCat = useTranslations('categories')

  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [coverPreview, setCoverPreview] = useState<string>('')
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [titleLen, setTitleLen] = useState(0)
  const [descLen, setDescLen] = useState(0)
  const [selectedCats, setSelectedCats] = useState<string[]>([])
  const [isAdult, setIsAdult] = useState(false)
  const [sourceLocale, setSourceLocale] = useState('zh-CN')
  const [targetLocales, setTargetLocales] = useState<string[]>([])

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

  function toggleCat(catId: string) {
    setSelectedCats(prev => {
      if (prev.includes(catId)) return prev.filter(id => id !== catId)
      if (prev.length >= 3) return prev
      return [...prev, catId]
    })
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
      formData.set('coverUrl', coverUrl)
      formData.set('locale', locale)
      formData.set('isAdult', isAdult ? 'true' : 'false')

      await createNovel(formData)
    } catch (err) {
      if (err instanceof Error && err.message.includes('NEXT_REDIRECT')) throw err
      setError(err instanceof Error ? err.message : 'An error occurred')
      setSubmitting(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>

      {/* ── Section 1: Cover · Title & Synopsis ── */}
      <div className={styles.secDivider}>
        <span className={styles.secCh}>{t('sectionMeta')}</span>
      </div>

      <div className={styles.headRow}>
        {/* Cover (left) */}
        <div className={styles.coverBlock}>
          <div className={styles.coverArea} onClick={() => fileInputRef.current?.click()}>
            {coverPreview ? (
              <img src={coverPreview} alt="cover" className={styles.coverPreview} />
            ) : (
              <>
                <span className={styles.coverGlyph}>❦</span>
                <span className={styles.coverPl}>{t('coverUpload')}</span>
              </>
            )}
          </div>
          <div className={styles.coverHint}>
            JPG · PNG · WebP
            <span className={styles.coverSpec}>1200 × 1600 · max 2 MB</span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className={styles.fileInput}
            onChange={handleFileChange}
          />
          {fileError && <p className={styles.fieldError}>{fileError}</p>}
        </div>

        {/* Title + Synopsis (right) */}
        <div>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>
              <span>{t('title')} <span className={styles.req}>*</span></span>
              <span className={styles.count}>{titleLen} / 30</span>
            </div>
            <input
              name="title"
              type="text"
              required
              maxLength={30}
              placeholder={t('titlePlaceholder')}
              className={styles.input}
              onChange={e => setTitleLen(e.target.value.length)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>
              <span>{t('description')} <span className={styles.req}>*</span></span>
              <span className={styles.count}>{descLen} / 300</span>
            </div>
            <textarea
              name="description"
              required
              rows={5}
              maxLength={300}
              placeholder={t('descriptionPlaceholder')}
              className={styles.textarea}
              onChange={e => setDescLen(e.target.value.length)}
            />
          </div>
        </div>
      </div>

      {/* ── Section 2: Category ── */}
      <div className={styles.secDivider}>
        <span className={styles.secCh}>{t('sectionCategory')}</span>
        <span className={styles.secNote}>{t('categoryNote')}</span>
      </div>

      <div className={styles.tagGrid}>
        {categories.map(cat => {
          const isOn = selectedCats.includes(cat.id)
          return (
            <label
              key={cat.id}
              className={`${styles.tagCheck}${isOn ? ` ${styles.on}` : ''}`}
            >
              <input
                type="checkbox"
                name="categoryIds"
                value={cat.id}
                checked={isOn}
                onChange={() => toggleCat(cat.id)}
              />
              {tCat(cat.slug as Parameters<typeof tCat>[0])}
            </label>
          )
        })}
      </div>

      {/* ── Section 3: Language · 18+ ── */}
      <div className={styles.secDivider}>
        <span className={styles.secCh}>{t('sectionCover')}</span>
      </div>

      <div className={styles.metaStrip}>
        {/* Writing language */}
        <div className={styles.field}>
          <div className={styles.fieldLabel}><span>{t('language')} <span className={styles.req}>*</span></span></div>
          <div className={styles.selectWrap}>
            <select
              name="sourceLocale"
              className={styles.select}
              value={sourceLocale}
              onChange={e => {
                setSourceLocale(e.target.value)
                setTargetLocales(prev => prev.filter(l => l !== e.target.value))
              }}
            >
              {LOCALE_OPTIONS.map(l => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 18+ toggle */}
        <div className={styles.field}>
          <div className={styles.fieldLabel}><span>{t('isAdult')}</span></div>
          <label className={styles.toggleInline}>
            <div
              className={`${styles.toggle}${isAdult ? ` ${styles.on}` : ''}`}
              onClick={e => { e.preventDefault(); setIsAdult(a => !a) }}
            />
            <span className={styles.toggleSub}>{t('isAdultHint')}</span>
          </label>
        </div>
      </div>

      {/* ── Section 4: Translation languages ── */}
      <div className={styles.secDivider}>
        <span className={styles.secCh}>翻 译 语 言</span>
        <span className={styles.secNote}>发布后可在编辑页一键触发 AI 翻译</span>
      </div>

      <div className={styles.tagGrid}>
        {LOCALE_OPTIONS.filter(l => l.value !== sourceLocale).map(l => {
          const isOn = targetLocales.includes(l.value)
          return (
            <label
              key={l.value}
              className={`${styles.tagCheck}${isOn ? ` ${styles.on}` : ''}`}
            >
              <input
                type="checkbox"
                name="targetLocales"
                value={l.value}
                checked={isOn}
                onChange={() => setTargetLocales(prev =>
                  prev.includes(l.value) ? prev.filter(x => x !== l.value) : [...prev, l.value]
                )}
              />
              {l.label}
            </label>
          )
        })}
      </div>

      {error && <p className={styles.formError}>{error}</p>}

      {/* ── Footer bar ── */}
      <div className={styles.footerBar}>
        <span className={styles.spacer} />
        <Link href="/author/dashboard" className={`${styles.btn} ${styles.btnGhost}`}>
          {t('cancel')}
        </Link>
        <button type="submit" disabled={submitting} className={styles.btn}>
          {submitting ? t('submitting') : t('submit')}
        </button>
      </div>
    </form>
  )
}
