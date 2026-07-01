'use client'

import { useEffect, useRef, useState } from 'react'
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

// ── Constants ──────────────────────────────────────────────────────────────

const LOCALE_LABELS: Record<string, string> = {
  'zh-CN': '简中',
  'zh-TW': '繁中',
  en: 'EN',
  ja: 'JA',
  ko: 'KO',
  es: 'ES',
}

// ── Component ──────────────────────────────────────────────────────────────

export default function CardManager({ novelId, sourceLocale, availableLocales }: Props) {
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
    setImagePreview(card.imageUrl ?? '')
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
      // Has unsaved content — treat as draft until saved
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
    if (!allowed.includes(file.type)) { setFileError('仅支持 JPG、PNG、WebP'); return }
    if (file.size > 2 * 1024 * 1024) { setFileError('文件不超过 2 MB'); return }
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
    if (!res.ok) throw new Error((await res.json()).error ?? '图片上传失败')
    return (await res.json()).url as string
  }

  // ── AI Translation ────────────────────────────────────────────────────────

  async function callTranslate(targetLocales: string[]) {
    const src = contents[sourceLocale]
    if (!src?.title?.trim()) {
      setFormError(`请先填写${LOCALE_LABELS[sourceLocale] ?? sourceLocale}的标题`)
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
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error ?? '翻译失败')
    }
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
      setFormError(err instanceof Error ? err.message : '翻译失败')
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
      setFormError(err instanceof Error ? err.message : '翻译失败')
    } finally {
      setTranslatingSingle(false)
    }
  }

  // ── Save ──────────────────────────────────────────────────────────────────

  async function handleSave() {
    const srcContent = contents[sourceLocale]
    if (!srcContent?.title?.trim()) {
      setFormError(`请填写${LOCALE_LABELS[sourceLocale] ?? sourceLocale}的标题（必填）`)
      return
    }
    setSaving(true)
    setFormError('')
    try {
      // Collect non-empty translations
      const translations = Object.entries(contents)
        .filter(([, v]) => v.title.trim() || v.description.trim())
        .map(([locale, v]) => ({ locale, title: v.title, description: v.description }))

      if (editingCard) {
        // Upload image first (need existing cardId)
        const newImageUrl = imageFile ? await uploadImage(editingCard.id) : imageUrl
        const res = await fetch(`/api/cards/${editingCard.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUrl: newImageUrl, translations }),
        })
        if (!res.ok) throw new Error((await res.json()).error ?? '保存失败')
      } else {
        // Create card first to get an id, then upload image
        const tempImageId = crypto.randomUUID()
        const res = await fetch('/api/cards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ novelId, imageUrl: null, translations }),
        })
        if (!res.ok) throw new Error((await res.json()).error ?? '保存失败')
        const created = (await res.json()) as NovelCard
        if (imageFile) {
          const uploadedUrl = await uploadImage(created.id)
          await fetch(`/api/cards/${created.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageUrl: uploadedUrl }),
          })
        }
      }

      await loadCards()
      closeForm()
    } catch (err) {
      setFormError(err instanceof Error ? err.message : '保存失败')
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
      card.translations.find((t) => t.locale === sourceLocale)?.title ??
      card.translations[0]?.title ??
      '(无标题)'
    )
  }

  function cardDesc(card: NovelCard) {
    const desc =
      card.translations.find((t) => t.locale === sourceLocale)?.description ??
      card.translations[0]?.description ??
      ''
    return desc.length > 50 ? `${desc.slice(0, 50)}…` : desc
  }

  function dotColor(card: NovelCard, locale: string) {
    const tr = card.translations.find((t) => t.locale === locale)
    if (!tr) return styles.dotGray
    return tr.status === 'published' ? styles.dotGreen : styles.dotOrange
  }

  // ── Render ────────────────────────────────────────────────────────────────

  const hasSourceContent = !!(contents[sourceLocale]?.title?.trim())

  return (
    <div className={styles.section}>
      {/* Section header */}
      <div className={styles.secDivider}>
        <span className={styles.secCh}>卡片设定</span>
        <span className={styles.secNote}>正文关键词自动转为可点击卡片链接</span>
      </div>

      {loading ? (
        <p className={styles.empty}>加载中…</p>
      ) : (
        <>
          {cards.length === 0 && <p className={styles.empty}>尚未添加任何卡片</p>}

          {/* Card grid */}
          {cards.length > 0 && (
            <div className={styles.grid}>
              {cards.map((card) => (
                <div key={card.id} className={styles.card}>
                  {/* Image */}
                  <div className={styles.cardImg}>
                    {card.imageUrl ? (
                      <img src={card.imageUrl} alt={cardTitle(card)} className={styles.cardImgEl} />
                    ) : (
                      <div className={styles.cardImgPlaceholder}>❦</div>
                    )}
                  </div>

                  {/* Info */}
                  <div className={styles.cardBody}>
                    <p className={styles.cardTitle}>{cardTitle(card)}</p>
                    <p className={styles.cardDesc}>{cardDesc(card)}</p>
                    {/* Locale dots */}
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

                  {/* Actions */}
                  <div className={styles.cardActions}>
                    {/* isActive toggle */}
                    <div className={styles.toggleRow} onClick={() => handleToggle(card)}>
                      <div className={`${styles.toggle}${card.isActive ? ` ${styles.toggleOn}` : ''}`} />
                      <span className={styles.toggleLabel}>{card.isActive ? '已启用' : '已停用'}</span>
                    </div>

                    <div className={styles.cardBtns}>
                      <button type="button" className={styles.btnEdit} onClick={() => openEdit(card)}>
                        编辑
                      </button>
                      {confirmDeleteId === card.id ? (
                        <>
                          <button
                            type="button"
                            className={styles.btnDanger}
                            onClick={() => handleDelete(card.id)}
                            disabled={deletingId === card.id}
                          >
                            {deletingId === card.id ? '删除中…' : '确认'}
                          </button>
                          <button
                            type="button"
                            className={styles.btnCancel}
                            onClick={() => setConfirmDeleteId(null)}
                          >
                            取消
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          className={styles.btnDanger}
                          onClick={() => setConfirmDeleteId(card.id)}
                        >
                          删除
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button type="button" className={styles.btnAdd} onClick={openAdd}>
            ＋ 添加卡片
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
            <button type="button" className={styles.modalClose} onClick={closeForm} aria-label="关闭">
              ×
            </button>
            <h3 className={styles.modalTitle}>{editingCard ? '编辑卡片' : '添加卡片'}</h3>

            <div className={styles.modalLayout}>
              {/* Left: image upload */}
              <div className={styles.modalLeft}>
                <div className={styles.imgUploadArea} onClick={() => fileRef.current?.click()}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className={styles.imgPreview} />
                  ) : (
                    <>
                      <span className={styles.imgGlyph}>❦</span>
                      <span className={styles.imgHint}>点击上传</span>
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
                {/* Language tabs */}
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

                {/* Content fields */}
                <div className={styles.contentArea}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      标题 {selectedLocale === sourceLocale && <span className={styles.req}>*</span>}
                      <span className={styles.formNote}>（正文关键词）</span>
                    </label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={contents[selectedLocale]?.title ?? ''}
                      maxLength={50}
                      placeholder={selectedLocale === sourceLocale ? '例：风清扬' : '输入或使用 AI 翻译…'}
                      onChange={(e) => setContent(selectedLocale, 'title', e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      简介 {selectedLocale === sourceLocale && <span className={styles.req}>*</span>}
                    </label>
                    <textarea
                      className={styles.formTextarea}
                      value={contents[selectedLocale]?.description ?? ''}
                      rows={4}
                      placeholder={selectedLocale === sourceLocale ? '角色或设定的介绍…' : '输入或使用 AI 翻译…'}
                      onChange={(e) => setContent(selectedLocale, 'description', e.target.value)}
                    />
                  </div>
                </div>

                {/* AI translate buttons */}
                <div className={styles.translateBtns}>
                  <button
                    type="button"
                    className={styles.btnTranslate}
                    onClick={handleTranslateAll}
                    disabled={!hasSourceContent || translating}
                  >
                    {translating ? '翻译中…' : '🤖 AI 翻译所有语言'}
                  </button>
                  {selectedLocale !== sourceLocale && (
                    <button
                      type="button"
                      className={styles.btnTranslateSingle}
                      onClick={handleTranslateSingle}
                      disabled={!hasSourceContent || translatingSingle}
                    >
                      {translatingSingle ? '翻译中…' : '重新翻译此语言'}
                    </button>
                  )}
                </div>

                {formError && <p className={styles.fieldError}>{formError}</p>}

                <div className={styles.modalFooter}>
                  <button type="button" className={styles.btnCancel} onClick={closeForm}>
                    取消
                  </button>
                  <button
                    type="button"
                    className={styles.btnSave}
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? '保存中…' : '保存卡片'}
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
