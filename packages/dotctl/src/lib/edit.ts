import path from "node:path"

import type { RuntimeContext } from "./env.js"
import { expandUserPath, resolveTrueDirRepoPath } from "./paths.js"
import { runChezMoi } from "./chezmoi.js"
import { runInteractive } from "./shell.js"

const runEditor = async (targetPath: string): Promise<number> => {
  const editor = process.env["VISUAL"] ?? process.env["EDITOR"] ?? "vi"
  return runInteractive(["/bin/bash", "-lc", 'eval "exec $EDITOR_CMD \"$TARGET_PATH\""'], {
    env: {
      ...process.env,
      EDITOR_CMD: editor,
      TARGET_PATH: targetPath,
    },
  })
}

export const runEdit = async (ctx: RuntimeContext, target: string): Promise<number> => {
  const repoPath = resolveTrueDirRepoPath(ctx, target)
  if (repoPath) {
    return runEditor(repoPath)
  }

  const targetAbs = expandUserPath(target, ctx.homeDir)
  const result = runChezMoi(ctx, ["source-path", targetAbs], { allowFailure: true })
  if (result.exitCode === 0 && result.stdout.trim() !== "") {
    const sourcePath = result.stdout.trim().split("\n")[0]!
    if (sourcePath.startsWith(path.join(ctx.repoRoot, "home", "private_")) || sourcePath.includes("/encrypted_")) {
      return runInteractive([ctx.chezmoiBin, "edit", targetAbs], { cwd: ctx.repoRoot, env: process.env })
    }
  }

  return runInteractive([ctx.chezmoiBin, "edit", targetAbs], { cwd: ctx.repoRoot, env: process.env })
}
