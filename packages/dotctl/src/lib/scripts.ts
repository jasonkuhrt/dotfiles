import { createHash } from "node:crypto"
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync } from "node:fs"
import path from "node:path"

import type { RuntimeContext } from "./env.js"
import { readJsonFile, writeJsonFile } from "./json.js"
import { runInteractive } from "./shell.js"

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

type Phase = "before" | "after"
type Trigger = "once" | "onchange"

interface ScriptEntry {
  readonly name: string
  readonly phase: Phase
  readonly trigger: Trigger
  readonly absolutePath: string
  readonly relativePath: string
  readonly watchFiles: readonly string[]
}

interface ScriptState {
  readonly once: Record<string, { ran: string }>
  readonly onchange: Record<string, { hash: string; ran: string }>
}

export interface ScriptPlan {
  readonly scripts: readonly PlannedScript[]
}

export interface PlannedScript {
  readonly entry: ScriptEntry
  readonly reason: "first-run" | "content-changed" | "skip"
}

export interface ScriptRunSummary {
  readonly ran: number
  readonly skipped: number
  readonly failed: number
  readonly errors: readonly ScriptError[]
}

interface ScriptError {
  readonly script: string
  readonly exitCode: number
}

// ─────────────────────────────────────────────────────────────
// Discovery
// ─────────────────────────────────────────────────────────────

const PHASES: readonly Phase[] = ["before", "after"]
const TRIGGERS: readonly Trigger[] = ["once", "onchange"]

