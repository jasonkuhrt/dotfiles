/**
 * Review progress per path, as the review-marks extension publishes it on the
 * extension event bus (`review-marks/index.ts`). Empty until it publishes, so
 * without review-marks every row renders as before.
 */

export const REVIEW_STATUS_EVENT = "review-marks:status"

export interface ReviewStatusPayload {
  done: readonly string[]
  partial: readonly string[]
}

export type ReviewStatus = "done" | "partial"

let statusByPath: ReadonlyMap<string, ReviewStatus> = new Map()
const listeners = new Set<() => void>()

/** Replace the snapshot with a published payload and notify mounted panes. */
export function publishReviewStatus({ done, partial }: ReviewStatusPayload) {
  const next = new Map<string, ReviewStatus>()
  for (const path of partial) next.set(path, "partial")
  for (const path of done) next.set(path, "done")
  statusByPath = next
  for (const listener of listeners) listener()
}

export function subscribeReviewStatus(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getReviewStatus() {
  return statusByPath
}
