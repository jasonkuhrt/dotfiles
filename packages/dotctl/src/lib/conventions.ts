import { existsSync, readdirSync } from "node:fs"
import path from "node:path"

import type { RuntimeContext } from "./env.js"

// ---------------------------------------------------------------------------
// Convention types
// ---------------------------------------------------------------------------

export type ConventionKind =
  | "spreadDir"
  | "symlinkFile"
  | "encrypted"
  | "modify"

export interface PlanEntry {
  /** What kind of operation this is. */
  readonly kind: ConventionKind
  /** Absolute path to the source in the repo. */
  readonly sourceAbs: string
  /** Path relative to the repo root. */
  readonly sourceRel: string
  /** Absolute path to the deployment target (in $HOME). */
  readonly targetAbs: string
  /** Path relative to $HOME. */
  readonly targetRel: string
  /** For modify entries, absolute path to the .modify sidecar script. */
  readonly modifyScript?: string
  /** Human-readable note about the entry. */
  readonly note?: string
}

export interface DeploymentPlan {
  readonly entries: readonly PlanEntry[]
  readonly warnings: readonly string[]
}

// ---------------------------------------------------------------------------
// Skip list: repo-internal files that are not deployed
// ---------------------------------------------------------------------------

/** Files/dirs at the home/ root that are not deploy targets. */
const HOME_ROOT_SKIP = new Set([
  "Brewfile",
  "dock",
  "npm",
])

// ---------------------------------------------------------------------------
// Plan builder
// ---------------------------------------------------------------------------

/**
 * Walk the `home/` source tree, producing a typed deployment plan.
 * Files use literal names (no chezmoi prefix encoding).
 */
export const buildDeploymentPlan = (ctx: RuntimeContext): DeploymentPlan => {
  const entries: PlanEntry[] = []
  const warnings: string[] = []
  const homeSourceDir = path.join(ctx.repoRoot, "home")

  if (!existsSync(homeSourceDir)) {
    warnings.push(`home/ directory not found at ${homeSourceDir}`)
    return { entries, warnings }
  }

  walkSourceDir(ctx, homeSourceDir, ctx.homeDir, "", entries, warnings)

  entries.sort((a, b) => a.targetRel.localeCompare(b.targetRel))
  return { entries, warnings }
}

const walkSourceDir = (
  ctx: RuntimeContext,
  sourceDir: string,
  targetDir: string,
  targetRelPrefix: string,
  entries: PlanEntry[],
  warnings: string[],
): void => {
  let dirEntries: import("node:fs").Dirent[]
  try {
    dirEntries = readdirSync(sourceDir, { withFileTypes: true, encoding: "utf8" }) as import("node:fs").Dirent[]
  } catch (error) {
    warnings.push(`Failed to read directory ${sourceDir}: ${error}`)
    return
  }

  for (const entry of dirEntries) {
    const sourcePath = path.join(sourceDir, entry.name)

    // Skip non-deployable repo files at the home root level
    if (!targetRelPrefix && HOME_ROOT_SKIP.has(entry.name)) continue

    if (entry.isDirectory()) {
      const targetPath = path.join(targetDir, entry.name)
      const targetRel = targetRelPrefix ? `${targetRelPrefix}/${entry.name}` : entry.name

      // Check if this dir has a .spread marker
      const spreadMarkerPath = path.join(sourcePath, ".spread")
      if (existsSync(spreadMarkerPath)) {
        entries.push({
          kind: "spreadDir",
          sourceAbs: sourcePath,
          sourceRel: path.relative(ctx.repoRoot, sourcePath),
          targetAbs: targetPath,
          targetRel,
          note: "Directory with .spread marker: symlink each child individually",
        })
      }

      // Always recurse into directories
      walkSourceDir(ctx, sourcePath, targetPath, targetRel, entries, warnings)
    } else if (entry.isFile()) {
      // Metadata files — never deploy
      if (entry.name === ".spread") continue
      if (entry.name.endsWith(".modify")) continue

      const targetPath = path.join(targetDir, entry.name)
      const targetRel = targetRelPrefix ? `${targetRelPrefix}/${entry.name}` : entry.name

      // Classify the file
      if (entry.name.endsWith(".age")) {
        // Strip .age extension from target: deploy decrypted content
        const cleanName = entry.name.slice(0, -4)
        const ageTargetPath = path.join(targetDir, cleanName)
        const ageTargetRel = targetRelPrefix ? `${targetRelPrefix}/${cleanName}` : cleanName
        entries.push({
          kind: "encrypted",
          sourceAbs: sourcePath,
          sourceRel: path.relative(ctx.repoRoot, sourcePath),
          targetAbs: ageTargetPath,
          targetRel: ageTargetRel,
          note: "Encrypted file, requires age decryption",
        })
      } else {
        // Check for .modify sidecar: F.modify alongside F
        const sidecarPath = path.join(sourceDir, `${entry.name}.modify`)
        if (existsSync(sidecarPath)) {
          entries.push({
            kind: "modify",
            sourceAbs: sourcePath,
            sourceRel: path.relative(ctx.repoRoot, sourcePath),
            targetAbs: targetPath,
            targetRel,
            modifyScript: sidecarPath,
            note: `Modify sidecar: ${entry.name}.modify`,
          })
        } else {
          entries.push({
            kind: "symlinkFile",
            sourceAbs: sourcePath,
            sourceRel: path.relative(ctx.repoRoot, sourcePath),
            targetAbs: targetPath,
            targetRel,
          })
        }
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Plan formatting
// ---------------------------------------------------------------------------

export const formatPlan = (plan: DeploymentPlan): string => {
  const lines: string[] = []

  if (plan.warnings.length > 0) {
    lines.push("Warnings:")
    for (const warning of plan.warnings) {
      lines.push(`  ! ${warning}`)
    }
    lines.push("")
  }

  const grouped = new Map<ConventionKind, PlanEntry[]>()
  for (const entry of plan.entries) {
    const group = grouped.get(entry.kind) ?? []
    group.push(entry)
    grouped.set(entry.kind, group)
  }

  const kindOrder: ConventionKind[] = [
    "spreadDir",
    "symlinkFile",
    "encrypted",
    "modify",
  ]

  const kindLabels: Record<ConventionKind, string> = {
    spreadDir: "Spread Directories",
    symlinkFile: "File Symlinks",
    encrypted: "Encrypted Files",
    modify: "Modify Scripts",
  }

  for (const kind of kindOrder) {
    const group = grouped.get(kind)
    if (!group || group.length === 0) continue

    lines.push(`${kindLabels[kind]} (${group.length}):`)
    for (const entry of group) {
      lines.push(`  ~/${entry.targetRel} <- ${entry.sourceRel}`)
    }
    lines.push("")
  }

  lines.push(`Total: ${plan.entries.length} entries`)

  return lines.join("\n")
}
