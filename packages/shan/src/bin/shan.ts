#!/usr/bin/env bun
/**
 * shan - Claude Code tooling CLI (named after Claude Shannon)
 *
 * Usage:
 *   shan <namespace> <command> [args...]
 *
 * Namespaces:
 *   transcript    Transcript manipulation commands
 *   task          Task list inspection commands
 */

import { Console, Effect } from "effect"
import { transcriptDump } from "./transcript/dump.js"
import { transcriptAnalyze } from "./transcript/analyze.js"
import { transcriptPrint } from "./transcript/print.js"
import { taskDump } from "./task/dump.js"
import { taskOpen } from "./task/open.js"

const USAGE = `
shan - Claude Code tooling CLI

Usage:
  shan <namespace> <command> [target] [options]

Namespaces:
  transcript    Transcript manipulation commands
  task          Task list inspection commands

Commands:
  shan transcript print [target]        Print readable conversation log
  shan transcript dump [target]         Dump transcript as navigable Markdown
  shan transcript dump --raw [target]   Copy raw JSONL without transformation
  shan transcript analyze [target]      Visualize context consumption

  shan task dump [target]               Copy task JSON into project
  shan task dump --md [target]          Convert tasks to Markdown
  shan task open [target]               Open task list or file in editor

Options:
  --all              Show all sessions/task lists (default: current project only)
  --show <layers>    Add detail layers to print: results,diffs,thinking,trace,all
                     Comma-separated or repeated (--show a --show b)

Transcript target:
  - Session ID (or prefix): abc123, 9ba30f6f-...
  - File path: ./file.jsonl, /path/to/file.jsonl, ~/file.jsonl
  - Omit for interactive picker (requires TTY)

Task target:
  - List name or UUID prefix: test-schema, 21b0
  - List + task: test-schema@3, 21b0@1
  - Subject search: @Scaffold
  - Omit for interactive picker (requires TTY)
`.trim()

/**
 * Parse args, extracting known flags and returning the remaining positional args.
 */
const parseArgs = (args: string[]) => {
  const flags = {
    raw: false,
    all: false,
    md: false,
    show: [] as string[],
  }
  const positional: string[] = []

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]!
    if (arg === "--raw") flags.raw = true
    else if (arg === "--all") flags.all = true
    else if (arg === "--md") flags.md = true
    else if (arg.startsWith("--show=")) flags.show.push(arg.slice(7))
    else if (arg === "--show" && i + 1 < args.length) {
      flags.show.push(args[++i]!)
    } else positional.push(arg)
  }

  return { flags, positional }
}

const program = Effect.gen(function* () {
  const [namespace, command, ...args] = process.argv.slice(2)

  if (!namespace) {
    yield* Console.log(USAGE)
    return
  }

  if (namespace === "transcript") {
    const { flags, positional } = parseArgs(args)

    if (command === "print") {
      yield* transcriptPrint(positional[0], { show: flags.show, all: flags.all })
    } else if (command === "dump") {
      yield* transcriptDump(positional[0], { raw: flags.raw, all: flags.all })
    } else if (command === "analyze") {
      yield* transcriptAnalyze(positional[0], { all: flags.all })
    } else {
      yield* Console.error(`Unknown transcript command: ${command}`)
      yield* Console.log("\nAvailable commands:\n  print <session-id>      Print readable conversation log\n  dump <session-id>       Dump transcript as navigable Markdown\n  analyze <session-id>    Visualize context consumption")
      return yield* Effect.fail(new Error("Unknown command"))
    }
  } else if (namespace === "task") {
    const { flags, positional } = parseArgs(args)

    if (command === "dump") {
      yield* taskDump(positional[0], { md: flags.md, all: flags.all })
    } else if (command === "open") {
      yield* taskOpen(positional[0], { all: flags.all })
    } else {
      yield* Console.error(`Unknown task command: ${command}`)
      yield* Console.log("\nAvailable commands:\n  dump [target]    Copy task JSON into project\n  open [target]    Open task list or file in editor")
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
