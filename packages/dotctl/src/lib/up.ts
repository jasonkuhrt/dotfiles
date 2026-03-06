import path from "node:path"

import { ensureRuntimeDirs, rotateLogIfLarge, timestampPath } from "./env.js"
import type { RuntimeContext } from "./env.js"
import { healOnce } from "./heal.js"
import { ensureHealAgentLoaded } from "./launchd.js"
import { generateAndWriteManifest } from "./manifest.js"
import { runChezMoi } from "./chezmoi.js"
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

  const manifest = generateAndWriteManifest(ctx)
  runChezMoi(ctx, ["apply", "--mode", "symlink", "--no-tty"])
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
    `heal: scanned=${heal.scanned} healed=${heal.healed} broken=${heal.broken} errors=${heal.errors}`,
    backupDir ? `backup: ${backupDir}` : "backup: unchanged",
  ].join("\n")
}
