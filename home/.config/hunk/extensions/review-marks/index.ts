import type { ExtensionCommandContext, HunkExtensionAPI } from "hunkdiff/extension"
import { hideFullyReviewedFiles } from "./hide.ts"
import { resolveReviewedTone, reviewedHunkMarks } from "./highlights.ts"
import { findUnreviewedHunk } from "./navigation.ts"
import * as store from "./store.ts"

/**
 * Mark hunks and whole files reviewed, dim reviewed hunks in the diff, jump to
 * what is left, and optionally hide fully reviewed files.
 *
 * Ported from evantravers/hunk-mark-as-reviewed (MIT, 8ca0c46), without its
 * Review pane. That pane swapped places with Hunk's built-in files pane by key,
 * which reopened the stock pane beside files-pane. Progress goes out on the
 * extension event bus instead, and files-pane shows it on its own rows.
 *
 * `toggle` marks by focused panel, the way LazyGit stages: the whole file while
 * files-pane's tree has keyboard focus, the current hunk otherwise. It ships
 * without a key because Space, where it belongs, is a built-in page-down key;
 * binding it in `[keybindings]` takes Space over.
 *
 * Hiding works on whole files only. A file view could drop reviewed hunks from
 * a partly reviewed file, but file view rows paint a single syntax tone, so the
 * hunks left to review would lose their highlighting.
 */

const HIGHLIGHTER_ID = "reviewed"

/** Review progress for subscribers; files-pane reads it (`files-pane/reviewStatus.ts`). */
const STATUS_EVENT = "review-marks:status"

/** The file tree's keyboard focus, from files-pane (`files-pane/treeFocus.ts`). */
const TREE_FOCUS_EVENT = "files-pane:tree-focus"

