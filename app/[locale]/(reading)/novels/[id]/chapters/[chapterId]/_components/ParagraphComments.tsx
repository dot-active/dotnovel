'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from './ParagraphComments.module.css'

interface CommentData {
  id: string
  content: string
  userId: string | null
  nickname: string | null
  paragraphIndex: number
  parentId: string | null
  createdAt: string
  isDeleted: boolean
  replies: CommentData[]
}

interface UserInfo {
  id: string
  username: string | null
  firstName: string | null
  lastName: string | null
  imageUrl: string
}

function formatTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function displayName(u: UserInfo) {
  return u.username ?? ([u.firstName, u.lastName].filter(Boolean).join(' ') || '匿名')
}

// Fetches Clerk user info from public API
const userCache = new Map<string, UserInfo>()

async function fetchUser(userId: string): Promise<UserInfo> {
  if (userCache.has(userId)) return userCache.get(userId)!
  // Use internal API route to get user info
  const res = await fetch(`/api/users/${userId}`)
  if (!res.ok) {
    const fallback: UserInfo = { id: userId, username: null, firstName: '用户', lastName: null, imageUrl: '' }
    userCache.set(userId, fallback)
    return fallback
  }
  const data = await res.json()
  userCache.set(userId, data)
  return data
}

interface CommentNodeProps {
  comment: CommentData
  depth: number
  currentUserId: string | null
  chapterId: string
  paragraphIndex: number
  onReply: (parentId: string, parentAuthorName: string) => void
  onDeleted: (id: string) => void
}

function CommentNode({ comment, depth, currentUserId, chapterId, paragraphIndex, onReply, onDeleted }: CommentNodeProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [expanded, setExpanded] = useState(true)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (comment.userId) fetchUser(comment.userId).then(setUserInfo)
  }, [comment.userId])

  const indentLevel = Math.min(depth, 3)

  async function handleDelete() {
    setDeleting(true)
    await fetch(`/api/comments/${comment.id}`, { method: 'DELETE' })
    onDeleted(comment.id)
  }

  const name = comment.userId ? (userInfo ? displayName(userInfo) : '…') : (comment.nickname || '匿名用户')
  const avatar = comment.userId ? userInfo?.imageUrl : null

  return (
    <span className={styles.commentNode} style={{ '--indent': indentLevel } as React.CSSProperties}>
      <span className={styles.commentBody}>
        <span className={styles.commentHeader}>
          {avatar ? (
            <img src={avatar} alt={name} className={styles.avatar} />
          ) : (
            <span className={styles.avatarDefault} aria-hidden="true" />
          )}
          <span className={styles.authorName}>{name}</span>
          <span className={styles.commentTime}>{formatTime(comment.createdAt)}</span>
          {currentUserId && currentUserId === comment.userId && !comment.isDeleted && (
            <button
              className={styles.deleteBtn}
              onClick={handleDelete}
              disabled={deleting}
            >
              删除
            </button>
          )}
        </span>
        {comment.isDeleted ? (
          <span className={styles.deletedPlaceholder}>该评论已删除</span>
        ) : (
          <span className={styles.commentContent}>{comment.content}</span>
        )}
        {!comment.isDeleted && (
          <button
            className={styles.replyBtn}
            onClick={() => onReply(comment.id, name)}
          >
            回复
          </button>
        )}
      </span>
      {comment.replies.length > 0 && (
        <span className={styles.replies}>
          {comment.replies.map((r) => (
            <CommentNode
              key={r.id}
              comment={r}
              depth={depth + 1}
              currentUserId={currentUserId}
              chapterId={chapterId}
              paragraphIndex={paragraphIndex}
              onReply={onReply}
              onDeleted={onDeleted}
            />
          ))}
        </span>
      )}
    </span>
  )
}

interface Props {
  chapterId: string
  paragraphIndex: number
  currentUserId: string | null
  initialCount: number
  show?: boolean
}

