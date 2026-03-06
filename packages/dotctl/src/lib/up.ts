import { existsSync } from "node:fs"
import path from "node:path"

import { ensureRuntimeDirs, rotateLogIfLarge, timestampPath } from "./env.js"
import type { RuntimeContext } from "./env.js"
import { healOnce } from "./heal.js"
import { ensureHealAgentLoaded } from "./launchd.js"
import { generateAndWriteManifest, loadManifest } from "./manifest.js"
import { runChezMoi } from "./chezmoi.js"
import { findOrphanedRepoSymlinks, findStaleFileEntries, pruneStaleFileEntries } from "./stale.js"
import { auditTrueDirRoots, backupTrueDirRoots, needsCutoverPass, writeCutoverMarker } from "./true-dir.js"

export const runUp = (ctx: RuntimeContext): string => {
  ensureRuntimeDirs(ctx)
  rotateLogIfLarge(ctx.healLaunchdStdoutPath)
  rotateLogIfLarge(ctx.healLaunchdStderrPath)

  let backupDir: string | null = null
  if (needsCutoverPass(ctx)) {
    const issues = auditTrueDirRoots(ctx)
    if (issues.length > 0) {
      throw new Error(`true-dir preflight failed: ${issues.map((issue) => issue.message).join("; ")}`)
    }
    backupDir = path.join(ctx.backupRoot, `cutover-${timestampPath()}`)
    backupTrueDirRoots(ctx, backupDir)
  }

  const previousManifest = existsSync(ctx.manifestPath) ? loadManifest(ctx) : null
  const manifest = generateAndWriteManifest(ctx)
  runChezMoi(ctx, ["apply", "--mode", "symlink", "--no-tty"])
  const staleEntries = new Map(
    findStaleFileEntries(previousManifest, manifest).map((entry) => [entry.targetAbs, entry] as const),
  )
  for (const entry of findOrphanedRepoSymlinks(ctx)) {
    staleEntries.set(entry.targetAbs, entry)
  }
  const stalePrune = pruneStaleFileEntries(Array.from(staleEntries.values()))
  ensureHealAgentLoaded(ctx)
  const heal = healOnce(ctx, { background: false, strict: true })
  runChezMoi(ctx, ["apply", "--mode", "symlink", "--no-tty"])

  const auditIssues = auditTrueDirRoots(ctx)
  if (auditIssues.length > 0) {
    throw new Error(`true-dir audit failed: ${auditIssues.map((issue) => issue.message).join("; ")}`)
  }

  if (backupDir) writeCutoverMarker(ctx, backupDir)

  return [
    "dotfiles up complete",
    `manifest: ${manifest.generatedAt}`,
    `stale prune: scanned=${stalePrune.scanned} removed=${stalePrune.removed} skipped=${stalePrune.skipped}`,
    `heal: scanned=${heal.scanned} healed=${heal.healed} broken=${heal.broken} errors=${heal.errors}`,
    backupDir ? `backup: ${backupDir}` : "backup: unchanged",
  ].join("\n")
}
