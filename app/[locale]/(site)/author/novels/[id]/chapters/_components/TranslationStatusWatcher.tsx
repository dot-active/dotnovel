'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { buildTranslationSignature } from './translationSignature'

interface Props {
  novelId: string
  /** Signature of the active translation jobs as of this server render. */
  signature: string
}

/**
 * The chapters page is a server component, so once a translation job is queued
 * nothing re-renders it as the job progresses or finishes — the translate
 * buttons would stay stuck on "translating" until a manual reload. Mounted
 * once per page, this polls the status endpoint while any job is in flight and
 * refreshes the route as soon as the picture changes.
 */
export default function TranslationStatusWatcher({ novelId, signature }: Props) {
  const router = useRouter()
  // Keep the latest signature in a ref so the poll callback compares against
  // the current server render without restarting the interval every time.
  const signatureRef = useRef(signature)
  signatureRef.current = signature

  const isActive = signature.length > 0

  useEffect(() => {
    if (!isActive) return

    let cancelled = false

    const timer = setInterval(async () => {
      try {
        const res = await fetch(`/api/translations/${novelId}`)
        if (!res.ok) return
        const data = await res.json()
        if (cancelled) return
        if (buildTranslationSignature(data.requests ?? []) !== signatureRef.current) {
          router.refresh()
        }
      } catch {
        // Transient network error — try again on the next tick
      }
    }, 3000)

    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [novelId, isActive, router])

  return null
}
