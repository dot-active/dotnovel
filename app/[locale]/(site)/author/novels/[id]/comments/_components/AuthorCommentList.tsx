'use client'

import { useState, useEffect } from 'react'
import styles from '../page.module.css'

interface CommentItem {
  id: string
  content: string
  authorId: string
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
  if (!res.ok) return { id: userId, username: null, firstName: '用户', lastName: null }
  const data = await res.json()
  userCache.set(userId, data)
  return data
}

function displayName(u: UserInfo) {
  return u.username ?? ([u.firstName, u.lastName].filter(Boolean).join(' ') || '匿名')
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleDateString('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })
}

function CommentRow({
  comment,
  onDelete,
}: {
  comment: CommentItem
  onDelete: (id: string) => void
}) {
  const [name, setName] = useState<string>('…')
  const [deleting, setDeleting] = useState(false)
  const [confirming, setConfirming] = useState(false)

  useEffect(() => {
    fetchUser(comment.authorId).then((u) => setName(displayName(u)))
  }, [comment.authorId])

  async function handleDelete() {
    setDeleting(true)
    await fetch(`/api/comments/${comment.id}`, { method: 'DELETE' })
    onDelete(comment.id)
  }

  return (
    <div className={styles.commentRow}>
      <div className={styles.commentMeta}>
        <span className={styles.commentAuthor}>{name}</span>
        {comment.parentId && <span className={styles.replyTag}>回复</span>}
        <span className={styles.commentPara}>第{comment.paragraphIndex + 1}段</span>
        <span className={styles.commentTime}>{formatTime(comment.createdAt)}</span>
      </div>
      <p className={styles.commentContent}>{comment.content}</p>
      <div className={styles.commentActions}>
        {confirming ? (
          <>
            <button
              className={styles.btnConfirm}
              onClick={handleDelete}
              disabled={deleting}
            >
              确认删除
            </button>
            <button className={styles.btnCancel} onClick={() => setConfirming(false)}>
              取消
            </button>
          </>
        ) : (
          <button
            className={styles.btnDelete}
            onClick={() => setConfirming(true)}
            disabled={deleting}
          >
            删除
          </button>
        )}
      </div>
    </div>
  )
}

export default function AuthorCommentList({
  chapters,
}: {
  chapters: ChapterWithComments[]
  novelId: string
}) {
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
              第{chapter.order}章 {chapter.title}
              <span className={styles.chapterCount}>({comments.length} 条留言)</span>
            </h2>
            <div className={styles.commentList}>
              {comments.map((c) => (
                <CommentRow
                  key={c.id}
                  comment={c}
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
