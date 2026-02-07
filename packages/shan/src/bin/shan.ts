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
 *   skills        Skill library and outfit management
 */

import { Console, Effect } from "effect"
import { transcriptDump } from "./transcript/dump.js"
import { transcriptAnalyze } from "./transcript/analyze.js"
import { transcriptPrint } from "./transcript/print.js"
import { taskDump } from "./task/dump.js"
import { taskOpen } from "./task/open.js"
import { skillsOn } from "./skills/on.js"
import { skillsOff } from "./skills/off.js"
import { skillsList } from "./skills/list.js"
import { skillsHistory } from "./skills/history.js"
import { skillsUndo } from "./skills/undo.js"
import { skillsRedo } from "./skills/redo.js"
import { skillsDoctor } from "./skills/doctor.js"
import { skillsMigrate } from "./skills/migrate.js"
import { skillsMove } from "./skills/move.js"
import type { MoveAxis, MoveDirection } from "./skills/move.js"
import type { Scope } from "../lib/skill-library.js"

const USAGE = `
shan - Claude Code tooling CLI

Usage:
  shan <namespace> <command> [target] [options]

Namespaces:
  transcript    Transcript manipulation commands
  task          Task list inspection commands
  skills        Skill library and outfit management

Commands:
  shan transcript print [target]        Print readable conversation log
  shan transcript dump [target]         Dump transcript as navigable Markdown
  shan transcript dump --raw [target]   Copy raw JSONL without transformation
  shan transcript analyze [target]      Visualize context consumption

  shan task dump [target]               Copy task JSON into project
  shan task dump --md [target]          Convert tasks to Markdown
  shan task open [target]               Open task list or file in editor

  shan skills                           Show outfit (default: list)
  shan skills on <targets>              Turn on skills/groups (comma-separated)
  shan skills off [targets]             Turn off skills/groups (no targets = reset all)
  shan skills move <axis> <dir> <tgt>   Migrate between scopes or commitments
  shan skills list                      Show effective outfit across all layers
  shan skills history                   Show operation log
  shan skills undo [N]                  Undo last N operations (default: 1)
  shan skills redo [N]                  Redo last N undone operations (default: 1)
  shan skills doctor                    Run health checks

Options:
  --all                Show all sessions/task lists (default: current project only)
  --show <layers>      Add detail layers to print: results,diffs,thinking,trace,all
  --scope user         Operate on user outfit (default: project)
  --global             Alias for --scope user
  --strict             Report no-ops as errors

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

const SKILLS_USAGE = `
Available commands:
  on <targets>              Turn on skills/groups (comma-separated)
  off [targets]             Turn off skills/groups (no targets = reset all)
  move <axis> <dir> <tgt>   Migrate between scopes or commitments
  list                      Show effective outfit across all layers
  history                   Show operation log
  undo [N]                  Undo last N operations
  redo [N]                  Redo last N undone operations
  doctor [--no-fix]         Run health checks
  migrate [--execute]       Migrate from flat inventory to hierarchical library

Options:
  --scope user | --global   Operate on user outfit (default: project)
  --strict                  Report no-ops as errors
`.trim()

/**
 * Parse args, extracting known flags and returning the remaining positional args.
 */
interface ParsedFlags {
  raw: boolean
  all: boolean
  md: boolean
  execute: boolean
  strict: boolean
  global: boolean
  noFix: boolean
  show: string[]
  scope: string
}

const parseArgs = (args: string[]) => {
  const flags: ParsedFlags = {
    raw: false,
    all: false,
    md: false,
    execute: false,
    strict: false,
    global: false,
    noFix: false,
    show: [],
    scope: "",
  }
  const positional: string[] = []

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]!
    if (arg === "--raw") flags.raw = true
    else if (arg === "--all") flags.all = true
    else if (arg === "--md") flags.md = true
    else if (arg === "--execute") flags.execute = true
    else if (arg === "--strict") flags.strict = true
    else if (arg === "--global") flags.global = true
    else if (arg === "--no-fix") flags.noFix = true
    else if (arg === "--scope" && i + 1 < args.length) {
      flags.scope = args[++i]!
    } else if (arg.startsWith("--scope=")) {
      flags.scope = arg.slice(8)
    } else if (arg.startsWith("--show=")) flags.show.push(arg.slice(7))
    else if (arg === "--show" && i + 1 < args.length) {
      flags.show.push(args[++i]!)
    } else positional.push(arg)
  }

  return { flags, positional }
}

const resolveScope = (flags: ParsedFlags): Scope =>
  flags.global ? "user" : (flags.scope === "user" ? "user" : "project")

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
  } else if (namespace === "skills") {
    const { flags, positional } = parseArgs(args)
    const scope = resolveScope(flags)

    if (command === "on") {
      yield* skillsOn(positional[0] ?? "", { scope, strict: flags.strict })
    } else if (command === "off") {
      yield* skillsOff(positional[0] ?? "", { scope, strict: flags.strict })
    } else if (command === "move") {
      const axis = positional[0] as MoveAxis | undefined
      const direction = positional[1] as MoveDirection | undefined
      const moveTargets = positional[2] ?? ""
      if (!axis || !direction || !["scope", "commitment"].includes(axis) || !["up", "down"].includes(direction)) {
        yield* Console.error("Usage: shan skills move <scope|commitment> <up|down> <targets>")
        return yield* Effect.fail(new Error("Missing targets"))
      }
      yield* skillsMove(axis, direction, moveTargets, { scope, strict: flags.strict })
    } else if (command === "list" || !command) {
      yield* skillsList()
    } else if (command === "history") {
      yield* skillsHistory(scope)
    } else if (command === "undo") {
      yield* skillsUndo(Number(positional[0]) || 1, scope)
    } else if (command === "redo") {
      yield* skillsRedo(Number(positional[0]) || 1, scope)
    } else if (command === "doctor") {
      yield* skillsDoctor({ noFix: flags.noFix })
    } else if (command === "migrate") {
      yield* skillsMigrate({ execute: flags.execute })
    } else {
      yield* Console.error(`Unknown skills command: ${command}`)
      yield* Console.log("\n" + SKILLS_USAGE)
      return yield* Effect.fail(new Error("Unknown command"))
    }
  } else {
    yield* Console.error(`Unknown namespace: ${namespace}`)
    yield* Console.log(USAGE)
    return yield* Effect.fail(new Error("Unknown namespace"))
  }
})

const QUIET_ERRORS = new Set([
  "Unknown command",
  "Unknown namespace",
  "Missing targets",
  "Library not found",
  "Some targets failed",
])

Effect.runPromise(program).catch((err: unknown) => {
  if (err instanceof Error && !QUIET_ERRORS.has(err.message)) {
    console.error(err)
  }
  process.exit(1)
})
