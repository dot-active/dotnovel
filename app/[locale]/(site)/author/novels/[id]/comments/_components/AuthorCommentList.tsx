'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import styles from '../page.module.css'

interface CommentItem {
  id: string
  content: string
  userId: string | null
  nickname: string | null
  paragraphIndex: number
  isReadByAuthor: boolean
  createdAt: string
  parentId: string | null
}

interface ChapterWithComments {
  id: string
  title: string
  order: number
  comments: CommentItem[]
}

interface UserInfo {
  id: string
  username: string | null
  firstName: string | null
  lastName: string | null
}

const userCache = new Map<string, UserInfo>()

async function fetchUser(userId: string): Promise<UserInfo> {
  if (userCache.has(userId)) return userCache.get(userId)!
  const res = await fetch(`/api/users/${userId}`)
  if (!res.ok) return { id: userId, username: null, firstName: null, lastName: null }
  const data = await res.json()
  userCache.set(userId, data)
  return data
}

function displayName(u: UserInfo, anonymousLabel: string) {
  return u.username ?? ([u.firstName, u.lastName].filter(Boolean).join(' ') || anonymousLabel)
}

function formatTime(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale, {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })
}

function CommentRow({
  comment,
  novelId,
  chapterId,
  onDelete,
}: {
  comment: CommentItem
  novelId: string
  chapterId: string
  onDelete: (id: string) => void
}) {
  const t = useTranslations('author')
  const locale = useLocale()
  const [name, setName] = useState<string>(comment.userId ? '…' : (comment.nickname || t('anonymousUser')))
  const [deleting, setDeleting] = useState(false)
  const [confirming, setConfirming] = useState(false)

  useEffect(() => {
    if (comment.userId) fetchUser(comment.userId).then((u) => setName(displayName(u, t('anonymous'))))
  }, [comment.userId, t])

  async function handleDelete() {
    setDeleting(true)
    await fetch(`/api/comments/${comment.id}`, { method: 'DELETE' })
    onDelete(comment.id)
  }

  return (
    <div className={styles.commentRow}>
      <div className={styles.commentMeta}>
        <span className={styles.commentAuthor}>{name}</span>
        {comment.parentId && <span className={styles.replyTag}>{t('reply')}</span>}
        <Link href={`/novels/${novelId}/chapters/${chapterId}#para-${comment.paragraphIndex}`}
          className={styles.commentPara}>{t('paragraphLabel', { n: comment.paragraphIndex + 1 })}</Link>
        <span className={styles.commentTime}>{formatTime(comment.createdAt, locale)}</span>
      </div>
      <div className={styles.contentRow}>
        <p className={styles.commentContent}>{comment.content}</p>
        <div className={styles.commentActions}>
          {confirming ? (
            <>
              <button
                className={styles.btnConfirm}
                onClick={handleDelete}
                disabled={deleting}
              >
                {t('confirmDeleteComment')}
              </button>
              <button className={styles.btnCancel} onClick={() => setConfirming(false)}>
                {t('cancelDelete')}
              </button>
            </>
          ) : (
            <button
              className={styles.btnDelete}
              onClick={() => setConfirming(true)}
              disabled={deleting}
            >
              {t('deleteComment')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AuthorCommentList({
  chapters,
  novelId,
}: {
  chapters: ChapterWithComments[]
  novelId: string
}) {
  const t = useTranslations('author')
  const [commentMap, setCommentMap] = useState<Record<string, CommentItem[]>>(
    Object.fromEntries(chapters.map((c) => [c.id, c.comments]))
  )

  function handleDelete(chapterId: string, commentId: string) {
    setCommentMap((prev) => ({
      ...prev,
      [chapterId]: prev[chapterId].filter((c) => c.id !== commentId),
    }))
  }

  return (
    <div className={styles.chapterList}>
      {chapters.map((chapter) => {
        const comments = commentMap[chapter.id] ?? []
        if (comments.length === 0) return null
        return (
          <div key={chapter.id} className={styles.chapterGroup}>
            <h2 className={styles.chapterTitle}>
              {t('chapterHeading', { order: chapter.order, title: chapter.title })}
              <span className={styles.chapterCount}>{t('commentsCount', { count: comments.length })}</span>
            </h2>
            <div className={styles.commentList}>
              {comments.map((c) => (
                <CommentRow
                  key={c.id}
                  comment={c}
                  novelId={novelId}
                  chapterId={chapter.id}
                  onDelete={(id) => handleDelete(chapter.id, id)}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
