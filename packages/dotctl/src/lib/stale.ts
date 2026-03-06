import { existsSync, lstatSync, readlinkSync, rmSync } from "node:fs"
import path from "node:path"

import type { RuntimeContext } from "./env.js"
import type { Manifest, ManifestFileEntry } from "./manifest.js"
import { displayHomePath, pathIsWithin } from "./paths.js"

export interface PrunableSymlinkEntry {
  readonly targetAbs: string
  readonly sourceAbs: string
}

export interface OrphanedRepoSymlinkEntry extends PrunableSymlinkEntry {
  readonly targetDisplay: string
}

export interface StalePruneSummary {
  readonly scanned: number
  readonly removed: number
  readonly skipped: number
}

const isFileSymlinkEntry = (entry: ManifestFileEntry): boolean => entry.expectedShape === "symlinkFile"

const lstatExists = (target: string): boolean => {
  try {
    lstatSync(target)
    return true
  } catch {
    return false
  }
}

const resolveLinkTarget = (targetAbs: string): string | null => {
  try {
    return path.resolve(path.dirname(targetAbs), readlinkSync(targetAbs))
  } catch {
    return null
  }
}

export const findEntriesWithMissingSources = (manifest: Manifest): readonly ManifestFileEntry[] =>
  manifest.fileEntries.filter((entry) => isFileSymlinkEntry(entry) && !existsSync(entry.sourceAbs))

export const findBrokenTargetEntries = (manifest: Manifest): readonly ManifestFileEntry[] =>
  manifest.fileEntries.filter((entry) => {
    if (!isFileSymlinkEntry(entry)) return false
    if (!lstatExists(entry.targetAbs)) return true
    if (!lstatSync(entry.targetAbs).isSymbolicLink()) return true
    return !existsSync(entry.targetAbs)
  })

export const findStaleFileEntries = (
  previousManifest: Manifest | null,
  nextManifest: Manifest,
): readonly ManifestFileEntry[] => {
  if (!previousManifest) return []

  const nextTargets = new Set(nextManifest.fileEntries.map((entry) => entry.targetAbs))
  return previousManifest.fileEntries.filter((entry) => isFileSymlinkEntry(entry) && !nextTargets.has(entry.targetAbs))
}

export const findOrphanedRepoSymlinksInPaths = (
  ctx: Pick<RuntimeContext, "repoRoot" | "homeDir">,
  targetPaths: readonly string[],
): readonly OrphanedRepoSymlinkEntry[] => {
  const repoHome = path.join(ctx.repoRoot, "home")
  const targetSet = new Set(targetPaths)

  return Array.from(targetSet).flatMap((targetAbs) => {
    if (!lstatExists(targetAbs)) return []

    const stat = lstatSync(targetAbs)
    if (!stat.isSymbolicLink()) return []

    const sourceAbs = resolveLinkTarget(targetAbs)
    if (sourceAbs === null) return []
    if (!pathIsWithin(sourceAbs, repoHome)) return []
    if (existsSync(sourceAbs)) return []

    return [{ targetAbs, targetDisplay: displayHomePath(targetAbs, ctx.homeDir), sourceAbs }]
  })
}

export const findOrphanedRepoSymlinks = (_ctx: RuntimeContext): readonly OrphanedRepoSymlinkEntry[] => {
  // Orphan detection previously relied on `chezmoi unmanaged`.
  // Convention engine doesn't have an equivalent yet — return empty for now.
  return []
}

export const pruneStaleFileEntries = (entries: readonly PrunableSymlinkEntry[]): StalePruneSummary => {
  let removed = 0
  let skipped = 0

  for (const entry of entries) {
    if (!lstatExists(entry.targetAbs)) {
      skipped += 1
      continue
    }

    const stat = lstatSync(entry.targetAbs)
    if (!stat.isSymbolicLink()) {
      skipped += 1
      continue
    }

    if (resolveLinkTarget(entry.targetAbs) !== entry.sourceAbs) {
      skipped += 1
      continue
    }

    rmSync(entry.targetAbs, { force: true })
    removed += 1
  }

  return {
    scanned: entries.length,
    removed,
    skipped,
  }
}
