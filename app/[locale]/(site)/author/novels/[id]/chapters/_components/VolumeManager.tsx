'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import styles from './VolumeManager.module.css'

// ── Types ────────────────────────────────────────────────────────────────

interface VolumeTranslation {
  id: string
  locale: string
  title: string
  status: string
}

interface ChapterLite {
  id: string
  order: number
  translations: { locale: string; title: string }[]
}

interface Volume {
  id: string
  order: number
  translations: VolumeTranslation[]
  chapters: ChapterLite[]
}

interface Props {
  novelId: string
  volumes: Volume[]
  sourceLocale: string
  currentLocale: string
  availableLocales: string[]
}

const LOCALE_LABELS: Record<string, string> = {
  'zh-CN': '简中',
  'zh-TW': '繁中',
  en: 'EN',
  ja: 'JA',
  ko: 'KO',
  es: 'ES',
}

function volumeTitleFor(v: Volume | undefined, locale: string): string {
  if (!v) return ''
  return (
    v.translations.find((t) => t.locale === locale)?.title ??
    v.translations[0]?.title ??
    '未命名'
  )
}

function chapterTitleFor(ch: ChapterLite, locale: string): string {
  return (
    ch.translations.find((t) => t.locale === locale)?.title ??
    ch.translations[0]?.title ??
    ''
  )
}

// ── Sortable volume accordion item ───────────────────────────────────────

