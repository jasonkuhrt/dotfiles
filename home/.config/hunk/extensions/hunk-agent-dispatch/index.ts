import { spawn } from "node:child_process"
import type { HunkExtensionAPI } from "hunkdiff/extension"

/**
 * Saved review notes go to Codex without leaving the review.
 *
 * Replaces the polling `hunk-agent-watch` script: `note_created` is the host's
 * own signal, so there is no timer, no snapshot hashing, and no process that
 * can outlive the session.
 */

/** `hunk.config` merges the reviewed repo's table over the user's, so a repo under
 *  review can set these. Nothing here may reach exec as a binary path or shell
 *  string — the transport is matched against this literal set, and CODEX_BIN is
 *  never configurable. */
const TRANSPORTS = ["desktop", "exec", "print"] as const
type Transport = (typeof TRANSPORTS)[number]

const CODEX_BIN = "codex"
const DEFAULT_DEBOUNCE_MS = 10_000

interface SavedNote {
  id: string
  filePath: string
  hunkIndex: number
  side: string
  line: number
  body: string
  draft: boolean
}

/** Shutdown gives handlers 250ms, far less than a Codex round trip, so the last
 *  batch leaves as a child that outlives Hunk rather than being dropped. */
const runDetached = (command: string, args: string[], cwd: string): void => {
  const child = spawn(command, args, { cwd, stdio: "ignore", detached: true })
  child.unref()
}

const run = (command: string, args: string[], cwd: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: ["ignore", "pipe", "pipe"] })
    let stdout = ""
    let stderr = ""
    child.stdout.on("data", (chunk) => (stdout += String(chunk)))
    child.stderr.on("data", (chunk) => (stderr += String(chunk)))
    child.on("error", reject)
    child.on("close", (code) =>
      code === 0 ? resolve(stdout.trim()) : reject(new Error(stderr.trim() || `${command} exited ${code}`)),
    )
  })

const buildPrompt = (repoRoot: string, notes: SavedNote[]): string => {
  const rendered = notes
    .map((note) => `- ${note.filePath}:${note.line} (${note.side} side, hunk ${note.hunkIndex + 1})\n  ${note.body}`)
    .join("\n")

  return `A Hunk reviewer saved ${notes.length === 1 ? "a review note" : `${notes.length} review notes`} for this repo:
${repoRoot}

${rendered}

Use the hunk-review skill against the live session for this repo. Read the diff those notes anchor to:

  hunk session context --repo "${repoRoot}" --json
  hunk session review --repo "${repoRoot}" --json --include-notes

Then address each note. If a note asks for a code change, implement it in the repo, preserve unrelated changes, and verify narrowly. If a note asks a question, answer it by adding an agent note in Hunk on the file and line it targets:

  hunk session comment add --repo "${repoRoot}" --file <path> --new-line <n> --summary <text>`
}

export default function (hunk: HunkExtensionAPI) {
  const config = hunk.config as Record<string, unknown>

  const enabled = config.enabled !== false
  const requested = String(config.transport ?? "desktop")
  const transport: Transport = (TRANSPORTS as readonly string[]).includes(requested)
    ? (requested as Transport)
    : "desktop" // an unknown value is repo-supplied noise, not an instruction
  const debounceMs = Number.isFinite(Number(config.debounceMs))
    ? Math.max(0, Number(config.debounceMs))
    : DEFAULT_DEBOUNCE_MS

  /** Notes accumulate here because event handlers get no `ctx.review`: `snapshot()`
   *  is command-time only, so the payloads are the whole record we ever see. */
  const pending = new Map<string, SavedNote>()
  let timer: ReturnType<typeof setTimeout> | undefined
  let repoRoot: string | undefined

  hunk.on("startup", async (_event, ctx) => {
    try {
      repoRoot = await run("git", ["rev-parse", "--show-toplevel"], ctx.cwd)
    } catch {
      repoRoot = ctx.cwd
    }
    hunk.log(`agent dispatch armed: transport=${transport} root=${repoRoot} enabled=${enabled}`)
  })

  const flush = async (ctx: { cwd: string; notify: (message: string, type?: string) => void }) => {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }

    const batch = [...pending.values()]
    pending.clear()
    if (batch.length === 0) {
      ctx.notify("No unsent review notes")
      return
    }

    const root = repoRoot ?? ctx.cwd
    const prompt = buildPrompt(root, batch)
    const label = batch.length === 1 ? "1 note" : `${batch.length} notes`

    if (transport === "print") {
      hunk.log(prompt)
      ctx.notify(`Logged ${label} (transport=print)`)
      return
    }

    try {
      if (transport === "desktop") {
        await run(CODEX_BIN, ["remote-control", "start", "--json"], root)
        await run(CODEX_BIN, ["debug", "app-server", "send-message-v2", prompt], root)
      } else {
        await run(CODEX_BIN, ["exec", "-C", root, "--dangerously-bypass-approvals-and-sandbox", prompt], root)
      }
      ctx.notify(`Sent ${label} to Codex`)
    } catch (error) {
      hunk.log(`dispatch failed: ${String(error)}`)
      ctx.notify(`Codex dispatch failed: ${String(error)}`, "error")
    }
  }

  hunk.registerCommand({ id: "send", title: "Send review notes to Codex" }, async (ctx) => {
    await flush(ctx)
  })

  hunk.on("note_created", (event, ctx) => {
    if (!enabled) return

    const note = event.note as SavedNote | undefined
    if (!note || note.draft) return

    pending.set(note.id, note)

    // Restarted on every save, so a burst of notes leaves as one message.
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => void flush(ctx), debounceMs)
  })

  hunk.on("shutdown", () => {
    if (timer) clearTimeout(timer)

    const batch = [...pending.values()]
    pending.clear()
    if (batch.length === 0 || transport === "print") return

    const root = repoRoot ?? process.cwd()
    const prompt = buildPrompt(root, batch)

    // `remote-control start` is warm-up only; the send alone carries the batch.
    if (transport === "desktop") {
      runDetached(CODEX_BIN, ["debug", "app-server", "send-message-v2", prompt], root)
    } else {
      runDetached(CODEX_BIN, ["exec", "-C", root, "--dangerously-bypass-approvals-and-sandbox", prompt], root)
    }
  })
}
