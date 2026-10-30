'use client'

import { useEffect, useRef } from 'react'

const MIN_INTERVAL_MS = 3_000
const MAX_INTERVAL_MS = 60_000
// A job that hasn't moved in this long is stuck (or waiting on the manual
// script that nobody is running) — stop polling so the database can suspend.
const GIVE_UP_AFTER_MS = 30 * 60_000

/**
 * Polls `tick` while `active`. Every poll hits the database, and Neon only
 * suspends after a few idle minutes, so a forgotten tab polling at a fixed
 * 3s rate keeps the compute awake around the clock. Instead:
 *
 * - the interval doubles (3s → 60s) for as long as `tick` reports no change,
 *   and snaps back to 3s as soon as it does;
 * - polling pauses while the tab is hidden and resumes (immediately, with a
 *   fresh backoff) when it becomes visible again;
 * - after GIVE_UP_AFTER_MS without a change it stops until the tab is next
 *   shown.
 *
 * `tick` resolves to true when it observed a change.
 */
export function useBackoffPolling(active: boolean, tick: () => Promise<boolean>) {
  const tickRef = useRef(tick)
  tickRef.current = tick

  useEffect(() => {
    if (!active) return

    let cancelled = false
    let running = false
    let timer: ReturnType<typeof setTimeout> | null = null
    let delay = MIN_INTERVAL_MS
    let lastChangeAt = Date.now()

    const schedule = () => {
      if (cancelled || document.hidden) return
      if (Date.now() - lastChangeAt > GIVE_UP_AFTER_MS) return
      timer = setTimeout(run, delay)
    }

    const run = async () => {
      timer = null
      running = true
      let changed = false
      try {
        changed = await tickRef.current()
      } catch {
        // Transient network error — treat as "no change" and back off
      }
      running = false
      if (cancelled) return
      if (changed) {
        delay = MIN_INTERVAL_MS
        lastChangeAt = Date.now()
      } else {
        delay = Math.min(delay * 2, MAX_INTERVAL_MS)
      }
      schedule()
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        if (timer) clearTimeout(timer)
        timer = null
        return
      }
      if (timer || running) return
      delay = MIN_INTERVAL_MS
      lastChangeAt = Date.now()
      run()
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    schedule()

    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [active])
}