const parseWatchDirective = (scriptPath: string): readonly string[] => {
  const content = readFileSync(scriptPath, "utf8")
  const watches: string[] = []
  for (const line of content.split("\n")) {
    const match = line.match(/^#\s*dotctl:watch\s+(.+)$/)
    if (match?.[1]) watches.push(match[1].trim())
  }
  return watches
}

export const discoverScripts = (ctx: RuntimeContext): readonly ScriptEntry[] => {
  const setupDir = path.join(ctx.repoRoot, "scripts", "setup")
  const entries: ScriptEntry[] = []

  for (const phase of PHASES) {
    for (const trigger of TRIGGERS) {
      const dir = path.join(setupDir, phase, trigger)
      if (!existsSync(dir)) continue

      const files = readdirSync(dir)
        .filter((f) => f.endsWith(".sh"))
        .sort()

      for (const file of files) {
        const absolutePath = path.join(dir, file)
        const relativePath = path.relative(ctx.repoRoot, absolutePath)
        const watchFiles = parseWatchDirective(absolutePath)

        entries.push({
          name: file.replace(/\.sh$/, ""),
          phase,
          trigger,
          absolutePath,
          relativePath,
          watchFiles,
        })
      }
    }
  }

  return entries
}

// ─────────────────────────────────────────────────────────────
// State management
// ─────────────────────────────────────────────────────────────

const statePath = (ctx: RuntimeContext): string =>
  path.join(ctx.stateDir, "script-state.json")

const loadState = (ctx: RuntimeContext): ScriptState => {
  const p = statePath(ctx)
  if (!existsSync(p)) return { once: {}, onchange: {} }
  return readJsonFile<ScriptState>(p)
}

const saveState = (ctx: RuntimeContext, state: ScriptState): void => {
  mkdirSync(path.dirname(statePath(ctx)), { recursive: true })
  writeJsonFile(statePath(ctx), state)
}

const computeContentHash = (ctx: RuntimeContext, entry: ScriptEntry): string => {
  const hash = createHash("sha256")

  // Always include the script itself
  hash.update(readFileSync(entry.absolutePath, "utf8"))

  // Include watched files
  for (const watchRel of entry.watchFiles) {
    const watchAbs = path.join(ctx.repoRoot, watchRel)
    if (existsSync(watchAbs)) {
      const stat = statSync(watchAbs)
      if (stat.isDirectory()) {
        // Hash all files in directory recursively
        const hashDir = (dir: string): void => {
          for (const child of readdirSync(dir).sort()) {
            const childPath = path.join(dir, child)
            const childStat = statSync(childPath)
            if (childStat.isDirectory()) hashDir(childPath)
            else hash.update(readFileSync(childPath, "utf8"))
          }
        }
        hashDir(watchAbs)
      } else {
        hash.update(readFileSync(watchAbs, "utf8"))
      }
    }
  }

  return hash.digest("hex")
}

// ─────────────────────────────────────────────────────────────
// Planning
// ─────────────────────────────────────────────────────────────

export const buildScriptPlan = (ctx: RuntimeContext): ScriptPlan => {
  const scripts = discoverScripts(ctx)
  const state = loadState(ctx)
  const planned: PlannedScript[] = []

  for (const entry of scripts) {
    if (entry.trigger === "once") {
      const ran = state.once[entry.name]
      planned.push({
        entry,
        reason: ran ? "skip" : "first-run",
      })
    } else {
      const contentHash = computeContentHash(ctx, entry)
      const prev = state.onchange[entry.name]
      if (prev && prev.hash === contentHash) {
        planned.push({ entry, reason: "skip" })
      } else {
        planned.push({ entry, reason: prev ? "content-changed" : "first-run" })
      }
    }
  }

  return { scripts: planned }
}

// ─────────────────────────────────────────────────────────────
// Execution
// ─────────────────────────────────────────────────────────────

export const runScripts = async (
  ctx: RuntimeContext,
  plan: ScriptPlan,
): Promise<ScriptRunSummary> => {
  const state = loadState(ctx)
  const mutableOnce = { ...state.once }
  const mutableOnchange = { ...state.onchange }

  let ran = 0
  let skipped = 0
  let failed = 0
  const errors: ScriptError[] = []

  for (const planned of plan.scripts) {
    if (planned.reason === "skip") {
      skipped++
      continue
    }

    const exitCode = await runInteractive(["bash", planned.entry.absolutePath], {
      cwd: ctx.repoRoot,
      env: {
        ...process.env,
        HOME: ctx.homeDir,
        DOTFILES_ROOT: ctx.repoRoot,
      },
    })

    if (exitCode !== 0) {
      failed++
      errors.push({ script: planned.entry.name, exitCode })
      continue
    }

    ran++
    const now = new Date().toISOString()

    if (planned.entry.trigger === "once") {
      mutableOnce[planned.entry.name] = { ran: now }
    } else {
      const contentHash = computeContentHash(ctx, planned.entry)
      mutableOnchange[planned.entry.name] = { hash: contentHash, ran: now }
    }

    // Save state after each successful script so progress is preserved on failure
    saveState(ctx, { once: mutableOnce, onchange: mutableOnchange })
  }

  return { ran, skipped, failed, errors }
}

// ─────────────────────────────────────────────────────────────
// Formatting
// ─────────────────────────────────────────────────────────────

export const formatScriptPlan = (plan: ScriptPlan): string => {
  const lines: string[] = ["Script Plan", ""]

  const toRun = plan.scripts.filter((s) => s.reason !== "skip")
  const toSkip = plan.scripts.filter((s) => s.reason === "skip")

  if (toRun.length === 0) {
    lines.push("  Nothing to run (all scripts up to date)")
  } else {
    lines.push(`  Will run (${toRun.length}):`)
    for (const s of toRun) {
      const tag = `[${s.entry.phase}/${s.entry.trigger}]`
      lines.push(`    ${tag} ${s.entry.name} (${s.reason})`)
    }
  }

  if (toSkip.length > 0) {
    lines.push("")
    lines.push(`  Skipped (${toSkip.length}):`)
    for (const s of toSkip) {
      const tag = `[${s.entry.phase}/${s.entry.trigger}]`
      lines.push(`    ${tag} ${s.entry.name}`)
    }
  }

  return lines.join("\n")
}

export const formatRunSummary = (summary: ScriptRunSummary): string => {
  const parts = [
    `ran=${summary.ran}`,
    `skipped=${summary.skipped}`,
    `failed=${summary.failed}`,
  ]
  let result = `dotctl scripts: ${parts.join(" ")}`

  if (summary.errors.length > 0) {
    result += "\n\nErrors:"
    for (const err of summary.errors) {
      result += `\n  ${err.script} exited with ${err.exitCode}`
    }
  }

  return result
}
