'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import styles from './CommentsPageClient.module.css'

interface AuthorItem {
  chapterId: string
  paragraphIndex: number
  novelId: string
  novelTitle: string
  chapterTitle: string
  chapterOrder: number
  totalCount: number
  unreadCount: number
  lastComment: {
    userId: string | null
    nickname: string | null
    content: string
    createdAt: string
  }
}

interface MineItem {
  id: string
  novelId: string
  novelTitle: string
  chapterId: string
  chapterTitle: string
  paragraphIndex: number
  content: string
  createdAt: string
  replyCount: number
  unreadReplyCount: number
  lastReply: {
    userId: string | null
    nickname: string | null
    content: string
    createdAt: string
  } | null
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
  if (!res.ok) {
    const fallback: UserInfo = { id: userId, username: null, firstName: null, lastName: null }
    userCache.set(userId, fallback)
    return fallback
  }
  const data = await res.json()
  userCache.set(userId, data)
  return data
}

function displayName(u: UserInfo, anonymousLabel: string) {
  return u.username ?? ([u.firstName, u.lastName].filter(Boolean).join(' ') || anonymousLabel)
}

function useCommenterName(userId: string | null, nickname: string | null, anonymousUserLabel: string, anonymousLabel: string) {
  const [name, setName] = useState(userId ? '…' : (nickname || anonymousUserLabel))
  useEffect(() => {
    if (userId) fetchUser(userId).then((u) => setName(displayName(u, anonymousLabel)))
  }, [userId, anonymousLabel])
  return name
}

function formatRelativeTime(iso: string, locale: string, t: ReturnType<typeof useTranslations>) {
  const date = new Date(iso)
  const diffMs = Date.now() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffMin < 60) return t('minutesAgo', { n: Math.max(diffMin, 0) })
  if (diffHour < 24) return t('hoursAgo', { n: diffHour })
  if (diffDay < 7) return t('daysAgo', { n: diffDay })
  return date.toLocaleDateString(locale, { year: 'numeric', month: '2-digit', day: '2-digit' })
}

function Badge({ count }: { count: number }) {
  if (count <= 0) return null
  return <span className={styles.unreadBadge}>{count > 99 ? '99+' : count}</span>
}

function AuthorRow({ item, onOpen }: { item: AuthorItem; onOpen: (item: AuthorItem) => void }) {
  const t = useTranslations('myComments')
  const locale = useLocale()
  const name = useCommenterName(item.lastComment.userId, item.lastComment.nickname, t('anonymousUser'), t('anonymous'))

  return (
    <div className={styles.row} onClick={() => onOpen(item)}>
      <div className={styles.rowTop}>
        <span className={styles.rowTitle}>
          {item.novelTitle} · {t('chapterLabel', { order: item.chapterOrder })} · {t('paragraphLabel', { n: item.paragraphIndex + 1 })}
        </span>
        <Badge count={item.unreadCount} />
      </div>
      <p className={styles.rowLastComment}>
        {t('lastCommentBy', { name })}「{item.lastComment.content.slice(0, 20)}」
      </p>
      <span className={styles.rowMeta}>
        {t('commentsCount', { count: item.totalCount })} · {formatRelativeTime(item.lastComment.createdAt, locale, t)}
      </span>
    </div>
  )
}

function MineRow({ item, onOpen }: { item: MineItem; onOpen: (item: MineItem) => void }) {
  const t = useTranslations('myComments')
  const locale = useLocale()
  const lastReplyName = useCommenterName(
    item.lastReply?.userId ?? null,
    item.lastReply?.nickname ?? null,
    t('anonymousUser'),
    t('anonymous')
  )

  return (
    <div className={styles.row} onClick={() => onOpen(item)}>
      <div className={styles.rowTop}>
        <span className={styles.rowTitle}>
          {item.novelTitle} · {t('paragraphLabelSimple', { n: item.paragraphIndex + 1 })}
        </span>
        <Badge count={item.unreadReplyCount} />
      </div>
      <p className={styles.rowLastComment}>
        {t('iSaid')}「{item.content.slice(0, 30)}」
      </p>
      {item.replyCount > 0 && (
        <span className={styles.rowMeta}>
          {t('repliesCount', { count: item.replyCount })} · {t('lastReplyBy', { name: lastReplyName })} · {formatRelativeTime(item.lastReply!.createdAt, locale, t)}
        </span>
      )}
    </div>
  )
}

export default function CommentsPageClient({ locale }: { locale: string }) {
  const t = useTranslations('myComments')
  const router = useRouter()
  const [tab, setTab] = useState<'author' | 'mine'>('author')
  const [counts, setCounts] = useState<{ author: number; mine: number }>({ author: 0, mine: 0 })
  const [authorItems, setAuthorItems] = useState<AuthorItem[] | null>(null)
  const [mineItems, setMineItems] = useState<MineItem[] | null>(null)
  const [loading, setLoading] = useState(false)

  const load = useCallback(async (type: 'author' | 'mine') => {
    setLoading(true)
    const res = await fetch(`/api/comments/my?type=${type}&locale=${locale}`)
    if (res.ok) {
      const data = await res.json()
      setCounts(data.counts)
      if (type === 'author') setAuthorItems(data.items)
      else setMineItems(data.items)
    }
    setLoading(false)
  }, [locale])

  useEffect(() => {
    load('author')
  }, [load])

  function handleTabChange(next: 'author' | 'mine') {
    setTab(next)
    if (next === 'author' && authorItems === null) load('author')
    if (next === 'mine' && mineItems === null) load('mine')
  }

  async function handleOpenAuthor(item: AuthorItem) {
    await fetch('/api/comments/read', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chapterId: item.chapterId, paragraphIndex: item.paragraphIndex, type: 'author' }),
    })
    router.push(`/novels/${item.novelId}/chapters/${item.chapterId}?paragraph=${item.paragraphIndex}`)
  }

  async function handleOpenMine(item: MineItem) {
    await fetch('/api/comments/read', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentId: item.id, type: 'reply' }),
    })
    router.push(`/novels/${item.novelId}/chapters/${item.chapterId}?paragraph=${item.paragraphIndex}`)
  }

  const currentItems = tab === 'author' ? authorItems : mineItems

  return (
    <div className={styles.page}>
      {/* <h1 className={styles.title}>{t('title')}</h1> */}

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === 'author' ? styles.tabActive : ''}`}
          onClick={() => handleTabChange('author')}
        >
          {t('tabAuthor')}
          {counts.author > 0 && <span className={styles.tabBadge}>{counts.author > 99 ? '99+' : counts.author}</span>}
        </button>
        <button
          className={`${styles.tab} ${tab === 'mine' ? styles.tabActive : ''}`}
          onClick={() => handleTabChange('mine')}
        >
          {t('tabMine')}
          {counts.mine > 0 && <span className={styles.tabBadge}>{counts.mine > 99 ? '99+' : counts.mine}</span>}
        </button>
      </div>

      <div className={styles.list}>
        {loading && currentItems === null && <p className={styles.empty}>{t('loading')}</p>}

        {!loading && currentItems !== null && currentItems.length === 0 && (
          <p className={styles.empty}>{tab === 'author' ? t('noAuthorComments') : t('noMineComments')}</p>
        )}

        {tab === 'author' && authorItems?.map((item) => (
          <AuthorRow key={`${item.chapterId}-${item.paragraphIndex}`} item={item} onOpen={handleOpenAuthor} />
        ))}

        {tab === 'mine' && mineItems?.map((item) => (
          <MineRow key={item.id} item={item} onOpen={handleOpenMine} />
        ))}
      </div>
    </div>
  )
}
