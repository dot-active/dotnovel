export interface ActiveStatusRequest {
  targetLocale: string
  status: string
  source: string
  triggerRunId: string | null
  totalChapters: number
  doneChapters: number
}

/**
 * A translation job is "in flight" once a worker owns it: a Trigger.dev job
 * from the moment it has a run id, a manual job from the moment it is queued
 * for the local `npm run translate:manual` script.
 */
export function isActiveRequest(r: ActiveStatusRequest): boolean {
  if (r.source === 'manual') return r.status === 'translating' || r.status === 'processing'
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
