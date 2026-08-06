'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import styles from './ProfilePointsClient.module.css'

interface PointsLog {
  id: string
  points: number
  reason: string
  novelId: string | null
  novelTitle: string | null
  createdAt: string
}

interface PointsData {
  points: number
  hasAccount: boolean
  total: number
  page: number
  totalPages: number
  logs: PointsLog[]
}

const PAGE_SIZE = 20

function formatRelativeTime(
  iso: string,
  locale: string,
  t: ReturnType<typeof useTranslations>
) {
  const date = new Date(iso)
  const diffMin = Math.floor((Date.now() - date.getTime()) / 60000)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffMin < 60) return t('minutesAgo', { n: Math.max(diffMin, 0) })
  if (diffHour < 24) return t('hoursAgo', { n: diffHour })
  if (diffDay < 7) return t('daysAgo', { n: diffDay })
  return date.toLocaleDateString(locale, { year: 'numeric', month: '2-digit', day: '2-digit' })
}

export default function ProfilePointsClient({ locale }: { locale: string }) {
  const t = useTranslations('profile')
  const [page, setPage] = useState(1)
  const [data, setData] = useState<PointsData | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async (targetPage: number) => {
    setLoading(true)
    const res = await fetch(
      `/api/profile/points?page=${targetPage}&limit=${PAGE_SIZE}&locale=${locale}`
    )
    if (res.ok) setData(await res.json())
    setLoading(false)
  }, [locale])

  useEffect(() => {
    load(page)
  }, [load, page])

  if (loading && data === null) {
    return (
      <div className={styles.page}>
        <p className={styles.empty}>{t('loading')}</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className={styles.page}>
        <p className={styles.empty}>{t('loadFailed')}</p>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t('title')}</h1>
{/* 
      {data.hasAccount ? (
        <div className={styles.card}>
          <span className={styles.cardLabel}>{t('myPoints')}</span>
          <div className={styles.cardValue}>
            <span className={styles.trophy}>🏆</span>
            <span className={styles.number}>{data.points.toLocaleString(locale)}</span>
          </div>
          <span className={styles.cardCaption}>{t('currentPoints')}</span>
        </div>
      ) : (
        <div className={styles.cardEmpty}>{t('noPoints')}</div>
      )}

      <h2 className={styles.sectionTitle}>{t('logTitle')}</h2>

      {data.logs.length === 0 ? (
        <p className={styles.empty}>{t('noLogs')}</p>
      ) : (
        <ul className={styles.list}>
          {data.logs.map((log) => (
            <li key={log.id} className={styles.row}>
              <span
                className={`${styles.delta} ${log.points >= 0 ? styles.deltaPlus : styles.deltaMinus}`}
              >
                {log.points >= 0 ? `+${log.points}` : log.points}
              </span>
              <div className={styles.rowBody}>
                <span className={styles.reason}>{log.reason}</span>
                {log.novelId && log.novelTitle && (
                  <Link href={`/novels/${log.novelId}`} className={styles.novelLink}>
                    《{log.novelTitle}》
                  </Link>
                )}
              </div>
              <span className={styles.time}>{formatRelativeTime(log.createdAt, locale, t)}</span>
            </li>
          ))}
        </ul>
      )}

      {data.totalPages > 1 && (
        <div className={styles.pager}>
          <button
            className={styles.pagerBtn}
            disabled={page <= 1 || loading}
            onClick={() => setPage((p) => p - 1)}
          >
            {t('prevPage')}
          </button>
          <span className={styles.pagerInfo}>
            {t('pageInfo', { page: data.page, totalPages: data.totalPages })}
          </span>
          <button
            className={styles.pagerBtn}
            disabled={page >= data.totalPages || loading}
            onClick={() => setPage((p) => p + 1)}
          >
            {t('nextPage')}
          </button>
        </div>
      )} */}
    </div>
  )
}
