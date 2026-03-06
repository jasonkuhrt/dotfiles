import { existsSync } from "node:fs"

import type { RuntimeContext } from "./env.js"
import { readJsonFile } from "./json.js"
import { getLaunchdStatus } from "./launchd.js"
import { resolveManifest } from "./manifest.js"
import type { HealSummary, CaptureRecord } from "./heal.js"
import { runCommand } from "./shell.js"
import { findBrokenTargetEntries, findOrphanedRepoSymlinks } from "./stale.js"

interface RepoStatusSummary {
  readonly tracked: number
  readonly untracked: number
}

const readHealth = (ctx: RuntimeContext): HealSummary | null =>
  existsSync(ctx.healthPath) ? readJsonFile<HealSummary>(ctx.healthPath) : null

const readCaptures = (ctx: RuntimeContext): readonly CaptureRecord[] =>
  existsSync(ctx.capturesPath)
    ? readJsonFile<{ readonly entries: readonly CaptureRecord[] }>(ctx.capturesPath).entries
    : []

const repoStatusSummary = (ctx: RuntimeContext): RepoStatusSummary => {
  const output = runCommand(["git", "status", "--porcelain"], { cwd: ctx.repoRoot }).stdout
  let tracked = 0
  let untracked = 0
  for (const line of output.split("\n")) {
    if (!line) continue
    if (line.startsWith("??")) untracked += 1
    else tracked += 1
  }
  return { tracked, untracked }
}

const pendingCaptureReviews = (ctx: RuntimeContext, captures: readonly CaptureRecord[]): readonly CaptureRecord[] => {
  const repoRelative = Array.from(new Set(captures.map((entry) => entry.sourceRel).filter((value): value is string => value !== null)))
  if (repoRelative.length === 0) return []

  const status = runCommand(["git", "status", "--porcelain", "--", ...repoRelative], { cwd: ctx.repoRoot }).stdout
  const dirty = new Set(
    status
      .split("\n")
      .filter(Boolean)
      .map((line) => line.slice(3)),
  )

  return captures.filter((entry) => entry.sourceRel !== null && dirty.has(entry.sourceRel))
}

export const renderStatus = (ctx: RuntimeContext): string => {
  const launchd = getLaunchdStatus(ctx)
  const manifest = resolveManifest(ctx)
  const health = readHealth(ctx)
  const captures = readCaptures(ctx)
  const pending = pendingCaptureReviews(ctx, captures)
  const repo = repoStatusSummary(ctx)
  const brokenCount = findBrokenTargetEntries(manifest).length
  const orphanedSymlinks = findOrphanedRepoSymlinks(ctx)

  const lines = [
    "dotfiles status",
    `manifest: ${manifest.generatedAt}`,
    `launchd: ${launchd.available ? (launchd.loaded ? `${launchd.state ?? "loaded"} (exit ${launchd.lastExitCode ?? "?"})` : "not loaded") : "unavailable"}`,
    health
      ? `heal: last=${health.lastRunAt} scanned=${health.scanned} healed=${health.healed} broken=${health.broken} errors=${health.errors}`
      : "heal: no recorded runs",
    `pending captured review: ${pending.length}`,
    `broken managed symlink targets: ${brokenCount}`,
    `orphaned repo symlink targets: ${orphanedSymlinks.length}`,
    `repo dirty: tracked=${repo.tracked} untracked=${repo.untracked}`,
  ]

  if (pending.length > 0) {
    lines.push("pending capture paths:")
    for (const entry of pending.slice(-5)) {
      lines.push(`  - ${entry.targetDisplay} -> ${entry.sourceRel ?? entry.sourceAbs}`)
    }
  }

  if (orphanedSymlinks.length > 0) {
    lines.push("orphaned repo symlink paths:")
    for (const entry of orphanedSymlinks.slice(-5)) {
      lines.push(`  - ${entry.targetDisplay} -> ${entry.sourceAbs}`)
    }
  }

  return lines.join("\n")
}
