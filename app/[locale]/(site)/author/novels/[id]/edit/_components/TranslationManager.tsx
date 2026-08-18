'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
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
  const t = useTranslations('author.translationManager')
  const sectionRef = useRef<HTMLDivElement>(null)
  const [requests, setRequests] = useState<TranslationRequest[]>([])
  const [novelTranslations, setNovelTranslations] = useState<NovelTranslationSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionLocale, setActionLocale] = useState<string | null>(null)
  const [confirmState, setConfirmState] = useState<{ locale: string; conflict: string } | null>(null)
  const [stopTarget, setStopTarget] = useState<string | null>(null)
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

  // Poll every 3s while a job is in flight — translate-novel is a quick,
  // one-shot title/description translation now, so a slow poll would leave
  // the UI looking stuck on "translating" long after the job actually finished.
  useEffect(() => {
    const hasActive = requests.some(r => r.triggerRunId && (r.status === 'pending' || r.status === 'processing'))
    if (hasActive) {
      pollRef.current = setInterval(fetchStatus, 3000)
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

  async function handleStop(targetLocale: string) {
    setActionLocale(targetLocale)
    setError(null)
    try {
      const res = await fetch('/api/translations/stop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ novelId, targetLocale }),
      })
      if (!res.ok) throw new Error((await res.json()).error || 'Failed')
      setStopTarget(null)
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

  if (loading) return <div className={styles.loadingText}>{t('loading')}</div>

  const stopTargetLabel = LOCALES.find(l => l.value === stopTarget)?.label ?? stopTarget ?? ''

  return (
    <>
    <div ref={sectionRef} className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>{t('title')}</span>
        
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
                <StatusBadge status={status} req={req} t={t} />
              </div>

              {req?.status === 'processing' && req.totalChapters > 0 && (
                <div className={styles.progress}>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${Math.round((req.doneChapters / req.totalChapters) * 100)}%` }}
                    />
                  </div>
                  <span className={styles.progressText}>{t('chaptersProgress', { done: req.doneChapters, total: req.totalChapters })}</span>
                </div>
              )}

              {req?.status === 'failed' && req.errorMessage && (
                <p className={styles.errorMsg}>{req.errorMessage.slice(0, 80)}</p>
              )}

              <div className={styles.cardActions}>
                {confirmState?.locale === value ? (
                  <div className={styles.confirmRow}>
                    <span className={styles.confirmText}>
                      {confirmState.conflict === 'paused' ? t('confirmRetranslatePaused') : t('confirmOverwritePublished')}
                    </span>
                    <button
                      className={styles.btnDangerSm}
                      disabled={isBusy}
                      onClick={() => { setConfirmState(null); handleAdd(value, true) }}
                    >
                      {t('confirmOverwrite')}
                    </button>
                    <button
                      className={styles.btnCancelSm}
                      onClick={() => setConfirmState(null)}
                    >
                      {t('cancel')}
                    </button>
                  </div>
                ) : (
                  <>
                    {/* No request at all and no existing translation */}
                    {!req && !tr && (
                      <button className={styles.btnAdd} disabled={isBusy} onClick={() => handleAdd(value)}>
                        {isBusy ? t('triggering') : t('addTranslation')}
                      </button>
                    )}
                    {/* Pre-selected at creation but not yet triggered */}
                    {req && !req.triggerRunId && req.status === 'pending' && !tr && (
                      <button className={styles.btnAdd} disabled={isBusy} onClick={() => handleAdd(value)}>
                        {isBusy ? t('triggering') : t('startTranslation')}
                      </button>
                    )}
                    {/* Actually queued or running */}
                    {req?.triggerRunId && (req.status === 'pending' || req.status === 'processing') && (
                      <span className={styles.infoText}>{t('translatingInProgress')}</span>
                    )}
                    {/* Has an existing translation — completed, published, or a legacy
                        paused row. "Add"/"retranslate" are one-shot actions, so the only
                        follow-ups are: do it again, or remove this language entirely. */}
                    {(req?.status === 'completed' ||
                      req?.status === 'published' ||
                      req?.status === 'paused' ||
                      (!req && tr?.status === 'published')) && (
                      <>
                        <button
                          className={styles.btnAdd}
                          disabled={isBusy}
                          onClick={() => handleAdd(value, true)}
                        >
                          {isBusy ? t('triggering') : t('retranslate')}
                        </button>
                        <button
                          className={styles.btnStop}
                          disabled={isBusy}
                          onClick={() => setStopTarget(value)}
                        >
                          {t('stopTranslation')}
                        </button>
                      </>
                    )}
                    {/* Failed */}
                    {req?.status === 'failed' && (
                      <button className={styles.btnRetry} disabled={isBusy} onClick={() => handleRetry(value)}>
                        {isBusy ? t('retrying') : t('retry')}
                      </button>
                    )}
                  </>
                )}
              </div>
              
            </div>
          )
        })}
        <div className={styles.sectionSub}>{t('aiHint')}</div>
      </div>
    </div>

    {stopTarget && (
      <div className={styles.modalOverlay} onClick={() => setStopTarget(null)}>
        <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalTitle}>{t('confirmStopTitle')}</div>
          <p className={styles.modalMessage}>{t('confirmStopMessage', { locale: stopTargetLabel })}</p>
          <div className={styles.modalActions}>
            <button
              className={styles.btnCancelSm}
              disabled={actionLocale === stopTarget}
              onClick={() => setStopTarget(null)}
            >
              {t('cancel')}
            </button>
            <button
              className={styles.btnDangerSm}
              disabled={actionLocale === stopTarget}
              onClick={() => handleStop(stopTarget)}
            >
              {actionLocale === stopTarget ? t('stopping') : t('confirmStopButton')}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

function StatusBadge({ status, req, t }: { status: string; req?: TranslationRequest; t: ReturnType<typeof useTranslations> }) {
  if (!req && status === 'none') return <span className={`${styles.badge} ${styles.badgeNone}`}>{t('noVersion')}</span>
  if (status === 'pending' && !req?.triggerRunId) return <span className={`${styles.badge} ${styles.badgeNone}`}>{t('selected')}</span>
  // Queued (pending, dispatched) and actively running both just mean "wait" to
  // the author — translate-novel is fast enough now that splitting these into
  // two labels only adds a state that flickers by unnoticed.
  if (status === 'pending' || status === 'processing') return (
    <span className={`${styles.badge} ${styles.badgeProcessing}`}>
      <span className={styles.spinner} />
      {t('badgeTranslating')}
    </span>
  )
  if (status === 'completed') return <span className={`${styles.badge} ${styles.badgeDraft}`}>{t('completed')}</span>
  if (status === 'published') return <span className={`${styles.badge} ${styles.badgePublished}`}>{t('published')}</span>
  if (status === 'paused') return <span className={`${styles.badge} ${styles.badgePaused}`}>{t('paused')}</span>
  if (status === 'failed') return <span className={`${styles.badge} ${styles.badgeFailed}`}>{t('translationFailed')}</span>
  return <span className={`${styles.badge} ${styles.badgeNone}`}>{t('noVersion')}</span>
}
