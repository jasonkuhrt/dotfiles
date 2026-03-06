import { existsSync } from "node:fs"
import path from "node:path"

import {
  type PromotionCandidate,
  TRUE_DIRS,
  findTrueDirEntry,
  PROMOTION_CANDIDATES,
  resolveCapturePolicy,
  type CapturePolicy,
  type ExpectedShape,
  type Lane,
} from "./config.js"
import type { RuntimeContext } from "./env.js"
import { timestampUtc } from "./env.js"
import { readJsonFile, writeJsonFile } from "./json.js"
import { displayHomePath, expandUserPath, toHomeRelative, toRepoRelative } from "./paths.js"
import { runChezMoi } from "./chezmoi.js"

interface RawManagedEntry {
  readonly absolute: string
  readonly sourceAbsolute: string
}

export interface ManifestTrueDirEntry {
  readonly lane: "trueDir"
  readonly targetAbs: string
  readonly targetRel: string
  readonly repoAbs: string
  readonly repoRel: string
  readonly expectedShape: "symlinkDir"
  readonly capturePolicy: "ignore"
  readonly note?: string
}

export interface ManifestFileEntry {
  readonly lane: Exclude<Lane, "trueDir">
  readonly targetAbs: string
  readonly targetRel: string
  readonly targetDisplay: string
  readonly sourceAbs: string
  readonly sourceRel: string | null
  readonly expectedShape: ExpectedShape
  readonly capturePolicy: CapturePolicy
}

export interface Manifest {
  readonly version: 1
  readonly generatedAt: string
  readonly repoRoot: string
  readonly homeDir: string
  readonly trueDirs: readonly ManifestTrueDirEntry[]
  readonly fileEntries: readonly ManifestFileEntry[]
  readonly promotionCandidates: readonly PromotionCandidate[]
}

const listManagedEntries = (ctx: RuntimeContext): readonly RawManagedEntry[] => {
  const raw = runChezMoi(ctx, [
    "managed",
    "--mode",
    "file",
    "--include=files",
    "--path-style=all",
    "--format",
    "json",
  ]).stdout
  const parsed = JSON.parse(raw) as Record<string, RawManagedEntry>
  return Object.values(parsed)
}

const expectedSymlinkSource = (ctx: RuntimeContext, targetAbs: string): string | null => {
  const result = runChezMoi(ctx, ["cat", "--mode", "symlink", targetAbs], { allowFailure: true })
  if (result.exitCode !== 0) return null
  const rendered = result.stdout.trim()
  return rendered === "" ? null : rendered
}

export const buildTrueDirEntries = (ctx: RuntimeContext): readonly ManifestTrueDirEntry[] =>
  TRUE_DIRS.map((entry) => ({
    lane: "trueDir",
    targetAbs: path.join(ctx.homeDir, entry.targetRel),
    targetRel: entry.targetRel,
    repoAbs: path.join(ctx.repoRoot, entry.repoRel),
    repoRel: entry.repoRel,
    expectedShape: "symlinkDir",
    capturePolicy: "ignore",
    ...(entry.note ? { note: entry.note } : {}),
  }))

export const generateManifest = (ctx: RuntimeContext): Manifest => ({
  version: 1,
  generatedAt: timestampUtc(),
  repoRoot: ctx.repoRoot,
  homeDir: ctx.homeDir,
  trueDirs: buildTrueDirEntries(ctx),
  fileEntries: listManagedEntries(ctx)
    .map((entry): ManifestFileEntry => {
      const targetRel = toHomeRelative(entry.absolute, ctx.homeDir)
      const expectedLink = expectedSymlinkSource(ctx, entry.absolute)
      const lane: Exclude<Lane, "trueDir"> = expectedLink === entry.sourceAbsolute ? "fileSymlink" : "special"
      return {
        lane,
        targetAbs: entry.absolute,
        targetRel,
        targetDisplay: displayHomePath(entry.absolute, ctx.homeDir),
        sourceAbs: entry.sourceAbsolute,
        sourceRel: toRepoRelative(entry.sourceAbsolute, ctx.repoRoot),
        expectedShape: lane === "fileSymlink" ? "symlinkFile" : "managedOther",
        capturePolicy: resolveCapturePolicy(targetRel, lane),
      }
    })
    .sort((left, right) => left.targetAbs.localeCompare(right.targetAbs)),
  promotionCandidates: PROMOTION_CANDIDATES,
})

export const validateManifest = (ctx: RuntimeContext, manifest: Manifest): readonly string[] => {
  const problems: string[] = []
  if (manifest.repoRoot !== ctx.repoRoot) problems.push(`manifest repo root ${manifest.repoRoot} does not match ${ctx.repoRoot}`)
  if (manifest.homeDir !== ctx.homeDir) problems.push(`manifest home dir ${manifest.homeDir} does not match ${ctx.homeDir}`)

  const seen = new Set<string>()
  for (const entry of manifest.fileEntries) {
    if (seen.has(entry.targetAbs)) problems.push(`duplicate manifest target ${entry.targetAbs}`)
    seen.add(entry.targetAbs)
  }

  for (const entry of manifest.trueDirs) {
    if (!findTrueDirEntry(entry.targetRel)) problems.push(`manifest true-dir ${entry.targetRel} is no longer configured`)
  }

  return problems
}

export const writeManifest = (ctx: RuntimeContext, manifest: Manifest): void => {
  writeJsonFile(ctx.manifestPath, manifest)
}

export const loadManifest = (ctx: RuntimeContext): Manifest => readJsonFile<Manifest>(ctx.manifestPath)

export const resolveManifest = (ctx: RuntimeContext): Manifest => (existsSync(ctx.manifestPath) ? loadManifest(ctx) : generateManifest(ctx))

export const generateAndWriteManifest = (ctx: RuntimeContext): Manifest => {
  const manifest = generateManifest(ctx)
  writeManifest(ctx, manifest)
  return manifest
}

export const findExplainEntry = (ctx: RuntimeContext, manifest: Manifest, target: string): ManifestTrueDirEntry | ManifestFileEntry | null => {
  const targetAbs = expandUserPath(target, ctx.homeDir)
  const targetRel = toHomeRelative(targetAbs, ctx.homeDir)
  const trueDir = findTrueDirEntry(targetRel)
  if (trueDir) {
    return {
      lane: "trueDir",
      targetAbs: path.join(ctx.homeDir, trueDir.targetRel),
      targetRel: trueDir.targetRel,
      repoAbs: path.join(ctx.repoRoot, trueDir.repoRel),
      repoRel: trueDir.repoRel,
      expectedShape: "symlinkDir",
      capturePolicy: "ignore",
      ...(trueDir.note ? { note: trueDir.note } : {}),
    }
  }

  return manifest.fileEntries.find((entry) => entry.targetAbs === targetAbs) ?? null
}
