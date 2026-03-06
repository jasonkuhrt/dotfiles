import path from "node:path"

import type { RuntimeContext } from "./env.js"
import { syncChezMoiConfig } from "./env.js"
import { runCommand, type CommandOptions, type CommandResult } from "./shell.js"

const chezmoiEnv = (ctx: RuntimeContext): NodeJS.ProcessEnv => ({
  ...process.env,
  PATH: `${path.dirname(ctx.chezmoiBin)}:/opt/homebrew/bin:/usr/local/bin:${process.env["PATH"] ?? ""}`,
})

export const runChezMoi = (
  ctx: RuntimeContext,
  args: readonly string[],
  options: Omit<CommandOptions, "cwd" | "env"> = {},
): CommandResult => {
  syncChezMoiConfig(ctx)
  return runCommand([ctx.chezmoiBin, ...args], {
    ...options,
    cwd: ctx.repoRoot,
    env: chezmoiEnv(ctx),
  })
}
