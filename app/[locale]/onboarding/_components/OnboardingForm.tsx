'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { completeOnboarding } from '@/lib/actions/onboarding'
import styles from './OnboardingForm.module.css'

interface Props {
  returnUrl: string
  alreadyConfirmedViaMetadata: boolean
}

export default function OnboardingForm({ returnUrl, alreadyConfirmedViaMetadata }: Props) {
  const t = useTranslations('onboarding')
  const router = useRouter()
  const [checked, setChecked] = useState(alreadyConfirmedViaMetadata)
  const [pending, setPending] = useState(false)

  async function submit(isAdult: boolean) {
    setPending(true)
    const fd = new FormData()
    fd.set('isAdult', isAdult ? 'true' : 'false')
    try {
      await completeOnboarding(fd)
      router.push(returnUrl)
    } catch {
      setPending(false)
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.badge}>18+</div>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.desc}>{t('desc')}</p>

      {alreadyConfirmedViaMetadata && (
        <p className={styles.restoreNote}>{t('restoreNote')}</p>
      )}

      <label className={styles.checkRow}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className={styles.checkbox}
          disabled={pending}
        />
        <span className={styles.checkLabel}>{t('checkLabel')}</span>
      </label>

      <button
        onClick={() => submit(checked)}
        disabled={pending}
        className={styles.confirmBtn}
      >
        {pending ? t('pending') : t('confirm')}
      </button>

      <button
        type="button"
        onClick={() => submit(false)}
        disabled={pending}
        className={styles.skipBtn}
      >
        {t('skip')}
      </button>
    </div>
  )
}
