'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createCategory, deleteCategory } from '@/lib/actions/admin'
import styles from '../page.module.css'

// ── Delete button ────────────────────────────────────────────────────────────

interface DeleteProps {
  categoryId: string
  disabled: boolean
}

export function CategoryDeleteButton({ categoryId, disabled }: DeleteProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleDelete = () => {
    const fd = new FormData()
    fd.set('categoryId', categoryId)
    setError(null)
    startTransition(async () => {
      try {
        await deleteCategory(fd)
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
        disabled={isPending || disabled}
        title={disabled ? '该分类下有小说，无法删除' : '删除分类'}
        className={styles.btnDanger}
      >
        删除
      </button>
      {error && <span className={styles.inlineError}>{error}</span>}
    </span>
  )
}

// ── Create form ──────────────────────────────────────────────────────────────

type Props =
  | { mode: 'create' }
  | { mode: 'delete'; categoryId: string; disabled: boolean }

export default function CategoryForm(props: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [slug, setSlug] = useState('')

  if (props.mode === 'delete') {
    return <CategoryDeleteButton categoryId={props.categoryId} disabled={props.disabled} />
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    const fd = new FormData()
    fd.set('slug', slug)
    setError(null)
    startTransition(async () => {
      try {
        await createCategory(fd)
        setSlug('')
        router.refresh()
      } catch (e) {
        setError(e instanceof Error ? e.message : '创建失败')
      }
    })
  }

  return (
    <form onSubmit={handleCreate} className={styles.createForm}>
      <input
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="slug（仅小写字母、数字和连字符）"
        className={styles.slugInput}
        disabled={isPending}
      />
      <button type="submit" disabled={isPending || !slug.trim()} className={styles.btnCreate}>
        {isPending ? '创建中…' : '新增'}
      </button>
      {error && <p className={styles.formError}>{error}</p>}
    </form>
  )
}
