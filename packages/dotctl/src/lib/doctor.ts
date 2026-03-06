import { existsSync } from "node:fs"
import path from "node:path"

import { auditTrueDirRoots } from "./true-dir.js"
import type { RuntimeContext } from "./env.js"
import { getLaunchdStatus } from "./launchd.js"
import { resolveManifest, validateManifest } from "./manifest.js"
import { runCommand } from "./shell.js"
import { runChezMoi } from "./chezmoi.js"
import { findBrokenTargetEntries, findEntriesWithMissingSources, findOrphanedRepoSymlinks } from "./stale.js"

interface DoctorCheck {
  readonly name: string
  readonly ok: boolean
  readonly detail: string
}

const hasCommand = (name: string): boolean =>
  runCommand(["/usr/bin/env", "bash", "-lc", `command -v ${name}`], { allowFailure: true }).exitCode === 0

const checkPrerequisite = (name: string): DoctorCheck => {
  const ok = hasCommand(name)
  return {
    name: `prerequisite:${name}`,
    ok,
    detail: ok ? `${name} found` : `${name} not found`,
  }
}

const checkChezMoiDryRun = (ctx: RuntimeContext): DoctorCheck => {
  const result = runChezMoi(ctx, ["apply", "--mode", "symlink", "--no-tty", "-n"], { allowFailure: true })
  return {
    name: "chezmoi-dry-run",
    ok: result.exitCode === 0,
    detail: result.exitCode === 0 ? "chezmoi dry-run apply succeeded" : (result.stderr.trim() || result.stdout.trim() || "chezmoi dry-run failed"),
  }
}

const checkManifest = (ctx: RuntimeContext): DoctorCheck => {
  const manifest = resolveManifest(ctx)
  const issues = validateManifest(ctx, manifest)
  const missingSourceEntries = findEntriesWithMissingSources(manifest)
  return {
    name: "manifest",
    ok: issues.length === 0 && missingSourceEntries.length === 0,
    detail:
      issues.length === 0 && missingSourceEntries.length === 0
        ? `manifest ok (${manifest.fileEntries.length} files)`
        : [
            ...issues,
            ...missingSourceEntries.map((entry) => `missing source for ${entry.targetDisplay}`),
          ].join("; "),
  }
}

const checkTrueDirAudit = (ctx: RuntimeContext): DoctorCheck => {
  const issues = auditTrueDirRoots(ctx)
  return {
    name: "true-dir-audit",
    ok: issues.length === 0,
    detail: issues.length === 0 ? "no unmanaged spill in true-dir roots" : issues.map((issue) => issue.message).join("; "),
  }
}

const checkBrokenSymlinks = (ctx: RuntimeContext): DoctorCheck => {
  const manifest = resolveManifest(ctx)
  const broken = findBrokenTargetEntries(manifest)
  return {
    name: "broken-symlink-count",
    ok: broken.length === 0,
    detail: broken.length === 0 ? "all expected symlink targets are symlinks" : broken.map((entry) => entry.targetDisplay).join(", "),
  }
}

const checkOrphanedRepoSymlinks = (ctx: RuntimeContext): DoctorCheck => {
  const orphaned = findOrphanedRepoSymlinks(ctx)
  return {
    name: "orphaned-repo-symlinks",
    ok: orphaned.length === 0,
    detail: orphaned.length === 0 ? "no orphaned repo-backed symlink targets" : orphaned.map((entry) => entry.targetDisplay).join(", "),
  }
}

const checkLaunchd = (ctx: RuntimeContext): DoctorCheck => {
  const status = getLaunchdStatus(ctx)
  return {
    name: "launchd",
    ok: status.available && status.loaded && (status.lastExitCode === null || status.lastExitCode === 0),
    detail: status.available ? (status.loaded ? `loaded (${status.state ?? "unknown state"})` : "launch agent not loaded") : "launchctl unavailable",
  }
}

const checkBrewBundle = (ctx: RuntimeContext): DoctorCheck => {
  const brewfile = path.join(ctx.repoRoot, "home", "Brewfile")
  if (!existsSync(brewfile)) return { name: "brew-bundle", ok: true, detail: "no Brewfile" }
  if (!hasCommand("brew")) return { name: "brew-bundle", ok: false, detail: "brew not found" }
  const result = runCommand(["brew", "bundle", "check", `--file=${brewfile}`], { allowFailure: true })
  return {
    name: "brew-bundle",
    ok: result.exitCode === 0,
    detail: result.exitCode === 0 ? "Brewfile satisfied" : (result.stdout.trim() || result.stderr.trim() || "brew bundle check failed"),
  }
}

export const runDoctor = async (ctx: RuntimeContext): Promise<{ readonly ok: boolean; readonly output: string }> => {
  const checks: DoctorCheck[] = [
    checkPrerequisite("chezmoi"),
    checkPrerequisite("bun"),
    checkPrerequisite("just"),
    checkPrerequisite("dprint"),
    checkChezMoiDryRun(ctx),
    checkManifest(ctx),
    checkTrueDirAudit(ctx),
    checkBrokenSymlinks(ctx),
    checkOrphanedRepoSymlinks(ctx),
    checkLaunchd(ctx),
    checkBrewBundle(ctx),
  ]

  const npmGlobalsFile = path.join(ctx.repoRoot, "home", "npm", "global-packages.txt")
  if (existsSync(npmGlobalsFile)) {
    const expected = (await Bun.file(npmGlobalsFile).text())
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .filter((line) => !line.startsWith("#"))
    if (hasCommand("npm")) {
      const installed = JSON.parse(runCommand(["npm", "list", "-g", "--depth=0", "--json"], { allowFailure: true }).stdout || "{}") as {
        readonly dependencies?: Record<string, unknown>
      }
      const installedNames = new Set(Object.keys(installed.dependencies ?? {}))
      const missing = expected.filter((name) => !installedNames.has(name))
      checks.push({
        name: "npm-globals",
        ok: missing.length === 0,
        detail: missing.length === 0 ? "npm global packages satisfied" : `missing: ${missing.join(", ")}`,
      })
    } else {
      checks.push({ name: "npm-globals", ok: false, detail: "npm not found" })
    }
  }

  const ok = checks.every((check) => check.ok)
  const lines = ["dotfiles doctor", ...checks.map((check) => `${check.ok ? "PASS" : "FAIL"} ${check.name}: ${check.detail}`)]
  return { ok, output: lines.join("\n") }
}
