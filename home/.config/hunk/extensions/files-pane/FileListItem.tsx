import { MouseButton, type MouseEvent as TuiMouseEvent } from "@opentui/core"
import { memo } from "react"
import type { ExtensionDiffFile, ExtensionPaneTheme } from "hunkdiff/extension"
import {
  buildFlatSidebarEntries,
  buildTreeSidebarEntries,
  resolveFileSidebarMode,
  TREE_FILE_SIDEBAR_MIN_CONTENT_WIDTH,
  type FileDirectoryEntry,
  type FileGroupEntry,
  type FileListEntry,
  type SidebarEntry,
} from "./files.ts"
import type { ReviewStatus } from "./reviewStatus.ts"
import { fitText, measureTextWidth, padText } from "./text.ts"

/**
 * Sidebar rows and their geometry.
 *
 * Mirrors Hunk's `packages/hunk/src/ui/components/panes/FileListItem.tsx`
 * (0.22.0): one line per row, clamped with an overflow marker exactly as stock
 * does. Four deltas:
 *
 * - The file badge lane holds only the agent-note count (`*N`); `+adds` and
 *   `-dels` are gone.
 * - `sidebarPreferredWidth` is the width the pane requests: stock's own width,
 *   grown just enough that no row needs the clamp. The clamp only shows when
 *   the terminal or a divider drag leaves the pane narrower than that.
 * - Review progress from review-marks renders in the row's trailing padding,
 *   so no width changes with it: a fully reviewed file's name recedes to the
 *   muted color beside a `✓`, and a partly reviewed file gets a `◐`.
 * - While the tree has keyboard focus, the selected row takes the theme's
 *   selection color instead of the plain highlight.
 */

const RAIL_MARKER = "▌"
const REVIEWED_MARKER = "✓"
const PARTLY_REVIEWED_MARKER = "◐"
const GUTTER_WIDTH = 1 // the selection rail column
const DISCLOSURE_WIDTH = 2
const ICON_WIDTH = 2 // status letter + space

/** Pane columns outside the row text: one column of row highlight plus row padding. */
const PANE_CHROME_WIDTH = 2

/** Stock's width request, from Hunk's `extensions/default/ui/sidebar/index.tsx` (0.22.0). */
const STOCK_WIDTH_MIN = 22
const STOCK_WIDTH_MAX = 56
const STOCK_WIDTH_FRACTION = 0.16

/** Row text width inside a pane of `width` columns. */
export function sidebarTextWidth(width: number) {
  return Math.max(8, width - PANE_CHROME_WIDTH)
}

/** Width of the badge lane every file row reserves: the widest note count among the entries. */
export function sidebarStatsWidth(entries: readonly SidebarEntry[]) {
  return entries.reduce(
    (width, entry) =>
      entry.kind === "file" && entry.agentCommentsText
        ? Math.max(width, entry.agentCommentsText.length)
        : width,
    0,
  )
}

/** The badge lane plus its separating column, or nothing when no row has a badge. */
function statsSectionWidthFor(statsWidth: number) {
  return statsWidth > 0 ? statsWidth + 1 : 0
}

/** The file count a collapsed directory row shows. */
function collapsedCountText(entry: FileDirectoryEntry) {
  return `${entry.descendantFileCount} ${entry.descendantFileCount === 1 ? "file" : "files"}`
}

/** Clamp hierarchy indentation so a row always retains space for its visible label. */
function fileSidebarIndentWidth(depth: number, textWidth: number, reservedWidth: number) {
  return Math.min(Math.max(0, depth) * 2, Math.max(0, textWidth - reservedWidth - 1))
}

/** Pane width at which every row of the flat projection fits unclamped. */
function flatFitWidth(files: readonly ExtensionDiffFile[]) {
  const entries = buildFlatSidebarEntries(files)
  const statsSectionWidth = statsSectionWidthFor(sidebarStatsWidth(entries))
  let textWidth = 0
  for (const entry of entries) {
    if (entry.kind === "group") {
      textWidth = Math.max(textWidth, measureTextWidth(entry.label))
    } else if (entry.kind === "file") {
      textWidth = Math.max(
        textWidth,
        GUTTER_WIDTH + ICON_WIDTH + statsSectionWidth + measureTextWidth(entry.name),
      )
    }
  }
  return textWidth + PANE_CHROME_WIDTH
}

/**
 * Pane width at which every row of the tree projection fits unclamped, and
 * never below the width the tree projection needs. Directories are measured
 * with their collapsed file count, so collapsing one never clamps its label.
 */
