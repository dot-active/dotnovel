'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toggleNovelPublishStatus, deleteNovelAdmin, updateNovelStats, toggleNovelFeatured } from '@/lib/actions/admin'
import { formatCount } from '@/lib/formatCount'
import styles from '../page.module.css'

interface Novel {
  id: string
  title: string
  categorySlugs: string[]
  sourceLocale: string
  isAdult: boolean
  isFeatured: boolean
  publishStatus: string
  chapterCount: number
  viewCount: number
  favoriteCount: number
}

export default function NovelAdminRow({ novel }: { novel: Novel }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [confirming, setConfirming] = useState(false)
  const [editingStats, setEditingStats] = useState(false)
  const [viewInput, setViewInput] = useState(String(novel.viewCount))
  const [favInput, setFavInput] = useState(String(novel.favoriteCount))

  const isPublished = novel.publishStatus === 'published'
  const [isFeatured, setIsFeatured] = useState(novel.isFeatured)

  function handleToggleFeatured() {
    const fd = new FormData()
    fd.set('novelId', novel.id)
    fd.set('isFeatured', String(isFeatured))
    startTransition(async () => {
      await toggleNovelFeatured(fd)
      setIsFeatured((v) => !v)
    })
  }

  function handleToggle() {
    const fd = new FormData()
    fd.set('novelId', novel.id)
    fd.set('currentStatus', novel.publishStatus)
    startTransition(async () => {
      await toggleNovelPublishStatus(fd)
      router.refresh()
    })
  }

  function handleDelete() {
    const fd = new FormData()
    fd.set('novelId', novel.id)
    startTransition(async () => {
      await deleteNovelAdmin(fd)
      router.refresh()
    })
    setConfirming(false)
  }

  function handleSaveStats() {
    const fd = new FormData()
    fd.set('novelId', novel.id)
    fd.set('viewCount', viewInput)
    fd.set('favoriteCount', favInput)
    startTransition(async () => {
      await updateNovelStats(fd)
      router.refresh()
    })
    setEditingStats(false)
  }

  return (
    <>
      <tr className={`${styles.row} ${!isPublished ? styles.rowUnpublished : ''}`}>
        <td className={styles.tdTitle}>
          {isFeatured && <span className={styles.starIcon}>⭐</span>}
          {novel.title}
        </td>
        <td>
          {novel.categorySlugs.length > 0 ? (
            <span className={styles.slugList}>
              {novel.categorySlugs.map((s) => (
                <span key={s} className={styles.slugTag}>{s}</span>
              ))}
            </span>
          ) : '—'}
        </td>
        <td>{novel.sourceLocale}</td>
        <td>{novel.chapterCount}</td>
        <td>{novel.isAdult ? <span className={styles.badge18}>18+</span> : '—'}</td>
        <td>
          <span className={isPublished ? styles.statusOn : styles.statusOff}>
            {isPublished ? '上架' : '下架'}
          </span>
        </td>
        <td className={styles.tdStat}>{formatCount(novel.viewCount)}</td>
        <td className={styles.tdStat}>{formatCount(novel.favoriteCount)}</td>
        <td className={styles.tdActions}>
          <button
            onClick={handleToggleFeatured}
            disabled={isPending}
            className={isFeatured ? styles.btnFeaturedActive : styles.btnFeatured}
          >
            {isFeatured ? '取消精选' : '设为精选'}
          </button>
          <button onClick={handleToggle} disabled={isPending} className={styles.btnToggle}>
            {isPublished ? '下架' : '上架'}
          </button>
          <button
            onClick={() => {
              setViewInput(String(novel.viewCount))
              setFavInput(String(novel.favoriteCount))
              setEditingStats((v) => !v)
            }}
            disabled={isPending}
            className={styles.btnToggle}
          >
            编辑数据
          </button>
          {confirming ? (
            <>
              <button onClick={handleDelete} disabled={isPending} className={styles.btnDangerConfirm}>
                确认删除
              </button>
              <button onClick={() => setConfirming(false)} className={styles.btnCancel}>
                取消
              </button>
            </>
          ) : (
            <button onClick={() => setConfirming(true)} disabled={isPending} className={styles.btnDanger}>
              删除
            </button>
          )}
        </td>
      </tr>
      {editingStats && (
        <tr className={styles.editStatsRow}>
          <td colSpan={9}>
            <div className={styles.editStatsForm}>
              <label className={styles.editStatsLabel}>
                点击数
                <input
                  type="number"
                  min="0"
                  value={viewInput}
                  onChange={(e) => setViewInput(e.target.value)}
                  className={styles.editStatsInput}
                />
              </label>
              <label className={styles.editStatsLabel}>
                收藏数
                <input
                  type="number"
                  min="0"
                  value={favInput}
                  onChange={(e) => setFavInput(e.target.value)}
                  className={styles.editStatsInput}
                />
              </label>
              <button onClick={handleSaveStats} disabled={isPending} className={styles.btnSaveStats}>
                保存
              </button>
              <button onClick={() => setEditingStats(false)} className={styles.btnCancel}>
                取消
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
