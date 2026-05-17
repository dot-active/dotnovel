'use client'

import { useState, useCallback, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import styles from './ParagraphComments.module.css'

interface CommentData {
  id: string
  content: string
  authorId: string
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
    fetchUser(comment.authorId).then(setUserInfo)
  }, [comment.authorId])

  const indentLevel = Math.min(depth, 3)

  async function handleDelete() {
    setDeleting(true)
    await fetch(`/api/comments/${comment.id}`, { method: 'DELETE' })
    onDeleted(comment.id)
  }

  const name = userInfo ? displayName(userInfo) : '…'
  const avatar = userInfo?.imageUrl

  return (
    <div className={styles.commentNode} style={{ '--indent': indentLevel } as React.CSSProperties}>
      <div className={styles.commentBody}>
        <div className={styles.commentHeader}>
          {avatar ? (
            <img src={avatar} alt={name} className={styles.avatar} />
          ) : (
            <span className={styles.avatarFallback}>{name[0]}</span>
          )}
          <span className={styles.authorName}>{name}</span>
          <span className={styles.commentTime}>{formatTime(comment.createdAt)}</span>
          {currentUserId === comment.authorId && !comment.isDeleted && (
            <button
              className={styles.deleteBtn}
              onClick={handleDelete}
              disabled={deleting}
            >
              删除
            </button>
          )}
        </div>
        {comment.isDeleted ? (
          <p className={styles.deletedPlaceholder}>该评论已删除</p>
        ) : (
          <p className={styles.commentContent}>{comment.content}</p>
        )}
        {!comment.isDeleted && (
          <button
            className={styles.replyBtn}
            onClick={() => onReply(comment.id, name)}
          >
            回复
          </button>
        )}
      </div>
      {comment.replies.length > 0 && (
        <div className={styles.replies}>
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
        </div>
      )}
    </div>
  )
}

interface Props {
  chapterId: string
  paragraphIndex: number
  currentUserId: string | null
  initialCount: number
}

export default function ParagraphComments({ chapterId, paragraphIndex, currentUserId, initialCount }: Props) {
  const [open, setOpen] = useState(false)
  const [comments, setComments] = useState<CommentData[]>([])
  const [count, setCount] = useState<number>(initialCount)
  const [loading, setLoading] = useState(false)
  const [replyTo, setReplyTo] = useState<{ parentId: string; authorName: string } | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [submitting, setSubmitting] = useState(false)

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
    if (!currentUserId) {
      alert('请登录后评论')
      return
    }
    setReplyTo({ parentId, authorName })
    setInputValue('')
  }, [currentUserId])

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
    if (!currentUserId) {
      alert('请登录后评论')
      return
    }
    const text = inputValue.trim()
    if (!text) return

    setSubmitting(true)
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: text,
        chapterId,
        paragraphIndex,
        parentId: replyTo?.parentId ?? null,
      }),
    })

    if (res.ok) {
      const newComment: CommentData = await res.json()
      newComment.replies = []

      if (replyTo) {
        function appendReply(list: CommentData[]): CommentData[] {
          return list.map((c) => {
            if (c.id === replyTo!.parentId) {
              return { ...c, replies: [...c.replies, newComment] }
            }
            return { ...c, replies: appendReply(c.replies) }
          })
        }
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
    <div className={styles.root}>
      <button className={styles.trigger} onClick={handleToggle} title="查看评论">
        <FontAwesomeIcon icon={faComment} className={styles.triggerIcon} />
        {count > 0 && <span className={styles.triggerCount}>{count}</span>}
      </button>

      {open && (
        <div className={styles.panel}>
          {loading && <p className={styles.loading}>加载中…</p>}

          {!loading && comments.length === 0 && (
            <p className={styles.empty}>暂无评论，来发表第一条吧</p>
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

          <div className={styles.inputArea}>
            {replyTo && (
              <div className={styles.replyHint}>
                回复 @{replyTo.authorName}
                <button className={styles.cancelReply} onClick={() => setReplyTo(null)}>✕</button>
              </div>
            )}
            {currentUserId ? (
              <>
                <textarea
                  className={styles.textarea}
                  placeholder={replyTo ? `回复 @${replyTo.authorName}…` : '写下你的评论…'}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  rows={2}
                />
                <button
                  className={styles.submitBtn}
                  onClick={handleSubmit}
                  disabled={submitting || !inputValue.trim()}
                >
                  {submitting ? '提交中…' : '发表'}
                </button>
              </>
            ) : (
              <p className={styles.loginHint}>请登录后评论</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
