'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import styles from './TranslateLocaleModal.module.css'

const LOCALE_OPTIONS = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'zh-TW', label: '繁體中文' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
  { value: 'es', label: 'Español' },
]

interface Props {
  title: string
  sourceLocale: string
  submitting: boolean
  error: string | null
  onConfirm: (targetLocales: string[]) => void
  onClose: () => void
}

export default function TranslateLocaleModal({ title, sourceLocale, submitting, error, onConfirm, onClose }: Props) {
  const t = useTranslations('author')
  const [selected, setSelected] = useState<string[]>([])

  const options = LOCALE_OPTIONS.filter((o) => o.value !== sourceLocale)

  function toggle(value: string) {
    setSelected((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalTitle}>{title}</div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.localeGrid}>
          {options.map((o) => (
            <label
              key={o.value}
              className={`${styles.localeOption}${selected.includes(o.value) ? ` ${styles.localeOptionChecked}` : ''}`}
            >
              <input
                type="checkbox"
                checked={selected.includes(o.value)}
                onChange={() => toggle(o.value)}
              />
              {o.label}
            </label>
          ))}
        </div>

        <div className={styles.modalActions}>
          <button type="button" className={styles.cancelBtn} onClick={onClose} disabled={submitting}>
            {t('translateModalCancel')}
          </button>
          <button
            type="button"
            className={styles.confirmBtn}
            disabled={submitting || selected.length === 0}
            onClick={() => onConfirm(selected)}
          >
            {submitting ? t('translateTriggering') : t('translateModalConfirm')}
          </button>
        </div>
      </div>
    </div>
  )
}
