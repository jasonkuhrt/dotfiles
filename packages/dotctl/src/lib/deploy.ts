import { existsSync, lstatSync, mkdirSync, readlinkSync, symlinkSync, renameSync, unlinkSync } from "node:fs"
import path from "node:path"

import type { RuntimeContext } from "./env.js"
import { timestampPath } from "./env.js"
import type { ConventionKind, DeploymentPlan, PlanEntry } from "./conventions.js"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type DeployAction =
  | "created"
  | "unchanged"
  | "replaced"
  | "backed-up"
  | "skipped"
  | "error"

export interface DeployResult {
  readonly entry: PlanEntry
  readonly action: DeployAction
  readonly detail?: string
}

export interface DeploySummary {
  readonly results: readonly DeployResult[]
  readonly created: number
  readonly unchanged: number
  readonly replaced: number
  readonly backedUp: number
  readonly skipped: number
  readonly errors: number
}

export interface DeployOptions {
  readonly dryRun: boolean
  readonly backupDir?: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const ensureParentDir = (targetPath: string): void => {
  const parent = path.dirname(targetPath)
  if (!existsSync(parent)) {
    mkdirSync(parent, { recursive: true })
  }
}

/**
 * Check if a path is a symlink pointing to the expected target.
 * Returns true if already correct (idempotent).
 */
const isCorrectSymlink = (linkPath: string, expectedTarget: string): boolean => {
  try {
    const stat = lstatSync(linkPath)
    if (!stat.isSymbolicLink()) return false
    const currentTarget = readlinkSync(linkPath)
    return currentTarget === expectedTarget
  } catch {
    return false
  }
}

/**
 * Check if something exists at the path (follows symlinks = false).
 */
const pathExists = (p: string): boolean => {
  try {
    lstatSync(p)
    return true
  } catch {
    return false
  }
}

/**
 * Back up an existing file/dir/symlink to the backup directory.
 */
const backupExisting = (targetPath: string, backupDir: string): string => {
  const backupPath = path.join(backupDir, path.basename(targetPath))
  mkdirSync(backupDir, { recursive: true })
  renameSync(targetPath, backupPath)
  return backupPath
}

/**
 * Remove an existing symlink or file at the target path.
 * For safety, only removes symlinks. Non-symlink entries must be backed up first.
 */
const removeExistingSymlink = (targetPath: string): void => {
  unlinkSync(targetPath)
}

// ---------------------------------------------------------------------------
// Deployment logic per convention kind
// ---------------------------------------------------------------------------

/** Kinds that the deploy engine can handle today. */
const DEPLOYABLE_KINDS = new Set<ConventionKind>([
  "symlinkDir",
  "symlinkFile",
])

const deploySymlink = (
  entry: PlanEntry,
  options: DeployOptions,
): DeployResult => {
  // For symlinkDir entries with a symlinkTarget, use that as the link source.
  // Otherwise, link directly to the source file in the repo.
  const linkTarget = entry.symlinkTarget ?? entry.sourceAbs

  // Already correct?
  if (isCorrectSymlink(entry.targetAbs, linkTarget)) {
    return { entry, action: "unchanged" }
  }

  if (options.dryRun) {
    if (pathExists(entry.targetAbs)) {
      return { entry, action: "replaced", detail: `would replace -> ${linkTarget}` }
    }
    return { entry, action: "created", detail: `would create -> ${linkTarget}` }
  }

  // Something exists at the target
  if (pathExists(entry.targetAbs)) {
    const stat = lstatSync(entry.targetAbs)
    if (stat.isSymbolicLink()) {
      // Existing symlink pointing somewhere else -- replace it
      removeExistingSymlink(entry.targetAbs)
      ensureParentDir(entry.targetAbs)
      symlinkSync(linkTarget, entry.targetAbs)
      return { entry, action: "replaced", detail: `symlink updated -> ${linkTarget}` }
    }

    // Non-symlink: back up before replacing
    const backupDir = options.backupDir ?? path.join(
      path.dirname(entry.targetAbs),
      `.dotctl-backup-${timestampPath()}`,
    )
    const backupPath = backupExisting(entry.targetAbs, backupDir)
    ensureParentDir(entry.targetAbs)
    symlinkSync(linkTarget, entry.targetAbs)
    return { entry, action: "backed-up", detail: `backed up to ${backupPath}, linked -> ${linkTarget}` }
  }

  // Nothing exists: create
  ensureParentDir(entry.targetAbs)
  symlinkSync(linkTarget, entry.targetAbs)
  return { entry, action: "created", detail: `-> ${linkTarget}` }
}

// ---------------------------------------------------------------------------
// Main executor
// ---------------------------------------------------------------------------

export const executeDeploy = (
  _ctx: RuntimeContext,
  plan: DeploymentPlan,
  options: DeployOptions,
): DeploySummary => {
  const results: DeployResult[] = []

  for (const entry of plan.entries) {
    // Only deploy kinds we can handle
    if (!DEPLOYABLE_KINDS.has(entry.kind)) {
      results.push({
        entry,
        action: "skipped",
        detail: `${entry.kind} not yet handled by deploy engine`,
      })
      continue
    }

    try {
      const result = deploySymlink(entry, options)
      results.push(result)
    } catch (error) {
      results.push({
        entry,
        action: "error",
        detail: error instanceof Error ? error.message : String(error),
      })
    }
  }

  return {
    results,
    created: results.filter((r) => r.action === "created").length,
    unchanged: results.filter((r) => r.action === "unchanged").length,
    replaced: results.filter((r) => r.action === "replaced").length,
    backedUp: results.filter((r) => r.action === "backed-up").length,
    skipped: results.filter((r) => r.action === "skipped").length,
    errors: results.filter((r) => r.action === "error").length,
  }
}

// ---------------------------------------------------------------------------
// Summary formatting
// ---------------------------------------------------------------------------

export const formatDeploySummary = (summary: DeploySummary, verbose: boolean): string => {
  const lines: string[] = []

  if (verbose) {
    for (const result of summary.results) {
      if (result.action === "unchanged" || result.action === "skipped") continue
      const target = result.entry.targetRel.startsWith(".")
        ? `~/${result.entry.targetRel}`
        : `~/${result.entry.targetRel}`
      lines.push(`  [${result.action}] ${target}${result.detail ? ` (${result.detail})` : ""}`)
    }
    if (lines.length > 0) lines.push("")
  }

  lines.push(
    `Deploy: created=${summary.created} unchanged=${summary.unchanged} replaced=${summary.replaced} backed-up=${summary.backedUp} skipped=${summary.skipped} errors=${summary.errors}`,
  )

  return lines.join("\n")
}