function SortableVolume({
  volume,
  expanded,
  onToggle,
  onEdit,
  onDelete,
  currentLocale,
}: {
  volume: Volume
  expanded: boolean
  onToggle: () => void
  onEdit: () => void
  onDelete: () => void
  currentLocale: string
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: volume.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  }

  return (
    <div ref={setNodeRef} style={style} className={styles.volumeItem}>
      <div className={styles.volumeHeader}>
        <button
          className={styles.dragHandle}
          {...attributes}
          {...listeners}
          aria-label="拖拽排序"
          type="button"
        >
          ☰
        </button>
        <button className={styles.toggleBtn} onClick={onToggle} type="button">
          <span className={styles.toggleIcon}>{expanded ? '▼' : '▶'}</span>
          <span className={styles.volumeTitle}>{volumeTitleFor(volume, currentLocale)}</span>
          <span className={styles.chapterCount}>{volume.chapters.length}</span>
        </button>
        <div className={styles.headerActions}>
          <button className={styles.editBtn} onClick={onEdit} type="button">
            编辑
          </button>
          <button className={styles.deleteBtn} onClick={onDelete} type="button">
            删除
          </button>
        </div>
      </div>

      {expanded && (
        <div className={styles.volumeContent}>
          {volume.chapters.length === 0 ? (
            <p className={styles.emptyVolume}>此分集暂无章节</p>
          ) : (
            volume.chapters.map((ch) => (
              <div key={ch.id} className={styles.chapterRow}>
                <span className={styles.chapterOrder}>{ch.order}</span>
                <span className={styles.chapterName}>{chapterTitleFor(ch, currentLocale)}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

// ── Create / edit modal ──────────────────────────────────────────────────

function VolumeModal({
  isEditing,
  sourceLocale,
  availableLocales,
  initial,
  onClose,
  onSave,
}: {
  isEditing: boolean
  sourceLocale: string
  availableLocales: string[]
  initial?: Volume
  onClose: () => void
  onSave: (translations: Record<string, { title: string }>) => Promise<void>
}) {
  const t = useTranslations('volumeManager')
  const [selectedLocale, setSelectedLocale] = useState(sourceLocale)
  const [contents, setContents] = useState<Record<string, { title: string }>>(() => {
    const base: Record<string, { title: string }> = {}
    for (const loc of availableLocales) base[loc] = { title: '' }
    if (initial) {
      for (const tr of initial.translations) base[tr.locale] = { title: tr.title }
    }
    return base
  })
  const [translating, setTranslating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const statusIcon = (loc: string) => (contents[loc]?.title.trim() ? '📝' : '⚪')

  async function handleTranslate() {
    const src = contents[sourceLocale]
    if (!src.title.trim()) {
      setError(t('titleRequired'))
      return
    }
    const targets = availableLocales.filter((l) => l !== sourceLocale)
    if (!targets.length) return

    setTranslating(true)
    setError('')
    try {
      const res = await fetch('/api/volumes/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceLocale, title: src.title, targetLocales: targets }),
      })
      if (!res.ok) throw new Error(t('translateFailed'))
      const result = (await res.json()) as Record<string, { title: string }>
      setContents((prev) => {
        const next = { ...prev }
        for (const [loc, val] of Object.entries(result)) next[loc] = { title: val.title }
        return next
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : t('translateFailed'))
    } finally {
      setTranslating(false)
    }
  }

  async function handleSave() {
    if (!contents[sourceLocale].title.trim()) {
      setError(t('titleRequired'))
      return
    }
    setSaving(true)
    setError('')
    try {
      await onSave(contents)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : t('saveFailed'))
      setSaving(false)
    }
  }

  const busy = saving || translating

  return (
    <div className={styles.modalOverlay} onClick={() => !busy && onClose()}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>{isEditing ? t('editVolume') : t('createVolume')}</h2>

        <div className={styles.localeTabs}>
          {availableLocales.map((loc) => (
            <button
              key={loc}
              type="button"
              className={`${styles.localeTab} ${selectedLocale === loc ? styles.localeTabActive : ''}`}
              onClick={() => setSelectedLocale(loc)}
            >
              <span className={styles.tabIcon}>{statusIcon(loc)}</span>
              {LOCALE_LABELS[loc] ?? loc}
            </button>
          ))}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            {t('volumeName')}（{LOCALE_LABELS[selectedLocale] ?? selectedLocale}，{t('maxChars')}）
          </label>
          <input
            type="text"
            maxLength={50}
            value={contents[selectedLocale]?.title ?? ''}
            onChange={(e) =>
              setContents((prev) => ({ ...prev, [selectedLocale]: { title: e.target.value } }))
            }
            placeholder={t('volumeNamePlaceholder')}
            className={styles.input}
            disabled={busy}
          />
        </div>

        <button className={styles.translateBtn} onClick={handleTranslate} disabled={busy} type="button">
          {translating ? t('translating') : `🤖 ${t('translateAll')}`}
        </button>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.modalActions}>
          <button className={styles.cancelBtn} onClick={onClose} disabled={busy} type="button">
            {t('cancel')}
          </button>
          <button className={styles.saveBtn} onClick={handleSave} disabled={busy} type="button">
            {saving ? t('saving') : t('save')}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Delete confirm ───────────────────────────────────────────────────────

function DeleteConfirm({
  title,
  onCancel,
  onConfirm,
}: {
  title: string
  onCancel: () => void
  onConfirm: () => Promise<void>
}) {
  const t = useTranslations('volumeManager')
  const [deleting, setDeleting] = useState(false)

  return (
    <div className={styles.modalOverlay} onClick={() => !deleting && onCancel()}>
      <div className={styles.confirmBox} onClick={(e) => e.stopPropagation()}>
        <p className={styles.confirmText}>{t('deleteConfirm', { title })}</p>
        <div className={styles.modalActions}>
          <button className={styles.cancelBtn} onClick={onCancel} disabled={deleting} type="button">
            {t('cancel')}
          </button>
          <button
            className={styles.deleteConfirmBtn}
            disabled={deleting}
            type="button"
            onClick={async () => {
              setDeleting(true)
              try {
                await onConfirm()
              } finally {
                setDeleting(false)
              }
            }}
          >
            {deleting ? t('deleting') : t('delete')}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────

export default function VolumeManager({
  novelId,
  volumes: initialVolumes,
  sourceLocale,
  currentLocale,
  availableLocales,
}: Props) {
  const t = useTranslations('volumeManager')
  const router = useRouter()

  const [volumes, setVolumes] = useState(initialVolumes)
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(initialVolumes.length > 0 ? [initialVolumes[0].id] : [])
  )
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Volume | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = volumes.findIndex((v) => v.id === active.id)
    const newIndex = volumes.findIndex((v) => v.id === over.id)
    if (oldIndex === -1 || newIndex === -1) return

    const reordered = [...volumes]
    const [moved] = reordered.splice(oldIndex, 1)
    reordered.splice(newIndex, 0, moved)
    const previous = volumes
    setVolumes(reordered) // optimistic

    try {
      const res = await fetch('/api/volumes/reorder', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ novelId, volumeIds: reordered.map((v) => v.id) }),
      })
      if (!res.ok) throw new Error('reorder failed')
    } catch {
      setVolumes(previous) // rollback
    }
  }

  async function handleSave(translations: Record<string, { title: string }>) {
    if (editing) {
      await fetch(`/api/volumes/${editing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ translations }),
      })
    } else {
      await fetch('/api/volumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ novelId, translations }),
      })
    }
    router.refresh()
  }

  async function handleDelete() {
    if (!deleteId) return
    await fetch(`/api/volumes/${deleteId}`, { method: 'DELETE' })
    setDeleteId(null)
    router.refresh()
  }

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div>
      {/* Volumes */}
      {volumes.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>{t('volumes')}</h3>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={volumes.map((v) => v.id)} strategy={verticalListSortingStrategy}>
              <div className={styles.volumeList}>
                {volumes.map((v) => (
                  <SortableVolume
                    key={v.id}
                    volume={v}
                    expanded={expanded.has(v.id)}
                    onToggle={() => toggle(v.id)}
                    onEdit={() => {
                      setEditing(v)
                      setModalOpen(true)
                    }}
                    onDelete={() => setDeleteId(v.id)}
                    currentLocale={currentLocale}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </section>
      )}

      <button
        className={styles.createBtn}
        type="button"
        onClick={() => {
          setEditing(null)
          setModalOpen(true)
        }}
      >
        + {t('createVolume')}
      </button>

      {modalOpen && (
        <VolumeModal
          isEditing={editing !== null}
          sourceLocale={sourceLocale}
          availableLocales={availableLocales}
          initial={editing ?? undefined}
          onClose={() => {
            setModalOpen(false)
            setEditing(null)
          }}
          onSave={handleSave}
        />
      )}

      {deleteId && (
        <DeleteConfirm
          title={volumeTitleFor(
            volumes.find((v) => v.id === deleteId),
            currentLocale
          )}
          onCancel={() => setDeleteId(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  )
}
