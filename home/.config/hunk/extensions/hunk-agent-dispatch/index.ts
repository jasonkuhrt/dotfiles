import { spawn } from "node:child_process"
import type { HunkExtensionAPI } from "hunkdiff/extension"

/**
 * Saved review notes go to Codex without leaving the review.
 *
 * Replaces the polling `hunk-agent-watch` script: `note_created` is the host's
 * own signal, so there is no timer, no snapshot hashing, and no process that
 * can outlive the session.
 *
 * `A` opens the guide, which doubles as the queue: it names the keys, the
 * transport, and every note still waiting to leave. Nothing here imports
 * `react` or `@opentui/*` — those do not resolve from an extension directory
 * without its own node_modules, so a dialog carries the UI instead of a pane.
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
  fileId: string
  filePath: string
  hunkIndex: number
  side: "old" | "new"
  line: number
  body: string
  draft: boolean
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

/** Shutdown gives handlers 250ms, far less than a Codex round trip, so the last
 *  batch leaves as a child that outlives Hunk rather than being dropped. */
const runDetached = (command: string, args: string[], cwd: string): void => {
  const child = spawn(command, args, { cwd, stdio: "ignore", detached: true })
  child.unref()
}

const buildPrompt = (repoRoot: string, notes: readonly SavedNote[]): string => {
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

  // Opt-in: an absent or non-true value means off, so a repo that ships no
  // table cannot dispatch, and a broken transport cannot fire by default.
  const enabled = config.enabled === true
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
  let repoRoot = ""
  let status = "nothing sent yet"

  hunk.on("startup", async (_event, ctx) => {
    repoRoot = ctx.cwd
    try {
      repoRoot = await run("git", ["rev-parse", "--show-toplevel"], ctx.cwd)
    } catch {
      // A non-Git review still dispatches; the cwd is the best root available.
    }
    hunk.log(`armed: transport=${transport} root=${repoRoot} enabled=${enabled}`)
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

    const root = repoRoot || ctx.cwd
    const prompt = buildPrompt(root, batch)
    const label = batch.length === 1 ? "1 note" : `${batch.length} notes`

    if (transport === "print") {
      hunk.log(prompt)
      status = `logged ${label}`
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
      status = `sent ${label}`
      ctx.notify(`Sent ${label} to Codex`)
    } catch (error) {
      status = `FAILED: ${String(error)}`
      hunk.log(`dispatch failed: ${String(error)}`)
      ctx.notify(`Codex dispatch failed: ${String(error)}`, "error")
    }
  }

  hunk.registerCommand({ id: "send", title: "Send review notes to Codex", key: "S" }, async (ctx) => {
    if (!enabled) {
      ctx.notify(
        'Agent dispatch is off. Set enabled = true under [extension.hunk-agent-dispatch] to turn it on.',
      )
      return
    }
    await flush(ctx)
  })

  hunk.registerCommand({ id: "guide", title: "Agent dispatch: guide and queue", key: "A" }, async (ctx) => {
    const queued = [...pending.values()]
    const idleSeconds = Math.round(debounceMs / 1000)

    const SEND_NOW = "S — send the queue to Codex now"
    const guide = [
      SEND_NOW,
      `c then Ctrl+S queues a note; the queue leaves after ${idleSeconds}s idle`,
      `q before it leaves still sends — the queue flushes on shutdown`,
      `transport ${transport}${enabled ? "" : " (disabled)"} · last: ${status}`,
      // The two surfaces this guide does not own, named so it is still the one
      // place to start from when the whole setup has gone cold.
      `H in LazyGit opens a review · ? lists every Hunk key`,
    ]

    // Every queued note is also a jump target, so the guide doubles as a way
    // back to whatever the reviewer wrote and wants to reread.
    const noteOptions = queued.map((note) => `→ ${note.filePath}:${note.line}  ${note.body}`)

    const picked = await ctx.dialogs.select({
      title: `Agent dispatch · ${queued.length} queued`,
      options: [...guide, ...noteOptions],
    })
    if (picked === null) return

    if (picked === SEND_NOW) {
      await flush(ctx)
      return
    }

    const note = queued[noteOptions.indexOf(picked)]
    if (note) ctx.navigation.revealLine(note.fileId, note.side, note.line)
  })

  hunk.on("note_created", (event, ctx) => {
    if (!enabled) return

    const note = event.note as SavedNote | undefined
    if (!note || note.draft) return

    pending.set(note.id, note)
    status = `${pending.size} queued`

    // Restarted on every save, so a burst of notes leaves as one message.
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => void flush(ctx), debounceMs)
  })

  hunk.on("shutdown", () => {
    if (timer) clearTimeout(timer)

    const batch = [...pending.values()]
    pending.clear()
    if (batch.length === 0 || transport === "print") return

    const prompt = buildPrompt(repoRoot, batch)

    // `remote-control start` is warm-up only; the send alone carries the batch.
    if (transport === "desktop") {
      runDetached(CODEX_BIN, ["debug", "app-server", "send-message-v2", prompt], repoRoot)
    } else {
      runDetached(CODEX_BIN, ["exec", "-C", repoRoot, "--dangerously-bypass-approvals-and-sandbox", prompt], repoRoot)
    }
  })
}
