'use client'

import { useState } from 'react'
import { useAuth, SignInButton } from '@clerk/nextjs'
import { useTranslations } from 'next-intl'
import styles from './FavoriteButton.module.css'

interface Props {
  novelId: string
  initialFavorited: boolean
}

export default function FavoriteButton({ novelId, initialFavorited }: Props) {
  const { isSignedIn } = useAuth()
  const t = useTranslations('novel')
  const [favorited, setFavorited] = useState(initialFavorited)
  const [loading, setLoading] = useState(false)

  async function toggle() {
    setLoading(true)
    try {
      const res = await fetch('/api/favorites', {
        method: favorited ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ novelId }),
      })
      if (res.ok) setFavorited((prev) => !prev)
    } finally {
      setLoading(false)
    }
  }

  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <button className={styles.btn}>{t('addFavorite')}</button>
      </SignInButton>
    )
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={favorited ? styles.btnActive : styles.btn}
    >
      {loading ? '…' : favorited ? t('favorited') : t('addFavorite')}
    </button>
  )
}
