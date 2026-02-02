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
import * as SyncModule from "../lib/sync.js"
import * as YamlModule from "../lib/yaml.js"
import * as Fs from "node:fs/promises"
import * as path from "node:path"

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
    case "pull": {
      // One-way: browsers -> YAML (wipe YAML, then sync from scratch)
      const { flags: pullFlags } = parseArgs(args)
      const pullYamlPath = path.resolve(import.meta.dirname, "../../../..", "bookmarks/bookmarks.yaml")
      const safariPlistPath = path.resolve(
        process.env["HOME"] ?? "",
        "Library/Safari/Bookmarks.plist",
      )

      // Wipe existing YAML for clean pull (git baseline will be empty after this)
      yield* Effect.tryPromise({
        try: () => Fs.rm(pullYamlPath, { force: true }),
        catch: () => new Error("Failed to remove bookmarks.yaml"),
      }).pipe(Effect.catchAll(() => Effect.void))

      const pullResult = yield* SyncModule.sync({
        yamlPath: pullYamlPath,
        safariPlistPath,
        dryRun: pullFlags.dryRun,
      })
      yield* Console.log(`\nPull complete: ${pullResult.applied.length} bookmarks synced`)
      break
    }
    case "sync": {
      const { flags: syncFlags } = parseArgs(args)
      const syncYamlPath = path.resolve(import.meta.dirname, "../../../..", "bookmarks/bookmarks.yaml")
      const syncSafariPlistPath = path.resolve(
        process.env["HOME"] ?? "",
        "Library/Safari/Bookmarks.plist",
      )
      const syncResult = yield* SyncModule.sync({
        yamlPath: syncYamlPath,
        safariPlistPath: syncSafariPlistPath,
        dryRun: syncFlags.dryRun,
      })
      yield* Console.log(`\nSync complete: ${syncResult.applied.length} applied, ${syncResult.graveyarded.length} graveyarded`)
      break
    }
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
    case "validate": {
      const yamlPath = path.resolve(import.meta.dirname, "../../../..", "bookmarks/bookmarks.yaml")
      yield* YamlModule.load(yamlPath).pipe(
        Effect.flatMap(() => Console.log("bookmarks.yaml is valid")),
        Effect.catchAll((e) => Console.error(e.message)),
      )
      break
    }
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
