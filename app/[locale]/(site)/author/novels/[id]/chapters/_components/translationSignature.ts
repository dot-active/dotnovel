export interface ActiveStatusRequest {
  targetLocale: string
  status: string
  triggerRunId: string | null
  totalChapters: number
  doneChapters: number
}

/** A translation job is "in flight" once it has been handed to Trigger.dev. */
export function isActiveRequest(r: ActiveStatusRequest): boolean {
  return Boolean(r.triggerRunId) && (r.status === 'pending' || r.status === 'processing')
}

/**
 * Stable fingerprint of the in-flight translation jobs for a novel. Shared by
 * the server render and the client-side poller so they compare like for like:
 * when the two differ, the page's view of the world is stale.
 */
export function buildTranslationSignature(requests: ActiveStatusRequest[]): string {
  return requests
    .filter(isActiveRequest)
    .map((r) => `${r.targetLocale}:${r.status}:${r.doneChapters}/${r.totalChapters}`)
    .sort()
    .join('|')
}
