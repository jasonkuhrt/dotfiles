import { existsSync, readdirSync, readFileSync } from "node:fs"
import path from "node:path"

import type { RuntimeContext } from "./env.js"

// ---------------------------------------------------------------------------
// Chezmoi prefix stripping
// ---------------------------------------------------------------------------

/** Ordered list of chezmoi prefixes to strip, longest-first to avoid partial matches. */
const CHEZMOI_DIR_PREFIXES = [
  "exact_",
  "private_",
  "readonly_",
] as const

const CHEZMOI_FILE_PREFIXES = [
  "encrypted_private_executable_",
  "encrypted_private_",
  "encrypted_executable_",
  "encrypted_",
  "private_executable_",
  "executable_",
  "private_readonly_",
  "private_",
  "readonly_",
  "empty_",
  "symlink_",
  "modify_",
] as const

const CHEZMOI_FILE_SUFFIXES = [".tmpl"] as const

/**
 * Strip chezmoi naming conventions from a directory name.
 * `dot_config` -> `.config`, `exact_hooks` -> `hooks`, `private_dot_ssh` -> `.ssh`
 */
const stripChezmoiDirName = (name: string): string => {
  let result = name
  for (const prefix of CHEZMOI_DIR_PREFIXES) {
    if (result.startsWith(prefix)) {
      result = result.slice(prefix.length)
    }
  }
  return result.startsWith("dot_") ? `.${result.slice(4)}` : result
}

/**
 * Strip chezmoi naming conventions from a file name.
 * `dot_gitconfig` -> `.gitconfig`, `encrypted_private_credentials.age` -> `credentials.age`
 */
const stripChezmoiFileName = (name: string): string => {
  let result = name
  for (const prefix of CHEZMOI_FILE_PREFIXES) {
    if (result.startsWith(prefix)) {
      result = result.slice(prefix.length)
      break // only strip the first matching prefix
    }
  }
  for (const suffix of CHEZMOI_FILE_SUFFIXES) {
    if (result.endsWith(suffix)) {
      result = result.slice(0, -suffix.length)
    }
  }
  return result.startsWith("dot_") ? `.${result.slice(4)}` : result
}

// ---------------------------------------------------------------------------
// Convention types
// ---------------------------------------------------------------------------

export type ConventionKind =
  | "symlinkDir"
  | "spreadDir"
  | "symlinkFile"
  | "encrypted"
  | "modify"
  | "chezmoiTemplate"
  | "chezmoiInternal"

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
  /** For symlinkDir entries backed by symlink-roots, the actual repo dir. */
  readonly symlinkTarget?: string
  /** Human-readable note about the entry. */
  readonly note?: string
}

export interface DeploymentPlan {
  readonly entries: readonly PlanEntry[]
  readonly warnings: readonly string[]
}

// ---------------------------------------------------------------------------
// Internal: chezmoi entries we skip (internal metadata)
// ---------------------------------------------------------------------------

const CHEZMOI_INTERNAL_NAMES = new Set([
  ".chezmoi.toml.tmpl",
  ".chezmoiignore",
  ".chezmoiscripts",
  ".chezmoitemplates",
  ".chezmoiversion",
  ".chezmoiroot",
  ".chezmoiexternal",
])

const isChezmoiInternal = (name: string): boolean =>
  CHEZMOI_INTERNAL_NAMES.has(name) || name.startsWith(".chezmoi")

// ---------------------------------------------------------------------------
// Internal: detect symlink-root backed directories
// ---------------------------------------------------------------------------

/**
 * Some directories in home/ are chezmoi symlink templates pointing into
 * symlink-roots/. For example, `home/dot_config/symlink_bat.tmpl` contains
 * a path like `{{ .chezmoi.homeDir }}/projects/jasonkuhrt/dotfiles/symlink-roots/config/bat`.
 *
 * We detect these by looking for `symlink_<name>.tmpl` entries inside a
 * chezmoi directory. When found, the real source is in symlink-roots/ and
 * the operation is a symlinkDir.
 */
