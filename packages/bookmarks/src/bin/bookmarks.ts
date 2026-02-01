#!/usr/bin/env bun
/**
 * bookmarks - Cross-browser bookmark sync from dotfiles
 *
 * Usage:
 *   bookmarks <command> [options]
 *
 * Commands:
 *   push        YAML -> browsers
 *   pull        browsers -> YAML
 *   sync        bidirectional (pull then push)
 *   status      show current state
 *   backup      timestamped backups
 *   gc          clean graveyard
 *   daemon      launchd lifecycle
 *   validate    schema check only
 */

import { Console, Effect } from "effect"

const USAGE = `
bookmarks - Cross-browser bookmark sync from dotfiles

Usage:
  bookmarks <command> [options]

Commands:
  bookmarks push [--dry-run]             YAML -> browsers
  bookmarks pull [--dry-run]             browsers -> YAML
  bookmarks sync [--dry-run]             bidirectional (pull then push)
  bookmarks status                       show current state
  bookmarks backup                       timestamped backups
  bookmarks gc [--max-age=90d]           clean graveyard
  bookmarks daemon start|stop|status     launchd lifecycle
  bookmarks validate                     schema check only
`.trim()

const parseArgs = (args: string[]) => {
  const flags = {
    dryRun: false,
    maxAge: "90d",
  }
  const positional: string[] = []

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]!
    if (arg === "--dry-run") flags.dryRun = true
    else if (arg.startsWith("--max-age=")) flags.maxAge = arg.slice(10)
    else if (arg === "--max-age" && i + 1 < args.length) {
      flags.maxAge = args[++i]!
    } else positional.push(arg)
  }

  return { flags, positional }
}

const notImplemented = (command: string) =>
  Console.error(`Command '${command}' is not yet implemented.`)

const program = Effect.gen(function* () {
  const [command, ...args] = process.argv.slice(2)

  if (!command) {
    yield* Console.log(USAGE)
    return
  }

  const { positional } = parseArgs(args)

  switch (command) {
    case "push":
      yield* notImplemented("push")
      break
    case "pull":
      yield* notImplemented("pull")
      break
    case "sync":
      yield* notImplemented("sync")
      break
    case "status":
      yield* notImplemented("status")
      break
    case "backup":
      yield* notImplemented("backup")
      break
    case "gc":
      yield* notImplemented("gc")
      break
    case "daemon": {
      const subcommand = positional[0]
      if (!subcommand || !["start", "stop", "status"].includes(subcommand)) {
        yield* Console.error("Usage: bookmarks daemon start|stop|status")
        return yield* Effect.fail(new Error("Invalid daemon subcommand"))
      }
      yield* notImplemented(`daemon ${subcommand}`)
      break
    }
    case "validate":
      yield* notImplemented("validate")
      break
    default:
      yield* Console.error(`Unknown command: ${command}`)
      yield* Console.log(USAGE)
      return yield* Effect.fail(new Error("Unknown command"))
  }
})

Effect.runPromise(program).catch((err: unknown) => {
  if (err instanceof Error && err.message !== "Unknown command" && err.message !== "Invalid daemon subcommand") {
    console.error(err)
  }
  process.exit(1)
})
