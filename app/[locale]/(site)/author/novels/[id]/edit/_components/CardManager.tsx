'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import styles from './CardManager.module.css'

// ── Types ──────────────────────────────────────────────────────────────────

const MAX_ENTRIES = 10

interface CardEntry {
  id: string
  content: string
  fromChapter: number
  order: number
}

interface CardTranslation {
  id: string
  locale: string
  titles: string[]
  status: string
  entries: CardEntry[]
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

interface EntryDraft {
  content: string
  fromChapter: number
}

interface LocaleContent {
  titles: string[]
  entries: EntryDraft[]
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

function emptyContent(): LocaleContent {
  return { titles: [], entries: [] }
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
  const [tagInput, setTagInput] = useState('')

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
      base[loc] = emptyContent()
    }
    if (card) {
      for (const tr of card.translations) {
        base[tr.locale] = {
          titles: [...tr.titles],
          entries: tr.entries.map((e) => ({ content: e.content, fromChapter: e.fromChapter })),
        }
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
    setTagInput('')
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
    setTagInput('')
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

  function getContent(locale: string): LocaleContent {
    return contents[locale] ?? emptyContent()
  }

  function addTitle(locale: string, raw: string) {
    const value = raw.trim()
    if (!value) return
    setContents((prev) => {
      const cur = prev[locale] ?? emptyContent()
      if (cur.titles.includes(value)) return prev
      return { ...prev, [locale]: { ...cur, titles: [...cur.titles, value] } }
    })
  }

  function removeTitle(locale: string, index: number) {
    setContents((prev) => {
      const cur = prev[locale] ?? emptyContent()
      return { ...prev, [locale]: { ...cur, titles: cur.titles.filter((_, i) => i !== index) } }
    })
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTitle(selectedLocale, tagInput.replace(/,$/, ''))
      setTagInput('')
    } else if (e.key === 'Backspace' && !tagInput) {
      const cur = getContent(selectedLocale)
      if (cur.titles.length > 0) removeTitle(selectedLocale, cur.titles.length - 1)
    }
  }

  function addEntry(locale: string) {
    setContents((prev) => {
      const cur = prev[locale] ?? emptyContent()
      if (cur.entries.length >= MAX_ENTRIES) return prev
      return { ...prev, [locale]: { ...cur, entries: [...cur.entries, { content: '', fromChapter: 1 }] } }
    })
  }

  function removeEntry(locale: string, index: number) {
    setContents((prev) => {
      const cur = prev[locale] ?? emptyContent()
      return { ...prev, [locale]: { ...cur, entries: cur.entries.filter((_, i) => i !== index) } }
    })
  }

  function updateEntry(locale: string, index: number, field: 'content' | 'fromChapter', value: string) {
    setContents((prev) => {
      const cur = prev[locale] ?? emptyContent()
      const entries = cur.entries.map((entry, i) => {
        if (i !== index) return entry
        if (field === 'fromChapter') {
          const n = parseInt(value, 10)
          return { ...entry, fromChapter: Number.isNaN(n) || n < 1 ? 1 : n }
        }
        return { ...entry, content: value }
      })
      return { ...prev, [locale]: { ...cur, entries } }
    })
  }

  function getLocaleTabStatus(locale: string): 'published' | 'draft' | 'none' {
    const content = getContent(locale)
    const hasContent = content.titles.length > 0 || content.entries.some((e) => e.content.trim())
    const existing = editingCard?.translations.find((tr) => tr.locale === locale)
    if (hasContent) {
      if (existing?.status === 'published') {
        const sameTitles = JSON.stringify(existing.titles) === JSON.stringify(content.titles)
        const sameEntries =
          existing.entries.length === content.entries.length &&
          existing.entries.every(
            (e, i) => e.content === content.entries[i]?.content && e.fromChapter === content.entries[i]?.fromChapter
          )
        if (sameTitles && sameEntries) return 'published'
      }
      return 'draft'
    }
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
    const src = getContent(sourceLocale)
    if (src.titles.length === 0) {
      setFormError(t('needSourceTitle', { locale: LOCALE_LABELS[sourceLocale] ?? sourceLocale }))
      return null
    }
    const res = await fetch('/api/cards/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sourceLocale,
        titles: src.titles,
        entries: src.entries.filter((e) => e.content.trim()),
        targetLocales,
      }),
    })
    if (!res.ok) throw new Error(await extractError(res, t('translateFailed')))
    return (await res.json()) as Record<string, { titles: string[]; entries: EntryDraft[] }>
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
          next[locale] = { titles: val.titles, entries: val.entries }
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
          [selectedLocale]: { titles: val.titles, entries: val.entries },
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
    const srcContent = getContent(sourceLocale)
    if (srcContent.titles.length === 0) {
      setFormError(t('titleRequired', { locale: LOCALE_LABELS[sourceLocale] ?? sourceLocale }))
      return
    }
    setSaving(true)
    setFormError('')
    try {
      const translations = Object.entries(contents)
        .filter(([, v]) => v.titles.length > 0 || v.entries.some((e) => e.content.trim()))
        .map(([locale, v]) => ({
          locale,
          titles: v.titles,
          entries: v.entries.filter((e) => e.content.trim()),
        }))

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

  function displayTranslation(card: NovelCard): CardTranslation | undefined {
    return card.translations.find((tr) => tr.locale === sourceLocale) ?? card.translations[0]
  }

  function cardTitle(card: NovelCard) {
    return displayTranslation(card)?.titles[0] ?? t('noTitle')
  }

  function aliasCount(card: NovelCard) {
    return Math.max(0, (displayTranslation(card)?.titles.length ?? 0) - 1)
  }

  function entryCount(card: NovelCard) {
    return displayTranslation(card)?.entries.length ?? 0
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

  const hasSourceContent = getContent(sourceLocale).titles.length > 0
  const currentEntries = getContent(selectedLocale).entries
  const entriesFull = currentEntries.length >= MAX_ENTRIES

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
                    {aliasCount(card) > 0 && (
                      <p className={styles.cardAliasCount}>{t('aliasCountLabel', { count: aliasCount(card) })}</p>
                    )}
                    <p className={styles.cardEntryCount}>{t('entryCountLabel', { count: entryCount(card) })}</p>
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
                      onClick={() => { setSelectedLocale(loc); setTagInput('') }}
                    >
                      <span className={styles.tabIcon}>{statusIcon(loc)}</span>
                      {LOCALE_LABELS[loc] ?? loc}
                    </button>
                  ))}
                </div>

                <div className={styles.contentArea}>
                  {/* Titles / aliases tag input */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      {t('titlesLabel')} {selectedLocale === sourceLocale && <span className={styles.req}>*</span>}
                    </label>
                    <div className={styles.tagInputBox}>
                      {getContent(selectedLocale).titles.map((title, i) => (
                        <span key={i} className={styles.tag}>
                          {title}
                          <button
                            type="button"
                            className={styles.tagRemove}
                            onClick={() => removeTitle(selectedLocale, i)}
                            aria-label={t('delete')}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        className={styles.tagInput}
                        value={tagInput}
                        placeholder={t('titlesPlaceholder')}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        onBlur={() => { if (tagInput.trim()) { addTitle(selectedLocale, tagInput); setTagInput('') } }}
                      />
                    </div>
                    <p className={styles.formNote}>{t('titlesHint')}</p>
                  </div>

                  {/* Entries list */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>{t('entriesLabel')}</label>
                    <div className={styles.entryList}>
                      {currentEntries.map((entry, i) => (
                        <div key={i} className={styles.entryRow}>
                          <div className={styles.entryHeader}>
                            <span>{t('entryFromPrefix')}</span>
                            <input
                              type="number"
                              min={1}
                              className={styles.entryChapterInput}
                              value={entry.fromChapter}
                              onChange={(e) => updateEntry(selectedLocale, i, 'fromChapter', e.target.value)}
                            />
                            <span>{t('entryFromSuffix')}</span>
                          </div>
                          <div className={styles.entryInputBox}>
                            <input
                              type="text"
                              className={styles.entryInput}
                              value={entry.content}
                              placeholder={selectedLocale === sourceLocale ? t('entryContentPlaceholder') : t('inputOrTranslate')}
                              onChange={(e) => updateEntry(selectedLocale, i, 'content', e.target.value)}
                            />
                            <button
                              type="button"
                              className={styles.entryRemove}
                              onClick={() => removeEntry(selectedLocale, i)}
                              aria-label={t('delete')}
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className={styles.btnAddEntry}
                      onClick={() => addEntry(selectedLocale)}
                      disabled={entriesFull}
                    >
                      {entriesFull ? t('maxEntriesReached') : t('addEntry')}
                    </button>
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
