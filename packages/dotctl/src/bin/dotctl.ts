#!/usr/bin/env bun

import { createRuntimeContext } from "../lib/env.js"
import { runUp } from "../lib/up.js"
import { healOnce } from "../lib/heal.js"
import { renderStatus } from "../lib/status.js"
import { runDoctor } from "../lib/doctor.js"
import { renderExplain } from "../lib/explain.js"
import { runEdit } from "../lib/edit.js"
import { generateAndWriteManifest, resolveManifest } from "../lib/manifest.js"

const USAGE = `dotctl

Usage:
  dotctl up
  dotctl heal [--background]
  dotctl status
  dotctl doctor
  dotctl explain <target>
  dotctl edit <target>
  dotctl manifest [--write]
`.trim()

const main = async (): Promise<number> => {
  const ctx = createRuntimeContext()
  const [command, ...args] = process.argv.slice(2)

  if (!command) {
    console.log(USAGE)
    return 0
  }

  if (command === "up") {
    console.log(runUp(ctx))
    return 0
  }

  if (command === "heal") {
    const background = args.includes("--background")
    const summary = healOnce(ctx, { background, strict: !background })
    console.log(`dotctl heal: scanned=${summary.scanned} healed=${summary.healed} broken=${summary.broken} errors=${summary.errors}`)
    return summary.errors === 0 ? 0 : 1
  }

  if (command === "status") {
    console.log(renderStatus(ctx))
    return 0
  }

  if (command === "doctor") {
    const result = await runDoctor(ctx)
    console.log(result.output)
    return result.ok ? 0 : 1
  }

  if (command === "explain") {
    const target = args[0]
    if (!target) throw new Error("Usage: dotctl explain <target>")
    console.log(renderExplain(ctx, target))
    return 0
  }

  if (command === "edit") {
    const target = args[0]
    if (!target) throw new Error("Usage: dotctl edit <target>")
    return runEdit(ctx, target)
  }

  if (command === "manifest") {
    if (args.includes("--write")) {
      const manifest = generateAndWriteManifest(ctx)
      console.log(`manifest written: ${manifest.generatedAt}`)
    } else {
      console.log(JSON.stringify(resolveManifest(ctx), null, 2))
    }
    return 0
  }

  throw new Error(`Unknown command: ${command}`)
}

main()
  .then((exitCode) => {
    process.exit(exitCode)
  })
  .catch((error: unknown) => {
    if (error instanceof Error) console.error(error.message)
    else console.error(error)
    process.exit(1)
  })
