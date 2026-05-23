'use client'

import { useState } from 'react'
import styles from './TranslationsReview.module.css'

interface ChapterData {
  id: string
  order: number
  title: string
  translation: { title: string; content: string; status: string } | null
}

interface Props {
  novelId: string
  targetLocale: string
  localeName: string
  novelTitle: string
  novelDesc: string
  novelStatus: string
  chapters: ChapterData[]
  isPublished: boolean
}

export default function TranslationsReview({
  novelId,
  targetLocale,
  localeName,
  novelTitle,
  novelDesc,
  novelStatus,
  chapters,
  isPublished: initialPublished,
}: Props) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [publishing, setPublishing] = useState(false)
  const [published, setPublished] = useState(initialPublished)
  const [error, setError] = useState<string | null>(null)

  const draftCount = chapters.filter(c => c.translation?.status === 'draft').length
  const missingCount = chapters.filter(c => !c.translation).length

  async function handlePublish() {
    setPublishing(true)
    setError(null)
    try {
      const res = await fetch(`/api/translations/${novelId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetLocale }),
      })
      if (!res.ok) throw new Error((await res.json()).error || 'Failed')
      setPublished(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
    } finally {
      setPublishing(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <p className={styles.localeName}>{localeName}</p>
          <p className={styles.stats}>
            {draftCount > 0 && `${draftCount} 章草稿`}
            {missingCount > 0 && ` · ${missingCount} 章缺失`}
            {draftCount === 0 && missingCount === 0 && '所有章节均已翻译'}
          </p>
        </div>
        {published ? (
          <span className={styles.publishedTag}>已发布</span>
        ) : (
          <button
            className={styles.publishBtn}
            onClick={handlePublish}
            disabled={publishing || draftCount === 0}
          >
            {publishing ? '发布中…' : '发布此语言版本'}
          </button>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {/* Novel preview */}
      <div className={styles.novelPreview}>
        <span className={styles.previewLabel}>小说简介（翻译版）</span>
        <p className={styles.previewTitle}>{novelTitle}</p>
        <p className={styles.previewDesc}>{novelDesc}</p>
      </div>

      {/* Chapter list */}
      <div className={styles.chapterList}>
        <div className={styles.chapterListHeading}>
          章节翻译预览
          {draftCount > 0 && <span className={styles.draftNote}>{draftCount} 章草稿</span>}
        </div>
        {chapters.map(ch => {
          const isOpen = expanded === ch.id
          const hasTr = !!ch.translation
          return (
            <div key={ch.id} className={`${styles.chapter}${!hasTr ? ` ${styles.chapterMissing}` : ''}`}>
              <button
                className={styles.chapterToggle}
                onClick={() => setExpanded(isOpen ? null : ch.id)}
                disabled={!hasTr}
              >
                <span className={styles.chapterOrder}>第 {ch.order} 章</span>
                <span className={styles.chapterTitle}>
                  {hasTr ? ch.translation!.title : <span className={styles.missingText}>（无翻译）</span>}
                </span>
                {hasTr && <span className={styles.chevron}>{isOpen ? '▲' : '▼'}</span>}
              </button>
              {isOpen && hasTr && (
                <div className={styles.chapterContent}>
                  <p className={styles.contentText}>
                    {ch.translation!.content.length > 500
                      ? <>{ch.translation!.content.slice(0, 500)}<span className={styles.truncated}>…（已截断）</span></>
                      : ch.translation!.content}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
