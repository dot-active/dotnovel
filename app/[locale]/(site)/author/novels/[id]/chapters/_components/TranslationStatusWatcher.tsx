'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useBackoffPolling } from '@/lib/useBackoffPolling'
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
  // the current server render without restarting the poller every time.
  const signatureRef = useRef(signature)
  signatureRef.current = signature

  useBackoffPolling(signature.length > 0, async () => {
    const res = await fetch(`/api/translations/${novelId}`)
    if (!res.ok) return false
    const data = await res.json()
    if (buildTranslationSignature(data.requests ?? []) === signatureRef.current) return false
    router.refresh()
    return true
  })

  return null
}
