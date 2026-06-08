'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './TranslationManager.module.css'

const LOCALES = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'zh-TW', label: '繁體中文' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
  { value: 'es', label: 'Español' },
]

interface TranslationRequest {
  targetLocale: string
  status: string
  totalChapters: number
  doneChapters: number
  errorMessage: string | null
  triggerRunId: string | null
}

interface NovelTranslationSummary {
  locale: string
  status: string
}

interface Props {
  novelId: string
  sourceLocale: string
  locale: string
  initialLang?: string | null
}

export default function TranslationManager({ novelId, sourceLocale, locale, initialLang }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [requests, setRequests] = useState<TranslationRequest[]>([])
  const [novelTranslations, setNovelTranslations] = useState<NovelTranslationSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionLocale, setActionLocale] = useState<string | null>(null)
  const [confirmState, setConfirmState] = useState<{ locale: string; conflict: string } | null>(null)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  async function fetchStatus() {
    try {
      const res = await fetch(`/api/translations/${novelId}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setRequests(data.requests)
      setNovelTranslations(data.novelTranslations)
    } catch {
      // silently ignore poll errors
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
  }, [novelId])

  // Auto-scroll to this section when initialLang is provided
  useEffect(() => {
    if (initialLang && sectionRef.current && !loading) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 200)
    }
  }, [loading])

  // Poll every 30s when any task is processing
  useEffect(() => {
    const hasActive = requests.some(r => r.triggerRunId && (r.status === 'pending' || r.status === 'processing'))
    if (hasActive) {
      pollRef.current = setInterval(fetchStatus, 30000)
    } else {
      if (pollRef.current) clearInterval(pollRef.current)
    }
    return () => { if (pollRef.current) clearInterval(pollRef.current) }
  }, [requests])

  async function handleAdd(targetLocale: string, force = false) {
    setActionLocale(targetLocale)
    setError(null)
    try {
      const res = await fetch('/api/translations/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ novelId, targetLocale, overwrite: force }),
      })
      const data = await res.json()
      if (res.status === 409) {
        setConfirmState({ locale: targetLocale, conflict: data.conflict })
        return
      }
      if (!res.ok) throw new Error(data.error || 'Failed')
      await fetchStatus()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
    } finally {
      setActionLocale(null)
    }
  }

  async function handleRetry(targetLocale: string) {
    setActionLocale(targetLocale)
    setError(null)
    try {
      const res = await fetch('/api/translations/retry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ novelId, targetLocale }),
      })
      if (!res.ok) throw new Error((await res.json()).error || 'Failed')
      await fetchStatus()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
    } finally {
      setActionLocale(null)
    }
  }

  async function handlePause(targetLocale: string) {
    setActionLocale(targetLocale)
    setError(null)
    try {
      const res = await fetch('/api/translations/pause', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ novelId, targetLocale }),
      })
      if (!res.ok) throw new Error((await res.json()).error || 'Failed')
      await fetchStatus()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
    } finally {
      setActionLocale(null)
    }
  }

  function getCardInfo(localeValue: string) {
    const req = requests.find(r => r.targetLocale === localeValue)
    const tr = novelTranslations.find(t => t.locale === localeValue)
    return { req, tr }
  }

  if (loading) return <div className={styles.loadingText}>加载中…</div>

  return (
    <div ref={sectionRef} className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>语言版本管理</span>
        <span className={styles.sectionSub}>自动翻译由 AI 生成，建议审阅后发布</span>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.grid}>
        {LOCALES.map(({ value, label }) => {
          if (value === sourceLocale) return null
          const { req, tr } = getCardInfo(value)
          const isBusy = actionLocale === value
          const status = req?.status ?? (tr ? tr.status : 'none')
          const isHighlighted = initialLang === value

          return (
            <div
              key={value}
              className={`${styles.card}${isHighlighted ? ` ${styles.cardHighlighted}` : ''}`}
            >
              <div className={styles.cardTop}>
                <span className={styles.langLabel}>{label}</span>
                <StatusBadge status={status} req={req} />
              </div>

              {req?.status === 'processing' && req.totalChapters > 0 && (
                <div className={styles.progress}>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${Math.round((req.doneChapters / req.totalChapters) * 100)}%` }}
                    />
                  </div>
                  <span className={styles.progressText}>{req.doneChapters}/{req.totalChapters}章</span>
                </div>
              )}

              {req?.status === 'failed' && req.errorMessage && (
                <p className={styles.errorMsg}>{req.errorMessage.slice(0, 80)}</p>
              )}

              <div className={styles.cardActions}>
                {confirmState?.locale === value ? (
                  <div className={styles.confirmRow}>
                    <span className={styles.confirmText}>
                      {confirmState.conflict === 'paused' ? '此语言已暂停，确认重新翻译？' : '已有发布版本，确认覆盖？'}
                    </span>
                    <button
                      className={styles.btnDangerSm}
                      disabled={isBusy}
                      onClick={() => { setConfirmState(null); handleAdd(value, true) }}
                    >
                      确认覆盖
                    </button>
                    <button
                      className={styles.btnCancelSm}
                      onClick={() => setConfirmState(null)}
                    >
                      取消
                    </button>
                  </div>
                ) : (
                  <>
                    {/* No request at all and no existing translation */}
                    {!req && !tr && (
                      <button className={styles.btnAdd} disabled={isBusy} onClick={() => handleAdd(value)}>
                        {isBusy ? '触发中…' : '添加翻译'}
                      </button>
                    )}
                    {/* Pre-selected at creation but not yet triggered */}
                    {req && !req.triggerRunId && req.status === 'pending' && !tr && (
                      <button className={styles.btnAdd} disabled={isBusy} onClick={() => handleAdd(value)}>
                        {isBusy ? '触发中…' : '开始翻译'}
                      </button>
                    )}
                    {/* Actually queued or running */}
                    {req?.triggerRunId && (req.status === 'pending' || req.status === 'processing') && (
                      <span className={styles.infoText}>翻译进行中…</span>
                    )}
                    {/* Translation completed — chapters are drafts awaiting publish */}
                    {req?.status === 'completed' && (
                      <>
                        <button
                          className={styles.btnPause}
                          disabled={isBusy}
                          onClick={() => handlePause(value)}
                        >
                          {isBusy ? '操作中…' : '暂停翻译'}
                        </button>
                        <button
                          className={styles.btnAdd}
                          disabled={isBusy}
                          onClick={() => handleAdd(value)}
                        >
                          {isBusy ? '触发中…' : '重新翻译'}
                        </button>
                      </>
                    )}
                    {/* Paused */}
                    {req?.status === 'paused' && (
                      <>
                        <span className={styles.pausedTag}>⏸ 已暂停</span>
                        <button
                          className={styles.btnAdd}
                          disabled={isBusy}
                          onClick={() => handleAdd(value)}
                        >
                          {isBusy ? '触发中…' : '开始翻译'}
                        </button>
                      </>
                    )}
                    {/* Fully published — chapters published too */}
                    {(req?.status === 'published' || (!req && tr?.status === 'published')) && (
                      <>
                        <span className={styles.publishedTag}>✓ 已发布</span>
                        <button
                          className={styles.btnAdd}
                          disabled={isBusy}
                          onClick={() => handleAdd(value)}
                        >
                          {isBusy ? '触发中…' : '重新翻译'}
                        </button>
                      </>
                    )}
                    {/* Failed */}
                    {req?.status === 'failed' && (
                      <button className={styles.btnRetry} disabled={isBusy} onClick={() => handleRetry(value)}>
                        {isBusy ? '重试中…' : '重试'}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StatusBadge({ status, req }: { status: string; req?: TranslationRequest }) {
  if (!req && status === 'none') return <span className={`${styles.badge} ${styles.badgeNone}`}>未有此语言版本</span>
  if (status === 'pending' && !req?.triggerRunId) return <span className={`${styles.badge} ${styles.badgeNone}`}>已选择</span>
  if (status === 'pending') return <span className={`${styles.badge} ${styles.badgeProcessing}`}>等待翻译</span>
  if (status === 'processing') return (
    <span className={`${styles.badge} ${styles.badgeProcessing}`}>
      <span className={styles.spinner} />
      翻译中
    </span>
  )
  if (status === 'completed') return <span className={`${styles.badge} ${styles.badgeDraft}`}>已完成</span>
  if (status === 'published') return <span className={`${styles.badge} ${styles.badgePublished}`}>已发布</span>
  if (status === 'paused') return <span className={`${styles.badge} ${styles.badgePaused}`}>已暂停</span>
  if (status === 'failed') return <span className={`${styles.badge} ${styles.badgeFailed}`}>翻译失败</span>
  return <span className={`${styles.badge} ${styles.badgeNone}`}>未有此语言版本</span>
}
