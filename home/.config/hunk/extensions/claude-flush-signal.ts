import { createHash } from "node:crypto"
import { writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import type { HunkExtensionAPI } from "hunkdiff/extension"

/**
 * `F` drops a sentinel file that a watching Claude Code session picks up, which
 * makes it pull the review's open notes and answer them in place.
 *
 * Why a sentinel rather than a direct send: Hunk is pull-only and Claude Code
 * exposes no way to inject into a running interactive session, so nothing here
 * can reach a live chat directly. A file both sides agree on is the smallest
 * thing that works, and it carries intent — polling Hunk would fire on every
 * note, while this fires only when you ask.
 *
 * Path is derived from the repo root so several worktrees can each have their
 * own watcher, and lives in the temp dir so it never dirties a working tree.
 * The watcher deletes it after acting; pressing again re-arms.
 */
const sentinelFor = (repoRoot: string) =>
  join(tmpdir(), `claude-hunk-flush-${createHash("sha1").update(repoRoot).digest("hex").slice(0, 12)}`)

export default function (hunk: HunkExtensionAPI) {
  let repoRoot = ""

  hunk.on("startup", (_event, ctx) => {
    repoRoot = ctx.cwd
  })

  hunk.registerCommand(
    { id: "flush", title: "Send review notes to Claude Code", key: "F" },
    (ctx) => {
      const root = repoRoot || ctx.cwd
      const path = sentinelFor(root)
      try {
        writeFileSync(path, `${root}\n${new Date().toISOString()}\n`, "utf8")
        ctx.notify("Signalled Claude Code — it will pull the open notes")
      } catch (error) {
        ctx.notify(`Could not write the signal: ${String(error)}`, "error")
      }
    },
  )
}
