import { createHash } from "node:crypto"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { runCommand } from "./shell.js"

// ---------------------------------------------------------------------------
// Config types (loaded from dotctl.config.json)
// ---------------------------------------------------------------------------

export interface AgeConfig {
  readonly identity: string
  readonly recipient: string
}

export interface HealConfig {
  readonly label: string
  readonly intervalSeconds: number
}

export interface TrueDirEntry {
  readonly targetRel: string
  readonly repoRel: string
  readonly note?: string
}

export interface DotctlConfig {
  readonly sourceDir: string
  readonly scriptsDir: string
  readonly stateDir: string
  readonly homeRootSkip: readonly string[]
  readonly age?: AgeConfig
  readonly heal: HealConfig
  readonly trueDirs: readonly TrueDirEntry[]
}

// ---------------------------------------------------------------------------
// Runtime context
// ---------------------------------------------------------------------------

export interface RuntimeContext {
  readonly repoRoot: string
  readonly homeDir: string
  readonly config: DotctlConfig
  // Resolved paths (derived from config)
  readonly sourceDirAbs: string
  readonly scriptsDirAbs: string
  readonly stateDir: string
  readonly backupRoot: string
  readonly logDir: string
  readonly manifestPath: string
  readonly healthPath: string
  readonly capturesPath: string
  readonly cutoverMarkerPath: string
  readonly healLogPath: string
  readonly healLockDir: string
  readonly healPlistPath: string
  readonly healLaunchdStdoutPath: string
  readonly healLaunchdStderrPath: string
  readonly bunBin: string
  readonly userId: number
}

// ---------------------------------------------------------------------------
// Config loading
// ---------------------------------------------------------------------------

const CONFIG_DEFAULTS: Pick<DotctlConfig, "sourceDir" | "scriptsDir" | "stateDir" | "homeRootSkip" | "heal" | "trueDirs"> = {
  sourceDir: "home",
  scriptsDir: "scripts/setup",
  stateDir: "~/.local/state/dotctl",
  homeRootSkip: [],
  heal: { label: "dotctl-heal", intervalSeconds: 300 },
  trueDirs: [],
}

const expandHome = (p: string, homeDir: string): string =>
  p.startsWith("~/") ? path.join(homeDir, p.slice(2)) : p

const resolveDir = (dir: string, repoRoot: string, homeDir: string): string => {
  if (dir.startsWith("~/")) return expandHome(dir, homeDir)
  if (path.isAbsolute(dir)) return dir
  return path.join(repoRoot, dir)
}

export const loadDotctlConfig = (configPath: string, _repoRoot: string, homeDir: string): DotctlConfig => {
  let raw: Record<string, unknown> = {}
  try {
    raw = JSON.parse(readFileSync(configPath, "utf8"))
  } catch {
    // Missing or unparseable config — use defaults
  }

  const sourceDir = typeof raw["sourceDir"] === "string" ? raw["sourceDir"] : CONFIG_DEFAULTS.sourceDir
  const scriptsDir = typeof raw["scriptsDir"] === "string" ? raw["scriptsDir"] : CONFIG_DEFAULTS.scriptsDir
  const stateDir = typeof raw["stateDir"] === "string" ? raw["stateDir"] : CONFIG_DEFAULTS.stateDir
  const homeRootSkip = Array.isArray(raw["homeRootSkip"]) ? (raw["homeRootSkip"] as string[]) : CONFIG_DEFAULTS.homeRootSkip

  let age: AgeConfig | undefined
  if (raw["age"] && typeof raw["age"] === "object") {
    const ageRaw = raw["age"] as Record<string, unknown>
    if (typeof ageRaw["identity"] === "string" && typeof ageRaw["recipient"] === "string") {
      age = {
        identity: expandHome(ageRaw["identity"] as string, homeDir),
        recipient: ageRaw["recipient"] as string,
      }
    }
  }

  let heal: HealConfig = CONFIG_DEFAULTS.heal
  if (raw["heal"] && typeof raw["heal"] === "object") {
    const healRaw = raw["heal"] as Record<string, unknown>
    heal = {
      label: typeof healRaw["label"] === "string" ? healRaw["label"] : CONFIG_DEFAULTS.heal.label,
      intervalSeconds: typeof healRaw["intervalSeconds"] === "number" ? healRaw["intervalSeconds"] : CONFIG_DEFAULTS.heal.intervalSeconds,
    }
  }

  const trueDirs: readonly TrueDirEntry[] = Array.isArray(raw["trueDirs"])
    ? (raw["trueDirs"] as Array<Record<string, unknown>>).map((entry) => ({
        targetRel: entry["targetRel"] as string,
        repoRel: entry["repoRel"] as string,
        ...(entry["note"] ? { note: entry["note"] as string } : {}),
      }))
    : CONFIG_DEFAULTS.trueDirs

  return { sourceDir, scriptsDir, stateDir, homeRootSkip, ...(age ? { age } : {}), heal, trueDirs }
}