const resolveSymlinkTemplate = (
  repoRoot: string,
  templatePath: string,
): string | null => {
  try {
    const content = readFileSync(templatePath, "utf8").trim()
    // Replace chezmoi template variables with actual values for resolution
    // Template looks like: {{ .chezmoi.homeDir }}/projects/jasonkuhrt/dotfiles/symlink-roots/config/bat
    const match = content.match(/symlink-roots\/(.+)$/)
    if (match?.[1]) {
      return path.join(repoRoot, "symlink-roots", match[1])
    }
    return null
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Plan builder
// ---------------------------------------------------------------------------

/**
 * Walk the `home/` source tree and the `symlink-roots/` tree, producing a
 * typed deployment plan. This replaces the hardcoded TRUE_DIRS and
 * FILE_SYMLINK_ROOTS arrays from config.ts.
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

    // Skip chezmoi internal files
    if (isChezmoiInternal(entry.name)) {
      entries.push({
        kind: "chezmoiInternal",
        sourceAbs: sourcePath,
        sourceRel: path.relative(ctx.repoRoot, sourcePath),
        targetAbs: path.join(targetDir, entry.name),
        targetRel: targetRelPrefix ? `${targetRelPrefix}/${entry.name}` : entry.name,
        note: "Chezmoi internal file, skipped during deploy",
      })
      continue
    }

    // Skip non-deployable repo files at the home root level
    if (entry.name === "Brewfile" || entry.name === "dock" || entry.name === "npm") {
      // These are chezmoi-managed scripts/data, not direct deploy targets
      // They'll be handled by chezmoi scripts or future beads
      continue
    }

    if (entry.isDirectory()) {
      const cleanName = stripChezmoiDirName(entry.name)
      const targetPath = path.join(targetDir, cleanName)
      const targetRel = targetRelPrefix ? `${targetRelPrefix}/${cleanName}` : cleanName

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
        // Recurse into spread dirs
        walkSourceDir(ctx, sourcePath, targetPath, targetRel, entries, warnings)
        continue
      }

      // Regular directory: recurse to discover children
      walkSourceDir(ctx, sourcePath, targetPath, targetRel, entries, warnings)
    } else if (entry.isFile()) {
      // .spread markers are metadata only — never deploy them
      if (entry.name === ".spread") continue

      // Symlink templates: chezmoi convention for directory symlinks into symlink-roots/
      if (entry.name.startsWith("symlink_") && entry.name.endsWith(".tmpl")) {
        const cleanName = stripChezmoiFileName(entry.name)
        const symlinkRootsPath = resolveSymlinkTemplate(
          ctx.repoRoot,
          path.join(sourceDir, entry.name),
        )
        if (symlinkRootsPath) {
          const targetPath = path.join(targetDir, cleanName)
          const targetRel = targetRelPrefix ? `${targetRelPrefix}/${cleanName}` : cleanName
          entries.push({
            kind: "symlinkDir",
            sourceAbs: sourcePath,
            sourceRel: path.relative(ctx.repoRoot, sourcePath),
            targetAbs: targetPath,
            targetRel,
            symlinkTarget: symlinkRootsPath,
            note: `Symlink-root backed -> ${path.relative(ctx.repoRoot, symlinkRootsPath)}`,
          })
        } else {
          warnings.push(`Symlink template ${entry.name} does not resolve to symlink-roots/`)
        }
        continue
      }

      const cleanName = stripChezmoiFileName(entry.name)
      const targetPath = path.join(targetDir, cleanName)
      const targetRel = targetRelPrefix ? `${targetRelPrefix}/${cleanName}` : cleanName

      // Classify the file
      if (entry.name.endsWith(".age")) {
        // Strip .age extension from target: deploy decrypted content without extension
        const ageCleanName = cleanName.endsWith(".age")
          ? cleanName.slice(0, -4)
          : cleanName
        const ageTargetPath = path.join(targetDir, ageCleanName)
        const ageTargetRel = targetRelPrefix ? `${targetRelPrefix}/${ageCleanName}` : ageCleanName
        entries.push({
          kind: "encrypted",
          sourceAbs: sourcePath,
          sourceRel: path.relative(ctx.repoRoot, sourcePath),
          targetAbs: ageTargetPath,
          targetRel: ageTargetRel,
          note: "Encrypted file, requires age decryption",
        })
      } else if (entry.name.startsWith("modify_")) {
        entries.push({
          kind: "modify",
          sourceAbs: sourcePath,
          sourceRel: path.relative(ctx.repoRoot, sourcePath),
          targetAbs: targetPath,
          targetRel,
          note: "Modify script: runs to generate target content",
        })
      } else if (entry.name.endsWith(".tmpl") && !entry.name.startsWith("symlink_")) {
        entries.push({
          kind: "chezmoiTemplate",
          sourceAbs: sourcePath,
          sourceRel: path.relative(ctx.repoRoot, sourcePath),
          targetAbs: targetPath,
          targetRel,
          note: "Chezmoi template, not yet handled by convention engine",
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
    "symlinkDir",
    "spreadDir",
    "symlinkFile",
    "encrypted",
    "modify",
    "chezmoiTemplate",
    "chezmoiInternal",
  ]

  const kindLabels: Record<ConventionKind, string> = {
    symlinkDir: "Directory Symlinks",
    spreadDir: "Spread Directories",
    symlinkFile: "File Symlinks",
    encrypted: "Encrypted Files",
    modify: "Modify Scripts",
    chezmoiTemplate: "Chezmoi Templates (deferred)",
    chezmoiInternal: "Chezmoi Internal (skipped)",
  }

  for (const kind of kindOrder) {
    const group = grouped.get(kind)
    if (!group || group.length === 0) continue

    lines.push(`${kindLabels[kind]} (${group.length}):`)
    for (const entry of group) {
      const target = entry.targetRel.startsWith(".") ? `~/${entry.targetRel}` : `~/${entry.targetRel}`
      const source = entry.symlinkTarget
        ? path.relative(process.cwd(), entry.symlinkTarget)
        : entry.sourceRel
      lines.push(`  ${target} <- ${source}`)
    }
    lines.push("")
  }

  const deployable = plan.entries.filter(
    (e) => e.kind !== "chezmoiInternal" && e.kind !== "chezmoiTemplate",
  )
  lines.push(`Total: ${plan.entries.length} entries (${deployable.length} deployable)`)

  return lines.join("\n")
}
