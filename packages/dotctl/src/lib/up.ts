import { ensureRuntimeDirs, rotateLogIfLarge } from "./env.js"
import type { RuntimeContext } from "./env.js"
import { buildDeploymentPlan } from "./conventions.js"
import { executeDeploy, formatDeploySummary } from "./deploy.js"
import { buildScriptPlan, runScripts, type ScriptPlan } from "./scripts.js"

const filterPlanByPhase = (plan: ScriptPlan, phase: "before" | "after"): ScriptPlan => ({
  scripts: plan.scripts.filter((s) => s.entry.phase === phase),
})

export const runUp = async (ctx: RuntimeContext): Promise<string> => {
  ensureRuntimeDirs(ctx)
  rotateLogIfLarge(ctx.healLaunchdStdoutPath)
  rotateLogIfLarge(ctx.healLaunchdStderrPath)

  // Phase 1: before scripts
  const scriptPlan = buildScriptPlan(ctx)
  const beforePlan = filterPlanByPhase(scriptPlan, "before")
  const beforeSummary = await runScripts(ctx, beforePlan)

  // Phase 2: convention deploy
  const deployPlan = buildDeploymentPlan(ctx)
  const deploySummary = executeDeploy(ctx, deployPlan, { dryRun: false })

  // Phase 3: after scripts
  const afterPlan = filterPlanByPhase(scriptPlan, "after")
  const afterSummary = await runScripts(ctx, afterPlan)

  const lines = [
    "dotfiles up complete",
    "",
    formatDeploySummary(deploySummary, false),
    `scripts (before): ran=${beforeSummary.ran} skipped=${beforeSummary.skipped} failed=${beforeSummary.failed}`,
    `scripts (after): ran=${afterSummary.ran} skipped=${afterSummary.skipped} failed=${afterSummary.failed}`,
  ]

  if (deploySummary.errors > 0) {
    lines.push("")
    lines.push("Deploy errors:")
    for (const r of deploySummary.results) {
      if (r.action === "error") {
        lines.push(`  ${r.entry.targetRel}: ${r.detail}`)
      }
    }
  }

  return lines.join("\n")
}
