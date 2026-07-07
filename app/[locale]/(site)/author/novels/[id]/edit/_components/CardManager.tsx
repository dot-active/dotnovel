'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import styles from './CardManager.module.css'

// ── Types ──────────────────────────────────────────────────────────────────

interface CardTranslation {
  id: string
  locale: string
  title: string
  description: string
  status: string
}

interface NovelCard {
  id: string
  novelId: string
  imageUrl: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  translations: CardTranslation[]
}

interface LocaleContent {
  title: string
  description: string
}

interface Props {
  novelId: string
  sourceLocale: string
  availableLocales: string[]
}

// ── Helpers ───────────────────────────────────────────────────────────────

async function extractError(res: Response, fallback: string): Promise<string> {
  try {
    const data = await res.json()
    return data?.error ?? fallback
  } catch {
    return fallback
  }
}

// ── Component ──────────────────────────────────────────────────────────────

export default function CardManager({ novelId, sourceLocale, availableLocales }: Props) {
  const t = useTranslations('cardManager')

  const LOCALE_LABELS: Record<string, string> = {
    'zh-CN': t('localeZhCN'),
    'zh-TW': t('localeZhTW'),
    en: 'EN',
    ja: 'JA',
    ko: 'KO',
    es: 'ES',
  }

  // ── List state ──
  const [cards, setCards] = useState<NovelCard[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  // ── Form/modal state ──
  const [showForm, setShowForm] = useState(false)
  const [editingCard, setEditingCard] = useState<NovelCard | null>(null)

  // Image
  const [imageUrl, setImageUrl] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState('')

  // Multi-locale content
  const [selectedLocale, setSelectedLocale] = useState(sourceLocale)
  const [contents, setContents] = useState<Record<string, LocaleContent>>({})

  // Operations
  const [translating, setTranslating] = useState(false)
  const [translatingSingle, setTranslatingSingle] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  const fileRef = useRef<HTMLInputElement>(null)

  // ── Load ──────────────────────────────────────────────────────────────────

  async function loadCards() {
    setLoading(true)
    const res = await fetch(`/api/cards?novelId=${novelId}`)
    if (res.ok) setCards(await res.json())
    setLoading(false)
  }

  useEffect(() => { loadCards() }, [novelId])

  // ── Modal helpers ─────────────────────────────────────────────────────────

  function buildInitialContents(card: NovelCard | null): Record<string, LocaleContent> {
    const base: Record<string, LocaleContent> = {}
    for (const loc of availableLocales) {
      base[loc] = { title: '', description: '' }
    }
    if (card) {
      for (const tr of card.translations) {
        base[tr.locale] = { title: tr.title, description: tr.description }
      }
    }
    return base
  }

  function openAdd() {
    setEditingCard(null)
    setImageUrl('')
    setImagePreview('')
    setImageFile(null)
    setFileError('')
    setSelectedLocale(sourceLocale)
    setContents(buildInitialContents(null))
    setFormError('')
    setShowForm(true)
  }

  function openEdit(card: NovelCard) {
    setEditingCard(card)
    setImageUrl(card.imageUrl ?? '')
    setImagePreview(cardImgSrc(card) ?? '')
    setImageFile(null)
    setFileError('')
    setSelectedLocale(sourceLocale)
    setContents(buildInitialContents(card))
    setFormError('')
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingCard(null)
    setImageFile(null)
    setImagePreview('')
  }

  // ── Content helpers ───────────────────────────────────────────────────────

  function setContent(locale: string, field: 'title' | 'description', value: string) {
    setContents((prev) => ({
      ...prev,
      [locale]: { ...(prev[locale] ?? { title: '', description: '' }), [field]: value },
    }))
  }

  function getLocaleTabStatus(locale: string): 'published' | 'draft' | 'none' {
    const content = contents[locale]
    if (content?.title || content?.description) {
      const existing = editingCard?.translations.find((t) => t.locale === locale)
      if (existing?.status === 'published' &&
          content.title === existing.title &&
          content.description === existing.description) {
        return 'published'
      }
      return 'draft'
    }
    const existing = editingCard?.translations.find((t) => t.locale === locale)
    if (existing?.status === 'published') return 'published'
    if (existing?.status === 'draft') return 'draft'
    return 'none'
  }

  function statusIcon(locale: string) {
    const s = getLocaleTabStatus(locale)
    if (s === 'published') return '✅'
    if (s === 'draft') return '📝'
    return '⚪'
  }

  // ── Image upload ──────────────────────────────────────────────────────────

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const allowed = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowed.includes(file.type)) { setFileError(t('imageTypeError')); return }
    if (file.size > 2 * 1024 * 1024) { setFileError(t('imageSizeError')); return }
    setFileError('')
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  async function uploadImage(cardId: string): Promise<string> {
    if (!imageFile) return imageUrl
    const fd = new FormData()
    fd.append('file', imageFile)
    fd.append('novelId', novelId)
    fd.append('cardId', cardId)
    const res = await fetch('/api/upload/card', { method: 'POST', body: fd })
    if (!res.ok) throw new Error(await extractError(res, t('uploadFailed')))
    return (await res.json()).url as string
  }

  // ── AI Translation ────────────────────────────────────────────────────────

  async function callTranslate(targetLocales: string[]) {
    const src = contents[sourceLocale]
    if (!src?.title?.trim()) {
      setFormError(t('needSourceTitle', { locale: LOCALE_LABELS[sourceLocale] ?? sourceLocale }))
      return null
    }
    const res = await fetch('/api/cards/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sourceLocale,
        title: src.title.trim(),
        description: src.description.trim(),
        targetLocales,
      }),
    })
    if (!res.ok) throw new Error(await extractError(res, t('translateFailed')))
    return (await res.json()) as Record<string, { title: string; description: string }>
  }

  async function handleTranslateAll() {
    setTranslating(true)
    setFormError('')
    try {
      const targets = availableLocales.filter((l) => l !== sourceLocale)
      const result = await callTranslate(targets)
      if (!result) return
      setContents((prev) => {
        const next = { ...prev }
        for (const [locale, val] of Object.entries(result)) {
          next[locale] = { title: val.title, description: val.description }
        }
        return next
      })
    } catch (err) {
      setFormError(err instanceof Error ? err.message : t('translateFailed'))
    } finally {
      setTranslating(false)
    }
  }

  async function handleTranslateSingle() {
    setTranslatingSingle(true)
    setFormError('')
    try {
      const result = await callTranslate([selectedLocale])
      if (!result) return
      const val = result[selectedLocale]
      if (val) {
        setContents((prev) => ({
          ...prev,
          [selectedLocale]: { title: val.title, description: val.description },
        }))
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : t('translateFailed'))
    } finally {
      setTranslatingSingle(false)
    }
  }

  // ── Save ──────────────────────────────────────────────────────────────────

  async function handleSave() {
    const srcContent = contents[sourceLocale]
    if (!srcContent?.title?.trim()) {
      setFormError(t('titleRequired', { locale: LOCALE_LABELS[sourceLocale] ?? sourceLocale }))
      return
    }
    setSaving(true)
    setFormError('')
    try {
      const translations = Object.entries(contents)
        .filter(([, v]) => v.title.trim() || v.description.trim())
        .map(([locale, v]) => ({ locale, title: v.title, description: v.description }))

      if (editingCard) {
        const newImageUrl = imageFile ? await uploadImage(editingCard.id) : imageUrl
        const res = await fetch(`/api/cards/${editingCard.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUrl: newImageUrl, translations }),
        })
        if (!res.ok) throw new Error(await extractError(res, t('saveFailed')))
      } else {
        const res = await fetch('/api/cards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ novelId, imageUrl: null, translations }),
        })
        if (!res.ok) throw new Error(await extractError(res, t('saveFailed')))
        const created = (await res.json()) as NovelCard
        if (imageFile) {
          const uploadedUrl = await uploadImage(created.id)
          const patchRes = await fetch(`/api/cards/${created.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageUrl: uploadedUrl }),
          })
          if (!patchRes.ok) throw new Error(await extractError(patchRes, t('imageSaveFailed')))
        }
      }

      await loadCards()
      closeForm()
    } catch (err) {
      setFormError(err instanceof Error ? err.message : t('saveFailed'))
    } finally {
      setSaving(false)
    }
  }

  // ── Card actions ──────────────────────────────────────────────────────────

  async function handleToggle(card: NovelCard) {
    const res = await fetch(`/api/cards/${card.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !card.isActive }),
    })
    if (res.ok) {
      setCards((prev) => prev.map((c) => c.id === card.id ? { ...c, isActive: !c.isActive } : c))
    }
  }

  async function handleDelete(cardId: string) {
    setDeletingId(cardId)
    const res = await fetch(`/api/cards/${cardId}`, { method: 'DELETE' })
    if (res.ok) {
      setCards((prev) => prev.filter((c) => c.id !== cardId))
      setConfirmDeleteId(null)
    }
    setDeletingId(null)
  }

  // ── Grid display helpers ──────────────────────────────────────────────────

  function cardTitle(card: NovelCard) {
    return (
      card.translations.find((tr) => tr.locale === sourceLocale)?.title ??
      card.translations[0]?.title ??
      t('noTitle')
    )
  }

  function cardDesc(card: NovelCard) {
    const desc =
      card.translations.find((tr) => tr.locale === sourceLocale)?.description ??
      card.translations[0]?.description ??
      ''
    return desc.length > 50 ? `${desc.slice(0, 50)}…` : desc
  }

  function cardImgSrc(card: NovelCard) {
    if (!card.imageUrl) return null
    const ts = new Date(card.updatedAt).getTime()
    return `${card.imageUrl}?v=${ts}`
  }

  function dotColor(card: NovelCard, locale: string) {
    const tr = card.translations.find((tr) => tr.locale === locale)
    if (!tr) return styles.dotGray
    return tr.status === 'published' ? styles.dotGreen : styles.dotOrange
  }

  // ── Render ────────────────────────────────────────────────────────────────

  const hasSourceContent = !!(contents[sourceLocale]?.title?.trim())

  return (
    <div className={styles.section}>
      <div className={styles.secDivider}>
        <span className={styles.secCh}>{t('secTitle')}</span>
        <span className={styles.secNote}>{t('secNote')}</span>
      </div>

      {loading ? (
        <p className={styles.empty}>{t('loading')}</p>
      ) : (
        <>
          {cards.length === 0 && <p className={styles.empty}>{t('empty')}</p>}

          {cards.length > 0 && (
            <div className={styles.grid}>
              {cards.map((card) => (
                <div key={card.id} className={styles.card}>
                  <div className={styles.cardImg}>
                    {cardImgSrc(card) ? (
                      <img src={cardImgSrc(card)!} alt={cardTitle(card)} className={styles.cardImgEl} />
                    ) : (
                      <div className={styles.cardImgPlaceholder}>❦</div>
                    )}
                  </div>

                  <div className={styles.cardBody}>
                    <p className={styles.cardTitle}>{cardTitle(card)}</p>
                    <p className={styles.cardDesc}>{cardDesc(card)}</p>
                    <div className={styles.dots}>
                      {availableLocales.map((loc) => (
                        <span
                          key={loc}
                          className={`${styles.dot} ${dotColor(card, loc)}`}
                          title={LOCALE_LABELS[loc] ?? loc}
                        />
                      ))}
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    <div className={styles.toggleRow} onClick={() => handleToggle(card)}>
                      <div className={`${styles.toggle}${card.isActive ? ` ${styles.toggleOn}` : ''}`} />
                      <span className={styles.toggleLabel}>
                        {card.isActive ? t('enabled') : t('disabled')}
                      </span>
                    </div>

                    <div className={styles.cardBtns}>
                      <button type="button" className={styles.btnEdit} onClick={() => openEdit(card)}>
                        {t('edit')}
                      </button>
                      {confirmDeleteId === card.id ? (
                        <>
                          <button
                            type="button"
                            className={styles.btnDanger}
                            onClick={() => handleDelete(card.id)}
                            disabled={deletingId === card.id}
                          >
                            {deletingId === card.id ? t('deleting') : t('confirm')}
                          </button>
                          <button
                            type="button"
                            className={styles.btnCancel}
                            onClick={() => setConfirmDeleteId(null)}
                          >
                            {t('cancel')}
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          className={styles.btnDanger}
                          onClick={() => setConfirmDeleteId(card.id)}
                        >
                          {t('delete')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button type="button" className={styles.btnAdd} onClick={openAdd}>
            {t('addCard')}
          </button>
        </>
      )}

      {/* ── Edit modal ── */}
      {showForm && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => { if (e.target === e.currentTarget) closeForm() }}
        >
          <div className={styles.modalBox}>
            <button type="button" className={styles.modalClose} onClick={closeForm} aria-label={t('close')}>
              ×
            </button>
            <h3 className={styles.modalTitle}>{editingCard ? t('editCard') : t('addCardTitle')}</h3>

            <div className={styles.modalLayout}>
              {/* Left: image upload */}
              <div className={styles.modalLeft}>
                <div className={styles.imgUploadArea} onClick={() => fileRef.current?.click()}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className={styles.imgPreview} />
                  ) : (
                    <>
                      <span className={styles.imgGlyph}>❦</span>
                      <span className={styles.imgHint}>{t('clickToUpload')}</span>
                      <span className={styles.imgSpec}>JPG · PNG · WebP · ≤2MB</span>
                    </>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                {fileError && <p className={styles.fieldError}>{fileError}</p>}
              </div>

              {/* Right: locale tabs + content */}
              <div className={styles.modalRight}>
                <div className={styles.localeTabs}>
                  {availableLocales.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      className={`${styles.localeTab}${selectedLocale === loc ? ` ${styles.localeTabActive}` : ''}`}
                      onClick={() => setSelectedLocale(loc)}
                    >
                      <span className={styles.tabIcon}>{statusIcon(loc)}</span>
                      {LOCALE_LABELS[loc] ?? loc}
                    </button>
                  ))}
                </div>

                <div className={styles.contentArea}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      {t('titleLabel')} {selectedLocale === sourceLocale && <span className={styles.req}>*</span>}
                      <span className={styles.formNote}>{t('titleHint')}</span>
                    </label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={contents[selectedLocale]?.title ?? ''}
                      maxLength={50}
                      placeholder={selectedLocale === sourceLocale ? t('titlePlaceholderSource') : t('inputOrTranslate')}
                      onChange={(e) => setContent(selectedLocale, 'title', e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      {t('descLabel')} {selectedLocale === sourceLocale && <span className={styles.req}>*</span>}
                    </label>
                    <textarea
                      className={styles.formTextarea}
                      value={contents[selectedLocale]?.description ?? ''}
                      rows={4}
                      placeholder={selectedLocale === sourceLocale ? t('descPlaceholderSource') : t('inputOrTranslate')}
                      onChange={(e) => setContent(selectedLocale, 'description', e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.translateBtns}>
                  <button
                    type="button"
                    className={styles.btnTranslate}
                    onClick={handleTranslateAll}
                    disabled={!hasSourceContent || translating}
                  >
                    {translating ? t('translating') : t('translateAll')}
                  </button>
                  {selectedLocale !== sourceLocale && (
                    <button
                      type="button"
                      className={styles.btnTranslateSingle}
                      onClick={handleTranslateSingle}
                      disabled={!hasSourceContent || translatingSingle}
                    >
                      {translatingSingle ? t('translating') : t('retranslateLang')}
                    </button>
                  )}
                </div>

                {formError && <p className={styles.fieldError}>{formError}</p>}

                <div className={styles.modalFooter}>
                  <button type="button" className={styles.btnCancel} onClick={closeForm}>
                    {t('cancel')}
                  </button>
                  <button
                    type="button"
                    className={styles.btnSave}
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? t('saving') : t('saveCard')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
