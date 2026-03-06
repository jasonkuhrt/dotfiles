import { existsSync } from "node:fs"
import path from "node:path"

import type { RuntimeContext } from "./env.js"
import { getLaunchdStatus } from "./launchd.js"
import { runCommand } from "./shell.js"
import { buildDeploymentPlan } from "./conventions.js"
import { executeDeploy } from "./deploy.js"

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

const checkConventionDryRun = (ctx: RuntimeContext): DoctorCheck => {
  const plan = buildDeploymentPlan(ctx)
  if (plan.warnings.length > 0) {
    return {
      name: "convention-plan",
      ok: false,
      detail: plan.warnings.join("; "),
    }
  }
  const summary = executeDeploy(ctx, plan, { dryRun: true })
  return {
    name: "convention-plan",
    ok: summary.errors === 0,
    detail: summary.errors === 0
      ? `plan ok (${plan.entries.length} entries)`
      : `${summary.errors} errors in dry-run deploy`,
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
    checkPrerequisite("bun"),
    checkPrerequisite("just"),
    checkPrerequisite("age"),
    checkConventionDryRun(ctx),
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