function treeFitWidth(files: readonly ExtensionDiffFile[]) {
  const entries = buildTreeSidebarEntries(files)
  const statsSectionWidth = statsSectionWidthFor(sidebarStatsWidth(entries))
  let textWidth = TREE_FILE_SIDEBAR_MIN_CONTENT_WIDTH
  for (const entry of entries) {
    if (entry.kind === "file") {
      textWidth = Math.max(
        textWidth,
        GUTTER_WIDTH +
          ICON_WIDTH +
          statsSectionWidth +
          entry.depth * 2 +
          measureTextWidth(entry.name),
      )
    } else if (entry.kind === "directory") {
      const trailingWidth = Math.max(statsSectionWidth, collapsedCountText(entry).length + 1)
      textWidth = Math.max(
        textWidth,
        GUTTER_WIDTH +
          DISCLOSURE_WIDTH +
          trailingWidth +
          entry.depth * 2 +
          measureTextWidth(entry.label),
      )
    }
  }
  return textWidth + PANE_CHROME_WIDTH
}

const fitWidthsByFiles = new WeakMap<
  readonly ExtensionDiffFile[],
  { flat: number; tree: number }
>()

/** Both projections' fit widths, computed once per changeset view. */
function fitWidths(files: readonly ExtensionDiffFile[]) {
  let widths = fitWidthsByFiles.get(files)
  if (!widths) {
    widths = { flat: flatFitWidth(files), tree: treeFitWidth(files) }
    fitWidthsByFiles.set(files, widths)
  }
  return widths
}

/**
 * The pane width to request for a host body `bodyWidth` columns wide.
 *
 * Starts from the width stock requests there. When the projection stock shows
 * at that width already fits, the result is stock's width, so the pane matches
 * stock exactly. Otherwise it grows only as far as needed: a flat projection
 * that fits below the tree breakpoint stays flat, and anything wider renders as
 * a tree, since that is what stock shows at those widths.
 */
export function sidebarPreferredWidth(files: readonly ExtensionDiffFile[], bodyWidth: number) {
  const stockWidth = Math.min(
    Math.max(Math.round(bodyWidth * STOCK_WIDTH_FRACTION), STOCK_WIDTH_MIN),
    STOCK_WIDTH_MAX,
  )
  const { flat, tree } = fitWidths(files)

  if (resolveFileSidebarMode(sidebarTextWidth(stockWidth)) === "flat") {
    if (flat <= stockWidth) {
      return stockWidth
    }
    if (resolveFileSidebarMode(sidebarTextWidth(flat)) === "flat") {
      return flat
    }
  }

  return Math.max(stockWidth, tree)
}

type FileStateColor = "fileUntracked" | "fileNew" | "fileDeleted" | "fileRenamed" | "fileModified"

/** Git status letter and theme color token for one file row. */
function fileState(entry: FileListEntry): { icon: string; color: FileStateColor } {
  if (entry.isUntracked) {
    return { icon: "?", color: "fileUntracked" }
  }

  switch (entry.changeType) {
    case "new":
      return { icon: "A", color: "fileNew" }
    case "deleted":
      return { icon: "D", color: "fileDeleted" }
    case "rename-pure":
    case "rename-changed":
      return { icon: "R", color: "fileRenamed" }
    case "change":
      return { icon: "M", color: "fileModified" }
  }
}

/** Render one folder header in the navigation sidebar. */
export function FileGroupHeader({
  entry,
  paddingLeft,
  textWidth,
  theme,
}: {
  entry: FileGroupEntry
  paddingLeft: number
  textWidth: number
  theme: ExtensionPaneTheme
}) {
  return (
    <box
      style={{
        width: "100%",
        height: 1,
        paddingLeft,
        backgroundColor: theme.panel,
      }}
    >
      <text fg={theme.muted}>{fitText(entry.label, Math.max(1, textWidth))}</text>
    </box>
  )
}

