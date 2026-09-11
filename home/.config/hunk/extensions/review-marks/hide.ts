import type { ExtensionChangeset } from "hunkdiff/extension"
import { isHidingReviewedFiles, isPathFullyReviewed } from "./store.ts"

/**
 * The changeset transform behind hiding fully reviewed files.
 *
 * Ported from `src/hide.ts` of evantravers/hunk-mark-as-reviewed (MIT, 8ca0c46).
 * There the toggle was a checkbox in its Review pane. Here `toggleHideReviewed`
 * refreshes so this transform runs again, and so does marking while hiding is
 * on, so a file leaves the review as soon as it is fully reviewed. Announcing
 * is the command's job; the transform stays silent.
 */

/** Drop fully reviewed files while hiding is on, unless that would leave nothing to review. */
export function hideFullyReviewedFiles(changeset: ExtensionChangeset): ExtensionChangeset {
  if (!isHidingReviewedFiles()) return changeset

  const kept = changeset.files.filter((file) => !isPathFullyReviewed(file.path))
  if (kept.length === 0 || kept.length === changeset.files.length) return changeset
  return { ...changeset, files: kept }
}
