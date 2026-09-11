/**
 * Whether the file tree has keyboard focus, which is while the `tree` keyboard
 * mode is active.
 *
 * Hunk has one keyboard focus, the review, so the tree's focus is this pane's
 * own. It is published on the extension event bus so other extensions can act
 * on the focused panel the way LazyGit's panels do: review-marks marks the
 * whole file on Space while the tree has focus, and the current hunk otherwise.
 */

export const TREE_FOCUS_EVENT = "files-pane:tree-focus"

export interface TreeFocusPayload {
  focused: boolean
}

let focused = false
const listeners = new Set<() => void>()

/** Record the tree's focus and notify mounted panes. */
export function setTreeFocused(next: boolean) {
  if (focused === next) return
  focused = next
  for (const listener of listeners) listener()
}

export function subscribeTreeFocus(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function isTreeFocused() {
  return focused
}
