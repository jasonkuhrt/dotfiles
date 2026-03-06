import { existsSync } from "node:fs"
import path from "node:path"

import { HEAL_INTERVAL_SECONDS } from "./config.js"
import type { RuntimeContext } from "./env.js"
import { runCommand } from "./shell.js"

export interface LaunchdStatus {
  readonly available: boolean
  readonly loaded: boolean
  readonly state: string | null
  readonly lastExitCode: number | null
  readonly raw: string
}

export const renderHealPlist = (ctx: RuntimeContext): string => `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${ctx.healLabel}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${ctx.bunBin}</string>
    <string>${path.join(ctx.repoRoot, "packages", "dotctl", "src", "bin", "dotctl.ts")}</string>
    <string>heal</string>
    <string>--background</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${ctx.repoRoot}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>PATH</key>
    <string>/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>StartInterval</key>
  <integer>${HEAL_INTERVAL_SECONDS}</integer>
  <key>StandardOutPath</key>
  <string>${ctx.healLaunchdStdoutPath}</string>
  <key>StandardErrorPath</key>
  <string>${ctx.healLaunchdStderrPath}</string>
</dict>
</plist>
`

export const getLaunchdStatus = (ctx: RuntimeContext): LaunchdStatus => {
  const launchctl = runCommand(["/usr/bin/env", "bash", "-lc", "command -v launchctl"], { allowFailure: true })
  if (launchctl.exitCode !== 0) {
    return { available: false, loaded: false, state: null, lastExitCode: null, raw: "launchctl unavailable" }
  }

  const result = runCommand(["launchctl", "print", `gui/${ctx.userId}/${ctx.healLabel}`], { allowFailure: true })
  if (result.exitCode !== 0) {
    return { available: true, loaded: false, state: null, lastExitCode: null, raw: result.stderr || result.stdout }
  }

  const state = result.stdout.match(/state = ([^\n]+)/)?.[1]?.trim() ?? null
  const lastExit = result.stdout.match(/last exit code = ([0-9]+)/)?.[1]
  return {
    available: true,
    loaded: true,
    state,
    lastExitCode: lastExit ? Number(lastExit) : null,
    raw: result.stdout,
  }
}

export const ensureHealAgentLoaded = (ctx: RuntimeContext): void => {
  if (!existsSync(ctx.healPlistPath)) {
    throw new Error(`missing launchd plist at ${ctx.healPlistPath}; run chezmoi apply`)
  }
  runCommand(["launchctl", "unload", ctx.healPlistPath], { allowFailure: true })
  runCommand(["launchctl", "load", "-w", ctx.healPlistPath])
}