export default function ParagraphComments({ chapterId, paragraphIndex, currentUserId, initialCount, show }: Props) {
  const [open, setOpen] = useState(false)
  const [comments, setComments] = useState<CommentData[]>([])
  const [count, setCount] = useState<number>(initialCount)
  const [loading, setLoading] = useState(false)
  const [replyTo, setReplyTo] = useState<{ parentId: string; authorName: string } | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [nicknameValue, setNicknameValue] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const rootRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  async function loadComments() {
    setLoading(true)
    const res = await fetch(`/api/comments?chapterId=${chapterId}&paragraphIndex=${paragraphIndex}`)
    const data: CommentData[] = await res.json()
    setComments(data)
    setCount(data.length)
    setLoading(false)
  }

  useEffect(() => {
    if (window.location.hash === `#para-${paragraphIndex}`) {
      loadComments()
      setOpen(true)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleToggle() {
    if (!open) {
      loadComments()
    }
    setOpen((v) => !v)
  }

  const handleReply = useCallback((parentId: string, authorName: string) => {
    setReplyTo({ parentId, authorName })
    setInputValue('')
  }, [])

  function handleDeleted(id: string) {
    function markDeleted(list: CommentData[]): CommentData[] {
      return list.map((c) => {
        if (c.id === id) return { ...c, isDeleted: true }
        return { ...c, replies: markDeleted(c.replies) }
      })
    }
    setComments((prev) => markDeleted(prev))
  }

  async function handleSubmit() {
    const text = inputValue.trim()
    if (!text || text.length > 500) return

    setSubmitting(true)
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: text,
        chapterId,
        paragraphIndex,
        parentId: replyTo?.parentId ?? null,
        nickname: currentUserId ? undefined : nicknameValue.trim() || undefined,
      }),
    })

    if (res.ok) {
      const newComment: CommentData = await res.json()
      newComment.replies = []

      if (replyTo) {
        const appendReply = (list: CommentData[]): CommentData[] =>
          list.map((c) => {
            if (c.id === replyTo!.parentId) {
              return { ...c, replies: [...c.replies, newComment] }
            }
            return { ...c, replies: appendReply(c.replies) }
          })
        setComments((prev) => appendReply(prev))
      } else {
        setComments((prev) => [...prev, newComment])
      }
      setCount((prev) => (prev ?? 0) + 1)
      setInputValue('')
      setReplyTo(null)
    }
    setSubmitting(false)
  }

  return (
    <span className={styles.root} ref={rootRef}>
      <button className={`${styles.trigger} ${show || open || count > 0 ? styles.triggerVisible : ''}`} onClick={handleToggle} title="查看评论">
        <FontAwesomeIcon icon={faComment} className={styles.triggerIcon} />
        {count > 0 && <span className={styles.triggerCount}>{count}</span>}
      </button>

      {open && createPortal(
        <div
          className={styles.overlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
        >
          <div className={styles.dialog} role="dialog" aria-modal="true" aria-label="评论">
            <div className={styles.dialogHeader}>
              <span className={styles.dialogTitle}>评论{count > 0 ? ` (${count})` : ''}</span>
              <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="关闭">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div className={styles.dialogBody}>
              {loading && <span className={styles.loading}>加载中…</span>}

              {!loading && comments.length === 0 && (
                <span className={styles.empty}>暂无评论，来发表第一条吧</span>
              )}

              {comments.map((c) => (
                <CommentNode
                  key={c.id}
                  comment={c}
                  depth={0}
                  currentUserId={currentUserId}
                  chapterId={chapterId}
                  paragraphIndex={paragraphIndex}
                  onReply={handleReply}
                  onDeleted={handleDeleted}
                />
              ))}
            </div>

            <div className={styles.inputArea}>
              {replyTo && (
                <span className={styles.replyHint}>
                  回复 @{replyTo.authorName}
                  <button className={styles.cancelReply} onClick={() => setReplyTo(null)}>✕</button>
                </span>
              )}
              {!currentUserId && (
                <span className={styles.nicknameField}>
                  <label className={styles.fieldLabel}>昵称（选填）</label>
                  <input
                    type="text"
                    className={styles.nicknameInput}
                    placeholder="不填将显示为「匿名用户」"
                    value={nicknameValue}
                    onChange={(e) => setNicknameValue(e.target.value)}
                    maxLength={30}
                  />
                </span>
              )}
              <textarea
                className={styles.textarea}
                placeholder={replyTo ? `回复 @${replyTo.authorName}…` : '写下你的评论…'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.slice(0, 500))}
                rows={2}
                maxLength={500}
              />
              <span className={styles.inputFooter}>
                <span className={styles.charCount}>{inputValue.length}/500</span>
                <button
                  className={styles.submitBtn}
                  onClick={handleSubmit}
                  disabled={submitting || !inputValue.trim()}
                >
                  {submitting ? '提交中…' : '发送留言'}
                </button>
              </span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </span>
  )
}