/** Render one mouse-toggleable directory row in the navigation sidebar. */
export function FileDirectoryRow({
  collapsed,
  entry,
  onToggleDirectory,
  paddingLeft,
  statsWidth,
  textWidth,
  theme,
}: {
  collapsed: boolean
  entry: FileDirectoryEntry
  onToggleDirectory: (path: string) => void
  paddingLeft: number
  statsWidth: number
  textWidth: number
  theme: ExtensionPaneTheme
}) {
  const statsSectionWidth = statsSectionWidthFor(statsWidth)
  const countText = collapsed ? collapsedCountText(entry) : null
  const trailingWidth = countText ? Math.max(statsSectionWidth, countText.length + 1) : 0
  const indentWidth = fileSidebarIndentWidth(
    entry.depth,
    textWidth,
    DISCLOSURE_WIDTH + trailingWidth + 1,
  )
  const labelWidth = Math.max(
    1,
    textWidth - GUTTER_WIDTH - DISCLOSURE_WIDTH - trailingWidth - indentWidth,
  )

  return (
    <box
      style={{
        width: "100%",
        height: 1,
        flexDirection: "row",
        backgroundColor: theme.panel,
      }}
      onMouseUp={(event: TuiMouseEvent) => {
        if (event.button === MouseButton.LEFT) {
          onToggleDirectory(entry.path)
        }
      }}
    >
      <box style={{ width: GUTTER_WIDTH, height: 1, backgroundColor: theme.panel }} />
      <box
        style={{
          flexGrow: 1,
          height: 1,
          paddingLeft: paddingLeft + indentWidth,
          flexDirection: "row",
          backgroundColor: theme.panel,
        }}
      >
        <text fg={theme.muted}>{collapsed ? "› " : "⌄ "}</text>
        <text fg={theme.muted}>{padText(fitText(entry.label, labelWidth), labelWidth)}</text>
        {countText && (
          <box
            style={{
              width: trailingWidth,
              height: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
              backgroundColor: theme.panel,
            }}
          >
            <text fg={theme.muted}>{countText}</text>
          </box>
        )}
      </box>
    </box>
  )
}

/** Render one file row in the navigation sidebar. */
export const FileListItem = memo(function FileListItem({
  entry,
  focused,
  paddingLeft,
  review,
  selected,
  statsWidth,
  textWidth,
  theme,
  onSelectFile,
}: {
  entry: FileListEntry
  /** Whether the tree has keyboard focus. */
  focused: boolean
  paddingLeft: number
  review: ReviewStatus | undefined
  selected: boolean
  statsWidth: number
  textWidth: number
  theme: ExtensionPaneTheme
  onSelectFile: (fileId: string) => void
}) {
  const rowBackground = selected ? (focused ? theme.selectedHunk : theme.panelAlt) : theme.panel
  const { color, icon } = fileState(entry)
  const statsSectionWidth = statsSectionWidthFor(statsWidth)
  const indentWidth = fileSidebarIndentWidth(
    entry.depth,
    textWidth,
    ICON_WIDTH + statsSectionWidth + 1,
  )
  const nameWidth = Math.max(
    1,
    textWidth - GUTTER_WIDTH - ICON_WIDTH - statsSectionWidth - indentWidth,
  )
  // The chrome columns the row's left padding leaves unused, at its right edge.
  const trailingPaddingWidth = PANE_CHROME_WIDTH - paddingLeft

  return (
    <box
      style={{
        width: "100%",
        height: 1,
        backgroundColor: rowBackground,
        flexDirection: "row",
      }}
      onMouseUp={() => onSelectFile(entry.id)}
    >
      <text fg={selected ? theme.accent : rowBackground} bg={rowBackground}>
        {selected ? RAIL_MARKER : " "}
      </text>
      <box
        style={{
          flexGrow: 1,
          height: 1,
          paddingLeft: paddingLeft + indentWidth,
          flexDirection: "row",
          backgroundColor: rowBackground,
        }}
      >
        <text fg={theme[color]}>{icon} </text>
        <text fg={review === "done" ? theme.muted : theme.text}>
          {padText(fitText(entry.name, nameWidth, "…"), nameWidth)}
        </text>
        {statsSectionWidth > 0 && (
          <box
            style={{
              width: statsSectionWidth,
              height: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
              backgroundColor: rowBackground,
            }}
          >
            {entry.agentCommentsText && (
              <text fg={theme.noteBorder}>{entry.agentCommentsText}</text>
            )}
          </box>
        )}
        {review && trailingPaddingWidth > 0 && (
          <box
            style={{
              width: trailingPaddingWidth,
              height: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
              backgroundColor: rowBackground,
            }}
          >
            <text fg={review === "done" ? theme.badgeAdded : theme.accent}>
              {review === "done" ? REVIEWED_MARKER : PARTLY_REVIEWED_MARKER}
            </text>
          </box>
        )}
      </box>
    </box>
  )
})
