import type { ExtensionCommandContext, HunkExtensionAPI } from "hunkdiff/extension"

/**
 * `+` and `_` step forward and back through three pane layouts, on LazyGit's
 * next and previous screen-mode keys:
 *
 * - split: the `files` pane open
 * - tree: the `tree` pane open
 * - review: neither open
 *
 * Both panes are named by fully qualified key in `[extension.pane-cycle]`, and
 * both keys are required. This file knows no other extension: a default would
 * be a guess at another extension's pane ids. Panes other than those two are
 * never touched.
 */

const LAYOUTS = ["split", "tree", "review"] as const
type Layout = (typeof LAYOUTS)[number]

interface PaneKeys {
  files: string
  tree: string
}

interface ConfigProblem {
  problem: string
}

/** A bare id would resolve to one of this extension's own panes, and it has none. */
const FULL_PANE_KEY = /^[^:]+:.+$/

/** Read one pane key from config, or say why it is unusable. */
function readPaneKey(config: Record<string, unknown>, name: keyof PaneKeys): string | ConfigProblem {
  const value = config[name]
  if (value === undefined) {
    return { problem: `Set ${name} under [extension.pane-cycle] to a pane key, "<extension>:<pane>"` }
  }
  if (typeof value !== "string" || !FULL_PANE_KEY.test(value)) {
    return {
      problem: `[extension.pane-cycle] ${name} = ${JSON.stringify(value)} is not a pane key, "<extension>:<pane>"`,
    }
  }
  return value
}

/**
 * Read both pane keys, or the first reason the pair is unusable.
 *
 * Only the shape is checked. Pane controls cannot list panes, and `isOpen`
 * answers false for an unregistered key just as for a closed pane, so a key
 * naming no pane surfaces as Hunk's own warning, which quotes the key. Every
 * step opens or closes both keys, so that warning appears on every press.
 */
function readPaneKeys(config: Record<string, unknown>): PaneKeys | ConfigProblem {
  const files = readPaneKey(config, "files")
  if (typeof files !== "string") return files
  const tree = readPaneKey(config, "tree")
  if (typeof tree !== "string") return tree
  if (files === tree) {
    return { problem: `[extension.pane-cycle] files and tree both name "${files}", but the layouts need two panes` }
  }
  return { files, tree }
}

/**
 * Read the layout from the panes on every press rather than remembering it:
 * `s` toggles the files pane without this extension, so a remembered layout
 * would drift. The tree is checked first: when `s` has opened files beside an
 * open tree, the tree still takes the rest of the body, so that mix counts as
 * tree.
 */
function currentLayout(ctx: ExtensionCommandContext, keys: PaneKeys): Layout {
  return ctx.panes.isOpen(keys.tree) ? "tree" : ctx.panes.isOpen(keys.files) ? "split" : "review"
}

/** The configured panes a layout shows; a step closes every other configured pane. */
function shownPanes(layout: Layout, keys: PaneKeys): readonly string[] {
  switch (layout) {
    case "split":
      return [keys.files]
    case "tree":
      return [keys.tree]
    case "review":
      return []
  }
}

/**
 * Move `offset` layouts along the cycle. Every read comes before any change:
 * pane controls commit on React's schedule, so a read after a change in the
 * same press would still see the old layout.
 */
function step(ctx: ExtensionCommandContext, keys: PaneKeys, offset: 1 | -1) {
  const from = LAYOUTS.indexOf(currentLayout(ctx, keys))
  const shown = shownPanes(LAYOUTS[(from + offset + LAYOUTS.length) % LAYOUTS.length]!, keys)
  for (const key of [keys.files, keys.tree]) {
    if (!shown.includes(key)) ctx.panes.close(key)
  }
  for (const key of shown) ctx.panes.open(key)
}

export default function (hunk: HunkExtensionAPI) {
  const keys = readPaneKeys(hunk.config)

  const cycle = (offset: 1 | -1) => (ctx: ExtensionCommandContext) => {
    // Reported on press rather than at startup: only these commands use the
    // keys, and a startup toast would interrupt every review, cycled or not.
    if ("problem" in keys) {
      ctx.notify(keys.problem, "warning")
      return
    }
    step(ctx, keys, offset)
  }

  hunk.registerCommand({ id: "next", title: "Next pane layout", key: "+" }, cycle(1))
  hunk.registerCommand({ id: "previous", title: "Previous pane layout", key: "_" }, cycle(-1))
}
