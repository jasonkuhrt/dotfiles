import { appendFileSync, copyFileSync, existsSync, lstatSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import path from "node:path"

import type { RuntimeContext } from "./env.js"
import { ensureRuntimeDirs, timestampPath, timestampUtc } from "./env.js"
import { readJsonFile, writeJsonFile } from "./json.js"
import { displayHomePath } from "./paths.js"
import { runChezMoi } from "./chezmoi.js"
import { loadManifest, type Manifest, type ManifestFileEntry } from "./manifest.js"

export interface CaptureRecord {
  readonly capturedAt: string
  readonly targetAbs: string
  readonly targetDisplay: string
  readonly sourceAbs: string
  readonly sourceRel: string | null
  readonly policy: "capture"
  readonly backupDir: string
}

interface CaptureState {
  readonly version: 1
  readonly updatedAt: string
  readonly entries: readonly CaptureRecord[]
}

export interface HealSummary {
  readonly version: 1
  readonly lastRunAt: string
  readonly manifestGeneratedAt: string
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

const loadCaptureState = (ctx: RuntimeContext): CaptureState =>
  existsSync(ctx.capturesPath)
    ? readJsonFile<CaptureState>(ctx.capturesPath)
    : { version: 1, updatedAt: timestampUtc(), entries: [] }

const saveCaptureState = (ctx: RuntimeContext, state: CaptureState): void => {
  writeJsonFile(ctx.capturesPath, state)
}

const appendCapture = (ctx: RuntimeContext, entry: CaptureRecord): void => {
  const current = loadCaptureState(ctx)
  saveCaptureState(ctx, {
    version: 1,
    updatedAt: timestampUtc(),
    entries: [...current.entries, entry],
  })
}

const saveHealth = (ctx: RuntimeContext, summary: HealSummary): void => {
  writeJsonFile(ctx.healthPath, summary)
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

const backupFile = (source: string, backupDir: string, prefix: "live" | "source"): void => {
  if (!existsSync(source) && !lstatExists(source)) return
  const destination = path.join(backupDir, prefix, source.replace(/^\//, ""))
  mkdirSync(path.dirname(destination), { recursive: true })
  copyFileSync(source, destination)
}

const lstatExists = (target: string): boolean => {
  try {
    lstatSync(target)
    return true
  } catch {
    return false
  }
}

const applySymlink = (ctx: RuntimeContext, entry: ManifestFileEntry): void => {
  runChezMoi(ctx, ["apply", "--mode", "symlink", "--no-tty", entry.targetAbs])
}

const relinkOnly = (ctx: RuntimeContext, entry: ManifestFileEntry): void => {
  runChezMoi(ctx, ["state", "delete", "--bucket=entryState", "--key", entry.targetAbs], { allowFailure: true })
  applySymlink(ctx, entry)
}

const healEntry = (
  ctx: RuntimeContext,
  entry: ManifestFileEntry,
  runBackupDir: string,
): { readonly action: "healed" | "skipped"; readonly broken: boolean } => {
  const lstat = lstatExists(entry.targetAbs) ? lstatSync(entry.targetAbs) : null
  if (lstat?.isSymbolicLink()) return { action: "skipped", broken: false }

  if (entry.capturePolicy === "ignore") return { action: "skipped", broken: Boolean(lstat) }

  if (lstat?.isDirectory()) {
    throw new Error(`ambiguous target kind for ${entry.targetDisplay}: directory`)
  }

  const broken = true
  backupFile(entry.targetAbs, runBackupDir, "live")
  backupFile(entry.sourceAbs, runBackupDir, "source")

  if (!lstat) {
    relinkOnly(ctx, entry)
    appendHealLog(ctx, `restored missing target ${entry.targetAbs}`)
    return { action: "healed", broken }
  }

  if (!lstat.isFile()) {
    throw new Error(`ambiguous target kind for ${entry.targetDisplay}`)
  }

  if (entry.capturePolicy === "capture") {
    runChezMoi(ctx, ["re-add", entry.targetAbs])
    applySymlink(ctx, entry)
    appendCapture(ctx, {
      capturedAt: timestampUtc(),
      targetAbs: entry.targetAbs,
      targetDisplay: entry.targetDisplay,
      sourceAbs: entry.sourceAbs,
      sourceRel: entry.sourceRel,
      policy: "capture",
      backupDir: runBackupDir,
    })
    appendHealLog(ctx, `captured and relinked ${entry.targetAbs}`)
    return { action: "healed", broken }
  }

  if (entry.capturePolicy === "relinkOnly") {
    relinkOnly(ctx, entry)
    appendHealLog(ctx, `relinked without capture ${entry.targetAbs}`)
    return { action: "healed", broken }
  }

  throw new Error(`unsupported capture policy ${entry.capturePolicy}`)
}

const loadManifestForHeal = (ctx: RuntimeContext): Manifest => {
  if (!existsSync(ctx.manifestPath)) throw new Error(`manifest missing at ${ctx.manifestPath}; run just up`)
  return loadManifest(ctx)
}

export const healOnce = (ctx: RuntimeContext, options: HealOptions): HealSummary => {
  ensureRuntimeDirs(ctx)
  const release = acquireLock(ctx)
  if (!release) {
    const summary: HealSummary = {
      version: 1,
      lastRunAt: timestampUtc(),
      manifestGeneratedAt: existsSync(ctx.manifestPath) ? loadManifest(ctx).generatedAt : "missing",
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
    const manifest = loadManifestForHeal(ctx)
    const entries = manifest.fileEntries.filter((entry) => entry.expectedShape === "symlinkFile")
    const runBackupDir = path.join(ctx.backupRoot, `heal-${timestampPath()}`)

    for (const entry of entries) {
      try {
        const result = healEntry(ctx, entry, runBackupDir)
        if (result.broken) broken += 1
        if (result.action === "healed") healed += 1
        else skipped += 1
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        errors.push(`${displayHomePath(entry.targetAbs, ctx.homeDir)}: ${message}`)
        appendHealLog(ctx, `error ${entry.targetAbs} ${message}`)
        if (!options.background && options.strict) throw error
      }
    }

    const summary: HealSummary = {
      version: 1,
      lastRunAt: timestampUtc(),
      manifestGeneratedAt: manifest.generatedAt,
      background: options.background,
      durationMs: Date.now() - startedAt,
      scanned: entries.length,
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
