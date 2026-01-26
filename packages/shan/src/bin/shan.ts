#!/usr/bin/env bun
/**
 * shan - Claude Code tooling CLI (named after Claude Shannon)
 *
 * Usage:
 *   shan <namespace> <command> [args...]
 *
 * Namespaces:
 *   transcript    Transcript manipulation commands
 */

import { Console, Effect } from "effect"
import { transcriptDump } from "./transcript/dump.js"
import { transcriptAnalyze } from "./transcript/analyze.js"

const USAGE = `
shan - Claude Code tooling CLI

Usage:
  shan <namespace> <command> [args...]

Namespaces:
  transcript    Transcript manipulation commands

Commands:
  shan transcript dump <session-id>       Dump transcript as navigable Markdown
  shan transcript analyze <session-id>    Visualize context consumption
`.trim()

const program = Effect.gen(function* () {
  const [namespace, command, ...args] = process.argv.slice(2)

  if (!namespace) {
    yield* Console.log(USAGE)
    return
  }

  if (namespace === "transcript") {
    if (command === "dump") {
      yield* transcriptDump(args[0])
    } else if (command === "analyze") {
      yield* transcriptAnalyze(args[0])
    } else {
      yield* Console.error(`Unknown transcript command: ${command}`)
      yield* Console.log("\nAvailable commands:\n  dump <session-id>       Dump transcript as navigable Markdown\n  analyze <session-id>    Visualize context consumption")
      return yield* Effect.fail(new Error("Unknown command"))
    }
  } else {
    yield* Console.error(`Unknown namespace: ${namespace}`)
    yield* Console.log(USAGE)
    return yield* Effect.fail(new Error("Unknown namespace"))
  }
})

Effect.runPromise(program).catch((err: unknown) => {
  if (err instanceof Error && err.message !== "Unknown command" && err.message !== "Unknown namespace") {
    console.error(err)
  }
  process.exit(1)
})
