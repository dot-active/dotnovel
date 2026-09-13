'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createAnnouncement, deleteAnnouncement } from '@/lib/actions/admin'
import styles from '../page.module.css'

// ── Delete button ────────────────────────────────────────────────────────────

export function AnnouncementDeleteButton({ announcementId }: { announcementId: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleDelete = () => {
    if (!window.confirm('确定要删除这条公告吗？删除后用户将无法再看到它。')) return

    const fd = new FormData()
    fd.set('announcementId', announcementId)
    setError(null)
    startTransition(async () => {
      try {
        await deleteAnnouncement(fd)
        router.refresh()
      } catch (e) {
        setError(e instanceof Error ? e.message : '删除失败')
      }
    })
  }

  return (
    <span>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="admin-btn admin-btn--danger"
      >
        删除
      </button>
      {error && <span className={styles.inlineError}>{error}</span>}
    </span>
  )
}

// ── Create form ──────────────────────────────────────────────────────────────

export default function AnnouncementForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    const fd = new FormData()
    fd.set('title', title)
    fd.set('content', content)
    setError(null)
    startTransition(async () => {
      try {
        await createAnnouncement(fd)
        setTitle('')
        setContent('')
        router.refresh()
      } catch (e) {
        setError(e instanceof Error ? e.message : '发布失败')
      }
    })
  }

  return (
    <form onSubmit={handleCreate} className={styles.createForm}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="公告标题"
        className={styles.titleInput}
        disabled={isPending}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="公告内容"
        className={styles.contentInput}
        rows={6}
        disabled={isPending}
      />
      <button type="submit" disabled={isPending || !title.trim() || !content.trim()} className={styles.btnCreate}>
        {isPending ? '发布中…' : '发布公告'}
      </button>
      {error && <p className={styles.formError}>{error}</p>}
    </form>
  )
}
