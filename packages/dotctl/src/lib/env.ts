import { createHash } from "node:crypto"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { LOG_ROTATE_MAX_BYTES } from "./config.js"
import { runCommand } from "./shell.js"

export interface AgeConfig {
  readonly identity: string
  readonly recipient: string
}

export interface DotctlConfig {
  readonly age?: AgeConfig
}

export interface RuntimeContext {
  readonly repoRoot: string
  readonly homeDir: string
  readonly stateDir: string
  readonly backupRoot: string
  readonly logDir: string
  readonly manifestPath: string
  readonly healthPath: string
  readonly capturesPath: string
  readonly cutoverMarkerPath: string
  readonly healLogPath: string
  readonly healLockDir: string
  readonly healLabel: string
  readonly healPlistPath: string
  readonly healLaunchdStdoutPath: string
  readonly healLaunchdStderrPath: string
  readonly bunBin: string
  readonly userId: number
  readonly config: DotctlConfig
}

const repoRootFromModule = (): string => fileURLToPath(new URL("../../../../", import.meta.url))

const loadDotctlConfig = (repoRoot: string, homeDir: string): DotctlConfig => {
  const configPath = path.join(repoRoot, "dotctl.config.json")
  try {
    const raw = JSON.parse(readFileSync(configPath, "utf8"))
    if (raw.age) {
      const identity = (raw.age.identity as string).replace(/^~/, homeDir)
      return { age: { identity, recipient: raw.age.recipient } }
    }
    return {}
  } catch {
    return {}
  }
}

export const createRuntimeContext = (): RuntimeContext => {
  const homeDir = process.env["HOME"] ?? os.homedir()
  const repoRoot = process.env["DOTFILES_REPO_ROOT"] ?? repoRootFromModule()
  const stateDir = process.env["DOTFILES_STATE_DIR"] ?? path.join(homeDir, ".local", "state", "dotfiles-symlink")
  const logDir = path.join(stateDir, "logs")
  const healLabel = "com.jasonkuhrt.chezmoi-symlink-heal"

  return {
    repoRoot,
    homeDir,
    stateDir,
    backupRoot: path.join(stateDir, "backups"),
    logDir,
    manifestPath: path.join(stateDir, "manifest.json"),
    healthPath: path.join(stateDir, "health.json"),
    capturesPath: path.join(stateDir, "captures.json"),
    cutoverMarkerPath: path.join(stateDir, "cutover-v1.json"),
    healLogPath: path.join(logDir, "heal.log"),
    healLockDir: path.join(stateDir, "heal.lock"),
    healLabel,
    healPlistPath: path.join(homeDir, "Library", "LaunchAgents", `${healLabel}.plist`),
    healLaunchdStdoutPath: path.join(logDir, "heal-launchd.out.log"),
    healLaunchdStderrPath: path.join(logDir, "heal-launchd.err.log"),
    bunBin: process.execPath,
    userId: process.getuid?.() ?? Number(runCommand(["id", "-u"]).stdout.trim()),
    config: loadDotctlConfig(repoRoot, homeDir),
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