export default function (hunk: HunkExtensionAPI) {
  const tone = resolveReviewedTone(hunk.config.reviewedTone)
  store.setHidingReviewedFiles(hunk.config.hideReviewedFiles === true)
  let treeFocused = false

  /** Publish which loaded paths are fully and which are partly reviewed. */
  const publishStatus = () => {
    const done: string[] = []
    const partial: string[] = []
    for (const file of store.getLatestFiles()) {
      const progress = store.fileProgress(file)
      if (progress.reviewed === progress.total) done.push(file.path)
      else if (progress.reviewed > 0) partial.push(file.path)
    }
    hunk.events.emit(STATUS_EVENT, { done, partial })
  }

  /** After marks change while reviewed files are hidden, reload so the hide transform applies. */
  const reapplyHiding = (ctx: ExtensionCommandContext) => {
    if (store.isHidingReviewedFiles()) ctx.commands.execute("hunk.app.refresh")
  }

  hunk.on("changeset_loaded", ({ changeset }, ctx) => {
    store.noteFiles(changeset.files)
    const dropped = store.reconcile(changeset.files)
    if (dropped > 0) {
      ctx.notify(
        `${dropped} reviewed ${dropped === 1 ? "mark no longer matches" : "marks no longer match"} the diff`,
        "warning",
      )
    }
    publishStatus()
  })

  hunk.events.on<{ focused: boolean }>(TREE_FOCUS_EVENT, ({ focused }) => {
    treeFocused = focused
  })

  /** Toggle the selected hunk, when there is one. */
  const toggleSelectedHunk = (ctx: ExtensionCommandContext) => {
    const { file, hunkIndex } = ctx.selection
    const selected = file?.hunks?.find((candidate) => candidate.index === hunkIndex)
    if (!file || !selected) {
      ctx.notify("No hunk selected", "warning")
      return
    }

    const nowReviewed = store.toggleHunk(file.path, selected)
    ctx.highlights.refresh(HIGHLIGHTER_ID, { fileId: file.id })
    publishStatus()
    const progress = store.fileProgress(file)
    ctx.notify(
      `${nowReviewed ? "Hunk reviewed" : "Hunk unreviewed"} (${progress.reviewed}/${progress.total} in ${file.path})`,
    )
    reapplyHiding(ctx)
  }

  /** Toggle every hunk of the selected file, or the file itself when it has none. */
  const toggleSelectedFile = (ctx: ExtensionCommandContext) => {
    const { file } = ctx.selection
    if (!file) {
      ctx.notify("No file selected", "warning")
      return
    }

    const nowReviewed = store.toggleFile(file)
    ctx.highlights.refresh(HIGHLIGHTER_ID, { fileId: file.id })
    publishStatus()
    ctx.notify(`${nowReviewed ? "File reviewed" : "File unreviewed"}: ${file.path}`)
    reapplyHiding(ctx)
  }

  hunk.registerCommand(
    { id: "toggleHunk", title: "Toggle hunk reviewed", key: "x" },
    toggleSelectedHunk,
  )
  hunk.registerCommand(
    { id: "toggleFile", title: "Toggle file reviewed", key: "X" },
    toggleSelectedFile,
  )
  hunk.registerCommand(
    { id: "toggle", title: "Toggle reviewed: file when the tree has focus, else hunk" },
    (ctx) => {
      // A hunk-less file (binary, skipped) has only the file to mark.
      if (treeFocused || !ctx.selection.file?.hunks?.length) toggleSelectedFile(ctx)
      else toggleSelectedHunk(ctx)
    },
  )

  hunk.registerCommand({ id: "reset", title: "Clear all reviewed marks" }, (ctx) => {
    store.resetReviewed()
    ctx.highlights.refresh(HIGHLIGHTER_ID)
    publishStatus()
    ctx.notify("Cleared all reviewed marks")
    reapplyHiding(ctx)
  })

  const jumpToUnreviewed = (direction: 1 | -1) => (ctx: ExtensionCommandContext) => {
    const target = findUnreviewedHunk(
      store.getLatestFiles(),
      { fileId: ctx.selection.file?.id ?? null, hunkIndex: ctx.selection.hunkIndex },
      direction,
      store.isHunkReviewed,
    )
    if (!target) {
      ctx.notify("All hunks reviewed 🎉")
      return
    }
    ctx.navigation.selectHunk(target.fileId, target.hunkIndex)
  }
  hunk.registerCommand(
    { id: "nextUnreviewed", title: "Next unreviewed hunk", key: ">" },
    jumpToUnreviewed(1),
  )
  hunk.registerCommand(
    { id: "previousUnreviewed", title: "Previous unreviewed hunk", key: "<" },
    jumpToUnreviewed(-1),
  )

  hunk.registerCommand(
    { id: "toggleHideReviewed", title: "Toggle hiding fully reviewed files", key: "H" },
    (ctx) => {
      const hide = !store.isHidingReviewedFiles()
      const files = store.getLatestFiles()
      const reviewedCount = files.filter((file) => store.isPathFullyReviewed(file.path)).length

      store.setHidingReviewedFiles(hide)
      if (!ctx.commands.execute("hunk.app.refresh")) {
        store.setHidingReviewedFiles(!hide)
        ctx.notify("This review cannot refresh, so reviewed files cannot be hidden", "warning")
        return
      }

      if (!hide) ctx.notify("Showing reviewed files")
      else if (reviewedCount === 0) ctx.notify("Hiding reviewed files (none yet)")
      else if (reviewedCount === files.length) ctx.notify("All files reviewed — nothing hidden")
      else ctx.notify(`Hiding ${reviewedCount} reviewed ${reviewedCount === 1 ? "file" : "files"}`)
    },
  )

  hunk.transformChangeset((changeset) => hideFullyReviewedFiles(changeset))

  hunk.registerLineHighlighter({
    id: HIGHLIGHTER_ID,
    highlight({ file }) {
      const reviewedHunks = store
        .hunksFor(file)
        .filter((candidate) => store.isHunkReviewed(file.path, candidate))
      return reviewedHunkMarks(file, reviewedHunks, tone)
    },
  })
}
