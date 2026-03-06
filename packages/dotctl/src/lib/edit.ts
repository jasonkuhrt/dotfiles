import type { RuntimeContext } from "./env.js"
import { expandUserPath, resolveTrueDirRepoPath } from "./paths.js"
import { runInteractive } from "./shell.js"
import { buildDeploymentPlan } from "./conventions.js"

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
  // Check true-dir roots first
  const repoPath = resolveTrueDirRepoPath(ctx, target)
  if (repoPath) {
    return runEditor(repoPath)
  }

  // Look up source in convention plan
  const targetAbs = expandUserPath(target, ctx.homeDir)
  const plan = buildDeploymentPlan(ctx)
  const entry = plan.entries.find((e) => e.targetAbs === targetAbs)
  if (entry) {
    return runEditor(entry.sourceAbs)
  }

  throw new Error(`Cannot resolve source for ${target}`)
}
