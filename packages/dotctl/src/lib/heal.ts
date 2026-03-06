import { appendFileSync, existsSync, lstatSync, mkdirSync, readFileSync, readlinkSync, rmSync, symlinkSync, writeFileSync } from "node:fs"
import path from "node:path"

import type { RuntimeContext } from "./env.js"
import { ensureRuntimeDirs, timestampPath, timestampUtc } from "./env.js"
import { readJsonFile, writeJsonFile } from "./json.js"
import { buildDeploymentPlan, type PlanEntry } from "./conventions.js"

/** @deprecated Capture system removed — kept for status.ts compat during transition. */
export interface CaptureRecord {
  readonly capturedAt: string
  readonly targetAbs: string
  readonly targetDisplay: string
  readonly sourceAbs: string
  readonly sourceRel: string | null
  readonly policy: "capture"
  readonly backupDir: string
}

export interface HealSummary {
  readonly version: 1
  readonly lastRunAt: string
  readonly background: boolean
  readonly durationMs: number
  readonly scanned: number
  readonly broken: number
  readonly healed: number
  readonly skipped: number
  readonly errors: number
  readonly errorMessages: readonly string[]
}

export interface HealOptions {
  readonly background: boolean
  readonly strict: boolean
}

const appendHealLog = (ctx: RuntimeContext, message: string): void => {
  appendFileSync(ctx.healLogPath, `${timestampUtc()} ${message}\n`, "utf8")
}

const acquireLock = (ctx: RuntimeContext): (() => void) | null => {
  try {
    mkdirSync(ctx.healLockDir)
  } catch {
    const pidPath = path.join(ctx.healLockDir, "pid")
    const pid = existsSync(pidPath) ? Number(readFileSync(pidPath, "utf8").trim()) : NaN
    if (Number.isFinite(pid)) {
      try {
        process.kill(pid, 0)
        return null
      } catch {
        rmSync(ctx.healLockDir, { recursive: true, force: true })
        mkdirSync(ctx.healLockDir, { recursive: true })
      }
    } else {
      rmSync(ctx.healLockDir, { recursive: true, force: true })
      mkdirSync(ctx.healLockDir, { recursive: true })
    }
  }

  writeFileSync(path.join(ctx.healLockDir, "pid"), `${process.pid}\n`, "utf8")
  return () => rmSync(ctx.healLockDir, { recursive: true, force: true })
}

const saveHealth = (ctx: RuntimeContext, summary: HealSummary): void => {
  writeJsonFile(ctx.healthPath, summary)
}

const isCorrectSymlink = (linkPath: string, expectedTarget: string): boolean => {
  try {
    const stat = lstatSync(linkPath)
    if (!stat.isSymbolicLink()) return false
    return readlinkSync(linkPath) === expectedTarget
  } catch {
    return false
  }
}

const healSymlinkEntry = (
  ctx: RuntimeContext,
  entry: PlanEntry,
): { readonly action: "healed" | "skipped"; readonly broken: boolean } => {
  const linkTarget = entry.sourceAbs

  if (isCorrectSymlink(entry.targetAbs, linkTarget)) {
    return { action: "skipped", broken: false }
  }

  // Something is wrong — either missing or pointing to wrong target
  const broken = true

  try {
    const stat = lstatSync(entry.targetAbs)
    if (stat.isSymbolicLink()) {
      // Symlink pointing to wrong target — fix it
      rmSync(entry.targetAbs)
    } else {
      // Non-symlink exists — skip, don't destroy user data
      return { action: "skipped", broken: true }
    }
  } catch {
    // Nothing exists at target — that's fine, we'll create it
  }

  mkdirSync(path.dirname(entry.targetAbs), { recursive: true })
  symlinkSync(linkTarget, entry.targetAbs)
  appendHealLog(ctx, `healed ${entry.targetAbs} -> ${linkTarget}`)
  return { action: "healed", broken }
}

export const healOnce = (ctx: RuntimeContext, options: HealOptions): HealSummary => {
  ensureRuntimeDirs(ctx)
  const release = acquireLock(ctx)
  if (!release) {
    const summary: HealSummary = {
      version: 1,
      lastRunAt: timestampUtc(),
      background: options.background,
      durationMs: 0,
      scanned: 0,
      broken: 0,
      healed: 0,
      skipped: 0,
      errors: 0,
      errorMessages: ["heal lock busy"],
    }
    saveHealth(ctx, summary)
    return summary
  }

  const startedAt = Date.now()
  const errors: string[] = []
  let broken = 0
  let healed = 0
  let skipped = 0

  try {
    const plan = buildDeploymentPlan(ctx)
    // Only heal symlink entries
    const symlinkEntries = plan.entries.filter(
      (e) => e.kind === "symlinkFile",
    )

    for (const entry of symlinkEntries) {
      try {
        const result = healSymlinkEntry(ctx, entry)
        if (result.broken) broken += 1
        if (result.action === "healed") healed += 1
        else skipped += 1
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        errors.push(`${entry.targetRel}: ${message}`)
        appendHealLog(ctx, `error ${entry.targetAbs} ${message}`)
        if (!options.background && options.strict) throw error
      }
    }

    const summary: HealSummary = {
      version: 1,
      lastRunAt: timestampUtc(),
      background: options.background,
      durationMs: Date.now() - startedAt,
      scanned: symlinkEntries.length,
      broken,
      healed,
      skipped,
      errors: errors.length,
      errorMessages: errors,
    }
    saveHealth(ctx, summary)
    return summary
  } finally {
    release()
  }
}
