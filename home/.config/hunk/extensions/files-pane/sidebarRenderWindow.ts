import type { SidebarEntry } from "./files.ts"

/**
 * Sparse render plan for the sidebar scrollbox: mount the rows near the
 * viewport plus the selected file, and stand in for every other run with a
 * spacer of its exact height.
 *
 * Mirrors Hunk's `packages/hunk/src/ui/lib/sidebarRenderWindow.ts` (0.22.0),
 * trimmed to the items the pane reads.
 */

export type SidebarRenderWindowItem =
  | { kind: "entry"; entry: SidebarEntry; entryIndex: number }
  | { kind: "spacer"; key: string; height: number }

/** Build a sparse sidebar render plan that preserves exact scroll height with spacers. */
export function buildSidebarRenderWindow({
  entries,
  estimatedViewportRows,
  overscanRows,
  scrollTop,
  selectedFileId,
  viewportHeight,
}: {
  entries: readonly SidebarEntry[]
  estimatedViewportRows: number
  overscanRows: number
  scrollTop: number
  selectedFileId: string | null
  viewportHeight: number
}): SidebarRenderWindowItem[] {
  const mounted = new Set<number>()
  const viewport =
    viewportHeight > 0 ? viewportHeight : Math.max(0, Math.floor(estimatedViewportRows))
  const top = Math.max(0, scrollTop)

  if (entries.length > 0 && viewport > 0 && top < entries.length) {
    const start = Math.min(entries.length - 1, Math.floor(top))
    const end = Math.min(entries.length - 1, Math.max(start, Math.ceil(top + viewport) - 1))
    const last = Math.min(entries.length - 1, end + overscanRows)
    for (let index = Math.max(0, start - overscanRows); index <= last; index += 1) {
      mounted.add(index)
    }
  }

  if (selectedFileId) {
    const selectedIndex = entries.findIndex(
      (entry) => entry.kind === "file" && entry.id === selectedFileId,
    )
    if (selectedIndex >= 0) {
      mounted.add(selectedIndex)
    }
  }

  const items: SidebarRenderWindowItem[] = []
  let cursor = 0

  /** Represent the unmounted rows from the cursor up to (not including) one index. */
  const pushSpacer = (endIndex: number) => {
    if (endIndex > cursor) {
      items.push({
        kind: "spacer",
        key: `sidebar-spacer:${cursor}:${endIndex - 1}`,
        height: endIndex - cursor,
      })
    }
  }

  for (const index of [...mounted].sort((left, right) => left - right)) {
    pushSpacer(index)
    items.push({ kind: "entry", entry: entries[index]!, entryIndex: index })
    cursor = index + 1
  }
  pushSpacer(entries.length)

  return items
}
