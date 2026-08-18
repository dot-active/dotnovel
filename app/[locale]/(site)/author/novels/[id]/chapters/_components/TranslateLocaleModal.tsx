'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import styles from './TranslateLocaleModal.module.css'

const LOCALE_LABELS: Record<string, string> = {
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  en: 'English',
  ja: '日本語',
  ko: '한국어',
  es: 'Español',
}

interface Props {
  title: string
  availableLocales: string[]
  localeStatus: Record<string, { status: string; totalChapters: number; doneChapters: number }>
  submitting: boolean
  error: string | null
  onConfirm: (targetLocales: string[]) => void
  onClose: () => void
}

export default function TranslateLocaleModal({
  title,
  availableLocales,
  localeStatus,
  submitting,
  error,
  onConfirm,
  onClose,
}: Props) {
  const t = useTranslations('author')
  const [selected, setSelected] = useState<string[]>([])

  function toggle(value: string) {
    setSelected((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalTitle}>{title}</div>

        {error && <p className={styles.error}>{error}</p>}

        {availableLocales.length === 0 ? (
          <p className={styles.error}>{t('translateNoLocalesAvailable')}</p>
        ) : (
          <div className={styles.localeGrid}>
            {availableLocales.map((value) => {
              const active = localeStatus[value]
              const isWaiting = active?.status === 'pending'
              const isProcessing = active?.status === 'processing'
              const isLocked = isWaiting || isProcessing

              return (
                <label
                  key={value}
                  className={`${styles.localeOption}${selected.includes(value) ? ` ${styles.localeOptionChecked}` : ''}${isLocked ? ` ${styles.localeOptionDisabled}` : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(value)}
                    disabled={isLocked}
                    onChange={() => toggle(value)}
                  />
                  <span>{LOCALE_LABELS[value] ?? value}</span>
                  {isWaiting && <span className={styles.localeStatus}>{t('translateStatusWaiting')}</span>}
                  {isProcessing && (
                    <span className={styles.localeStatus}>
                      {active.totalChapters > 0
                        ? t('translateStatusProcessing', { done: active.doneChapters, total: active.totalChapters })
                        : t('translateStatusWaiting')}
                    </span>
                  )}
                </label>
              )
            })}
          </div>
        )}

        <div className={styles.modalActions}>
          <button type="button" className={styles.cancelBtn} onClick={onClose} disabled={submitting}>
            {t('translateModalCancel')}
          </button>
          {availableLocales.length > 0 && (
            <button
              type="button"
              className={styles.confirmBtn}
              disabled={submitting || selected.length === 0}
              onClick={() => onConfirm(selected)}
            >
              {submitting ? t('translateTriggering') : t('translateModalConfirm')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
