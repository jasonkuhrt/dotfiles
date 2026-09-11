import { matchesKey, type HunkExtensionAPI } from "hunkdiff/extension"
import { sidebarPreferredWidth } from "./FileListItem.tsx"
import { FlexFileSidebar } from "./FileSidebars.tsx"
import {
  publishReviewStatus,
  REVIEW_STATUS_EVENT,
  type ReviewStatusPayload,
} from "./reviewStatus.ts"
import { setTreeFocused, TREE_FOCUS_EVENT, type TreeFocusPayload } from "./treeFocus.ts"

/**
 * Hunk's stock files pane with two changes: rows never clamp their text, and
 * rows carry no `+adds` / `-dels` counts. The agent-note badge (`*N`) stays.
 *
 * Rows stay one line, as in stock. Instead of clamping, `files` asks for
 * stock's width grown just enough to fit its widest row, so wherever stock
 * already fits, this pane is identical to it. It is registered in the stock
 * pane's `hunk:files` role, so `s` and View → Files pane toggle it just as they
 * did the stock one.
 *
 * `tree` mounts the same component as a top pane for a layout command to open
 * in place of `files` (the pane-cycle extension does, by key). A top pane spans
 * the full width, and a height fraction of 1 takes every row the planner gives
 * up: it always keeps 5 rows of review stream, so the tree comes close to full
 * screen but never reaches it. It claims no `replaces` slot, since a
 * replacement starts open and demotes its target, and it is not resizable,
 * since a divider drag would pin its height instead of following the terminal.
 *
 * When the review-marks extension publishes review progress, rows show it: a
 * fully reviewed file's name recedes and gains a check, a partly reviewed file
 * gains a half-circle.
 *
 * `h` gives the tree keyboard focus, LazyGit style: `j` / `k` move between
 * files, and `l`, Enter, or Escape hand focus back to the review. The selected
 * row takes the theme's selection color while the tree has focus.
 */

const BUILT_IN_FILES_PANE = "hunk:files"

/**
 * Hunk pads its body by this many columns outside pager sessions
 * (`BODY_PADDING`, `packages/hunk/src/ui/App.tsx`, 0.22.0). Pager sessions pad
 * by 0, which extensions cannot observe; there the request can differ from
 * stock by a column.
 */
const BODY_PADDING = 2

export default function (hunk: HunkExtensionAPI) {
  hunk.registerPane({
    id: "files",
    title: "Files",
    placement: "left",
    // Stock asks for `{ preferred: 34, min: 22, max: 56, fraction: 0.16 }`. The
    // preferred size computes that same width and grows it past the 56 cap only
    // when rows would clamp. The host re-asks when the review's files or
    // selection change, not on a bare terminal resize, and a divider drag still
    // overrides the request.
    width: { preferred: 34, min: 22 },
    preferredSize: ({ files }) =>
      sidebarPreferredWidth(files, Math.max(0, (process.stdout.columns ?? 0) - BODY_PADDING)),
    replaces: BUILT_IN_FILES_PANE,
    component: FlexFileSidebar,
  })

  hunk.registerPane({
    id: "tree",
    title: "Files (tree)",
    placement: "top",
    // `fraction` sizes it on every host the manifest admits; `preferred` is the
    // contract's fallback for hosts that predate fractional sizing.
    height: { preferred: 24, min: 3, fraction: 1 },
    resizable: false,
    component: FlexFileSidebar,
  })

  hunk.events.on<ReviewStatusPayload>(REVIEW_STATUS_EVENT, (payload) => {
    publishReviewStatus(payload)
  })

  /** Record the tree's focus for this pane and announce it to other extensions. */
  const publishTreeFocus = (focused: boolean) => {
    setTreeFocused(focused)
    hunk.events.emit<TreeFocusPayload>(TREE_FOCUS_EVENT, { focused })
  }

  hunk.registerKeyboardMode({
    id: "tree",
    title: "Files",
    onEnter: () => publishTreeFocus(true),
    onExit: () => publishTreeFocus(false),
    onKey: (key, ctx) => {
      if (matchesKey("j", key) || matchesKey("down", key)) {
        ctx.commands.execute("hunk.review.nextFile")
        return "handled"
      }
      if (matchesKey("k", key) || matchesKey("up", key)) {
        ctx.commands.execute("hunk.review.previousFile")
        return "handled"
      }
      if (matchesKey("l", key) || matchesKey("enter", key)) return "exit"
      if (matchesKey("h", key)) return "handled"
      // Everything else, Space included, still reaches the command table.
      return "pass"
    },
  })

  hunk.registerCommand({ id: "focusTree", title: "Focus the file tree", key: "h" }, (ctx) => {
    ctx.keyboardModes.enterMode("tree")
  })
}