// ---------------------------------------------------------------------------
// Context creation
// ---------------------------------------------------------------------------

const repoRootFromModule = (): string => fileURLToPath(new URL("../../../../", import.meta.url))

const LOG_ROTATE_MAX_BYTES = 256 * 1024

export const createRuntimeContext = (configPath?: string): RuntimeContext => {
  const homeDir = process.env["HOME"] ?? os.homedir()
  const repoRoot = process.env["DOTFILES_REPO_ROOT"] ?? repoRootFromModule()
  const resolvedConfigPath = configPath ?? path.join(repoRoot, "dotctl.config.json")
  const config = loadDotctlConfig(resolvedConfigPath, repoRoot, homeDir)

  const stateDir = resolveDir(config.stateDir, repoRoot, homeDir)
  const logDir = path.join(stateDir, "logs")

  return {
    repoRoot,
    homeDir,
    config,
    sourceDirAbs: resolveDir(config.sourceDir, repoRoot, homeDir),
    scriptsDirAbs: resolveDir(config.scriptsDir, repoRoot, homeDir),
    stateDir,
    backupRoot: path.join(stateDir, "backups"),
    logDir,
    manifestPath: path.join(stateDir, "manifest.json"),
    healthPath: path.join(stateDir, "health.json"),
    capturesPath: path.join(stateDir, "captures.json"),
    cutoverMarkerPath: path.join(stateDir, "cutover-v1.json"),
    healLogPath: path.join(logDir, "heal.log"),
    healLockDir: path.join(stateDir, "heal.lock"),
    healPlistPath: path.join(homeDir, "Library", "LaunchAgents", `${config.heal.label}.plist`),
    healLaunchdStdoutPath: path.join(logDir, "heal-launchd.out.log"),
    healLaunchdStderrPath: path.join(logDir, "heal-launchd.err.log"),
    bunBin: process.execPath,
    userId: process.getuid?.() ?? Number(runCommand(["id", "-u"]).stdout.trim()),
  }
}

export const ensureRuntimeDirs = (ctx: RuntimeContext): void => {
  mkdirSync(ctx.stateDir, { recursive: true })
  mkdirSync(ctx.backupRoot, { recursive: true })
  mkdirSync(ctx.logDir, { recursive: true })
}

export const timestampUtc = (): string => new Date().toISOString()

export const timestampPath = (): string => timestampUtc().replaceAll(":", "").replaceAll("-", "").replace(".000Z", "Z")

export const sha256 = (value: string): string => createHash("sha256").update(value).digest("hex")

export const rotateLogIfLarge = (filePath: string): void => {
  if (!existsSync(filePath)) return
  const content = readFileSync(filePath)
  if (content.byteLength <= LOG_ROTATE_MAX_BYTES) return
  writeFileSync(`${filePath}.1`, content)
  writeFileSync(filePath, "", "utf8")
}
