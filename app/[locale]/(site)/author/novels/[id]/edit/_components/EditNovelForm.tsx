'use client'

import { useRef, useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { updateNovel, deleteNovel } from '@/lib/actions/author'
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

/** "a, b , ,c" → ["a", "b", "c"] */
function splitKeywords(raw: string): string[] {
  return raw
    .split(',')
    .map(k => k.trim())
    .filter(Boolean)
}

interface NovelData {
  id: string
  title: string
  description: string
  categoryIds: string[]
  status: string
  coverUrl: string
  sourceLocale: string
  isAdult: boolean
  metaTitle: string
  metaDescription: string
  metaKeywords: string
}

interface Category {
  id: string
  slug: string
}

interface Translation {
  locale: string
  title: string
  description: string
  status: string
  metaTitle: string
  metaDescription: string
  metaKeywords: string
}

interface TranslationRequest {
  targetLocale: string
  status: string
}

interface Props {
  novel: NovelData
  categories: Category[]
  locale: string
  translations: Translation[]
  translationRequests: TranslationRequest[]
  initialLang?: string | null
}

export default function EditNovelForm({
  novel,
  categories,
  locale,
  translations,
  translationRequests,
  initialLang,
}: Props) {
  const t = useTranslations('author.form')
  const tAuthor = useTranslations('author')
  const tCat = useTranslations('categories')
  const tStatus = useTranslations('novel.status')

  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [coverPreview, setCoverPreview] = useState<string>(novel.coverUrl || '')
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [selectedCats, setSelectedCats] = useState<string[]>(novel.categoryIds)
  const [isAdult, setIsAdult] = useState(novel.isAdult)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  // Language switching
  const [selectedLang, setSelectedLang] = useState(initialLang ?? novel.sourceLocale)
  const [titleValue, setTitleValue] = useState(novel.title)
  const [descValue, setDescValue] = useState(novel.description)
  const [titleLen, setTitleLen] = useState(novel.title.length)
  const [descLen, setDescLen] = useState(novel.description.length)

  // SEO meta (per locale, all optional)
  const [seoOpen, setSeoOpen] = useState(false)
  const [metaTitle, setMetaTitle] = useState(novel.metaTitle)
  const [metaDescription, setMetaDescription] = useState(novel.metaDescription)
  // Keywords are edited one at a time as chips, stored comma-separated
  const [keywords, setKeywords] = useState<string[]>(splitKeywords(novel.metaKeywords))
  const [keywordDraft, setKeywordDraft] = useState('')

  const isSourceSelected = selectedLang === novel.sourceLocale

  // Build available locales for dropdown: source + existing translations + active requests
  const availableLocales = new Set<string>([novel.sourceLocale])
  translations.forEach(tr => availableLocales.add(tr.locale))
  translationRequests
    .filter(r => ['pending', 'processing'].includes(r.status))
    .forEach(r => availableLocales.add(r.targetLocale))

  function getLocaleStatusLabel(localeValue: string): string {
    if (localeValue === novel.sourceLocale) return t('language')
    const tr = translations.find(t => t.locale === localeValue)
    if (tr?.status === 'published') return tAuthor('published')
    const req = translationRequests.find(r => r.targetLocale === localeValue)
    if (req?.status === 'processing' || req?.status === 'pending') return t('translating')
    return ''
  }

  // Update displayed content when language changes
  useEffect(() => {
    if (isSourceSelected) {
      setTitleValue(novel.title)
      setDescValue(novel.description)
      setTitleLen(novel.title.length)
      setDescLen(novel.description.length)
      setMetaTitle(novel.metaTitle)
      setMetaDescription(novel.metaDescription)
      setKeywords(splitKeywords(novel.metaKeywords))
      setKeywordDraft('')
    } else {
      const tr = translations.find(t => t.locale === selectedLang)
      setTitleValue(tr?.title ?? '')
      setDescValue(tr?.description ?? '')
      setTitleLen((tr?.title ?? '').length)
      setDescLen((tr?.description ?? '').length)
      setMetaTitle(tr?.metaTitle ?? '')
      setMetaDescription(tr?.metaDescription ?? '')
      setKeywords(splitKeywords(tr?.metaKeywords ?? ''))
      setKeywordDraft('')
    }
  }, [selectedLang])

  const currentTr = isSourceSelected ? null : translations.find(t => t.locale === selectedLang)
  const isProcessingLocale = !isSourceSelected && translationRequests.some(
    r => r.targetLocale === selectedLang && (r.status === 'processing' || r.status === 'pending')
  )
  const isPublishedLocale = !isSourceSelected && currentTr?.status === 'published'

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

  /** Commit the draft as one or more keywords (pasted text may contain commas). */
  function commitKeywordDraft() {
    const parts = splitKeywords(keywordDraft)
    if (parts.length === 0) { setKeywordDraft(''); return }
    setKeywords(prev => {
      const next = [...prev]
      for (const p of parts) if (!next.includes(p)) next.push(p)
      return next
    })
    setKeywordDraft('')
  }

  function handleKeywordKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      // Enter would otherwise submit the whole form
      e.preventDefault()
      commitKeywordDraft()
    } else if (e.key === 'Backspace' && keywordDraft === '' && keywords.length > 0) {
      setKeywords(prev => prev.slice(0, -1))
    }
  }

  function removeKeyword(index: number) {
    setKeywords(prev => prev.filter((_, i) => i !== index))
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
      formData.set('novelId', novel.id)
      formData.set('locale', locale)
      formData.set('editLocale', selectedLang)
      formData.set('isAdult', isAdult ? 'true' : 'false')
      if (coverUrl) formData.set('coverUrl', coverUrl)

      // Keywords live in state, not a form field — include any uncommitted draft
      const allKeywords = [...keywords]
      for (const p of splitKeywords(keywordDraft)) {
        if (!allKeywords.includes(p)) allKeywords.push(p)
      }
      formData.set('metaKeywords', allKeywords.join(', '))

      await updateNovel(formData)
      // Translation-locale saves resolve normally (no redirect) — reset the button
      setSubmitting(false)
    } catch (err) {
      if (err instanceof Error && err.message.includes('NEXT_REDIRECT')) throw err
      setError(err instanceof Error ? err.message : 'An error occurred')
      setSubmitting(false)
    }
  }

  async function handleDelete() {
    setDeleting(true)
    const fd = new FormData()
    fd.append('novelId', novel.id)
    fd.append('locale', locale)
    try {
      await deleteNovel(fd)
    } catch (err) {
      if (err instanceof Error && err.message.includes('NEXT_REDIRECT')) throw err
      setDeleting(false)
      setDeleteConfirm(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>

      {/* ── Section 1: Cover · Title & Synopsis ── */}
      <div className={styles.secDivider}>
        <span className={styles.secCh}>{t('sectionMeta')}</span>
        {!isSourceSelected && (
          <span className={isPublishedLocale ? styles.langStatusPublished : styles.langStatusProcessing}>
            {isPublishedLocale ? tAuthor('published') : t('translating')}
          </span>
        )}
    
     
      </div>

      <div className={styles.headRow}>
        {/* Cover (left) */}
        <div className={styles.coverBlock}>
          <div
            className={styles.coverArea}
            onClick={() => { if (isSourceSelected) fileInputRef.current?.click() }}
            style={!isSourceSelected ? { cursor: 'default' } : undefined}
          >
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
          {isSourceSelected && (
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className={styles.fileInput}
              onChange={handleFileChange}
            />
          )}
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
              value={titleValue}
              placeholder={isProcessingLocale ? t('translatingPlaceholder') : t('titlePlaceholder')}
              className={styles.input}
              onChange={e => { setTitleValue(e.target.value); setTitleLen(e.target.value.length) }}
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
              value={descValue}
              placeholder={isProcessingLocale ? t('translatingPlaceholder') : t('descriptionPlaceholder')}
              className={styles.textarea}
              onChange={e => { setDescValue(e.target.value); setDescLen(e.target.value.length) }}
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
              style={!isSourceSelected ? { pointerEvents: 'none', opacity: 0.6 } : undefined}
            >
              <input
                type="checkbox"
                name="categoryIds"
                value={cat.id}
                checked={isOn}
                onChange={() => isSourceSelected && toggleCat(cat.id)}
              />
              {tCat(cat.slug as Parameters<typeof tCat>[0])}
            </label>
          )
        })}
      </div>

      {/* ── Section 3: Status · Language · Content ── */}
      <div className={styles.secDivider}>
        <span className={styles.secCh}>{t('sectionCover')}</span>
      </div>

      <div className={styles.metaStrip}>
        {/* Status */}
        <div className={styles.field}>
          <div className={styles.fieldLabel}><span>{t('storyStatus')}</span></div>
          <div className={styles.selectWrap}>
            <select
              name="status"
              defaultValue={novel.status}
              className={styles.select}
              disabled={!isSourceSelected}
            >
              {STATUS_OPTIONS.map(s => (
                <option key={s.value} value={s.value}>
                  {tStatus(s.labelKey as Parameters<typeof tStatus>[0])}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Language dropdown */}
        <div className={styles.field}>
          <div className={styles.fieldLabel}><span>{t('language')}</span></div>
          <div className={styles.selectWrap}>
            <select
              value={selectedLang}
              onChange={e => setSelectedLang(e.target.value)}
              className={styles.select}
            >
              {Array.from(availableLocales).map(lv => {
                const label = LOCALE_OPTIONS.find(o => o.value === lv)?.label ?? lv
                const statusLabel = getLocaleStatusLabel(lv)
                return (
                  <option key={lv} value={lv}>
                    {label}{statusLabel ? `（${statusLabel}）` : ''}
                  </option>
                )
              })}
            </select>
          </div>
        </div>

        {/* 18+ toggle */}
        <div className={styles.field}>
          <div className={styles.fieldLabel}><span>{t('isAdult')}</span></div>
          <label className={styles.toggleInline} style={!isSourceSelected ? { pointerEvents: 'none', opacity: 0.6 } : undefined}>
            <div
              className={`${styles.toggle}${isAdult ? ` ${styles.on}` : ''}`}
              onClick={e => { if (!isSourceSelected) return; e.preventDefault(); setIsAdult(a => !a) }}
            />
            <span className={styles.toggleSub}>{t('isAdultHint')}</span>
          </label>
        </div>
      </div>

      {/* ── Section 4: SEO (collapsible, optional) ── */}
      <div className={styles.seoBlock}>
        <button
          type="button"
          className={`${styles.seoHead}${seoOpen ? ` ${styles.open}` : ''}`}
          onClick={() => setSeoOpen(o => !o)}
          aria-expanded={seoOpen}
        >
          <span className={styles.seoHeadTitle}>{t('sectionSeo')}</span>
          <span className={styles.seoCaret} aria-hidden="true" />
        </button>

        <div className={`${styles.seoPanel}${seoOpen ? ` ${styles.open}` : ''}`}>
          <div className={styles.seoPanelInner}>
            <div className={styles.field}>
              <div className={styles.fieldLabel}><span>{t('metaTitle')}</span></div>
              <input
                name="metaTitle"
                type="text"
                value={metaTitle}
                placeholder={t('metaTitlePlaceholder')}
                className={styles.input}
                onChange={e => setMetaTitle(e.target.value)}
              />
              <div className={styles.hintRow}>
                <span className={styles.hint}>{t('metaTitleHint')}</span>
                <span className={`${styles.count}${metaTitle.length > 60 ? ` ${styles.countOver}` : ''}`}>
                  {metaTitle.length} / 60
                </span>
              </div>
            </div>

            <div className={styles.field}>
              <div className={styles.fieldLabel}><span>{t('metaDescription')}</span></div>
              <textarea
                name="metaDescription"
                rows={3}
                value={metaDescription}
                placeholder={t('metaDescriptionPlaceholder')}
                className={styles.textarea}
                onChange={e => setMetaDescription(e.target.value)}
              />
              <div className={styles.hintRow}>
                <span className={styles.hint}>{t('metaDescriptionHint')}</span>
                <span className={`${styles.count}${metaDescription.length > 150 ? ` ${styles.countOver}` : ''}`}>
                  {metaDescription.length} / 150
                </span>
              </div>
            </div>

            <div className={styles.field}>
              <div className={styles.fieldLabel}><span>{t('metaKeywords')}</span></div>
              <div className={styles.kwBox}>
                {keywords.map((kw, i) => (
                  <span key={`${kw}-${i}`} className={styles.kwChip}>
                    {kw}
                    <button
                      type="button"
                      className={styles.kwChipX}
                      onClick={() => removeKeyword(i)}
                      aria-label={`${t('metaKeywordRemove')}：${kw}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={keywordDraft}
                  placeholder={keywords.length === 0 ? t('metaKeywordsPlaceholder') : ''}
                  className={styles.kwInput}
                  onChange={e => setKeywordDraft(e.target.value)}
                  onKeyDown={handleKeywordKeyDown}
                  onBlur={commitKeywordDraft}
                />
                {keywordDraft.trim() && (
                  <button type="button" className={styles.kwAdd} onClick={commitKeywordDraft}>
                    {t('metaKeywordAdd')}
                  </button>
                )}
              </div>
              <div className={styles.hintRow}>
                <span className={styles.hint}>{t('metaKeywordsHint')}</span>
                <span className={styles.count}>{keywords.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && <p className={styles.formError}>{error}</p>}

      {/* ── Footer bar ── */}
      <div className={styles.footerBar}>
        <div className={styles.dangerBit}>
          <span className={styles.dangerBitLabel}>{tAuthor('dangerZone')}</span>
          {deleteConfirm ? (
            <>
              <button
                type="button"
                className={styles.btnDanger}
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? tAuthor('deletingNovel') : tAuthor('confirmDeleteNovel')}
              </button>
              <button
                type="button"
                className={styles.btnCancel}
                onClick={() => setDeleteConfirm(false)}
              >
                {t('cancel')}
              </button>
            </>
          ) : (
            <button
              type="button"
              className={styles.btnDanger}
              onClick={() => setDeleteConfirm(true)}
            >
              {tAuthor('deleteNovelBtn')}
            </button>
          )}
        </div>

        <span className={styles.footerNote}>{t('saveNote')}</span>
        <span className={styles.spacer} />

        <Link href="/author/dashboard" className={`${styles.btn} ${styles.btnGhost}`}>
          {t('cancel')}
        </Link>
        <button type="submit" disabled={submitting} className={styles.btn}>
          {submitting ? t('submitting') : t('saveChanges')}
        </button>
      </div>
    </form>
  )
}
