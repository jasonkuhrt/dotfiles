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

import { Cause, Console, Data, DateTime, Effect, Exit, Option } from "effect"

/** Expected CLI exits where the user has already been informed. */
class CliExitError extends Data.TaggedError("CliExitError")<{}> {
  static is = (u: unknown): u is CliExitError =>
    u != null && typeof u === "object" && "_tag" in u && u._tag === "CliExitError"
}
import * as Daemon from "../lib/daemon.js"
import * as Doctor from "../lib/doctor.js"
import * as Paths from "../lib/paths.js"
import * as SyncModule from "../lib/sync.js"
import * as YamlModule from "../lib/yaml.js"
import { BookmarkTree, BookmarksConfig, TargetProfile } from "../lib/schema/__.js"

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
  bookmarks doctor                       pre-flight diagnostics
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
  Effect.gen(function* () {
    yield* Console.error(`Command '${command}' is not yet implemented.`)
    return yield* Effect.fail(new CliExitError())
  })

const makeDefaultConfig = (safariPlistPath: string): BookmarksConfig =>
  BookmarksConfig.make({
    targets: {
      safari: {
        default: TargetProfile.make({ path: safariPlistPath }),
      },
    },
    base: BookmarkTree.make({}),
  })

const loadConfigOrDefault = (yamlPath: string): Effect.Effect<BookmarksConfig, Error> =>
  YamlModule.load(yamlPath).pipe(
    Effect.catchAll(() => Effect.succeed(makeDefaultConfig(Paths.defaultSafariPlistPath()))),
  )

const resolveSafariPlistPath = (config: BookmarksConfig): string =>
  config.targets.safari?.default?.path ?? Paths.defaultSafariPlistPath()

const program = Effect.gen(function* () {
  const [command, ...args] = process.argv.slice(2)

  if (!command) {
    yield* Console.log(USAGE)
    return
  }

  const { positional } = parseArgs(args)

  switch (command) {
    case "push":
      return yield* notImplemented("push")
    case "pull": {
      // One-way: browsers -> YAML using an empty in-memory YAML tree as the source.
      const { flags: pullFlags } = parseArgs(args)
      const pullYamlPath = Paths.defaultYamlPath()
      const currentConfig = yield* loadConfigOrDefault(pullYamlPath)
      const safariPlistPath = resolveSafariPlistPath(currentConfig)

      const pullResult = yield* SyncModule.sync({
        yamlPath: pullYamlPath,
        safariPlistPath,
        dryRun: pullFlags.dryRun,
        yamlOverride: BookmarksConfig.make({
          targets: currentConfig.targets,
          base: BookmarkTree.make({}),
          profiles: currentConfig.profiles,
        }),
      })
      yield* Console.log(`\nPull complete: ${pullResult.applied.length} bookmarks synced`)
      break
    }
    case "sync": {
      const { flags: syncFlags } = parseArgs(args)
      const syncYamlPath = Paths.defaultYamlPath()
      const currentConfig = yield* loadConfigOrDefault(syncYamlPath)
      const syncSafariPlistPath = resolveSafariPlistPath(currentConfig)
      const syncResult = yield* SyncModule.sync({
        yamlPath: syncYamlPath,
        safariPlistPath: syncSafariPlistPath,
        dryRun: syncFlags.dryRun,
      })
      yield* Console.log(`\nSync complete: ${syncResult.applied.length} applied, ${syncResult.graveyarded.length} graveyarded`)
      break
    }
    case "status":
      return yield* notImplemented("status")
    case "backup":
      return yield* notImplemented("backup")
    case "gc":
      return yield* notImplemented("gc")
    case "daemon": {
      const subcommand = positional[0]
      if (!subcommand || !["start", "stop", "status"].includes(subcommand)) {
        yield* Console.error("Usage: bookmarks daemon start|stop|status")
        return yield* Effect.fail(new CliExitError())
      }
      switch (subcommand) {
        case "start": {
          const config = yield* Daemon.defaultConfig()
          yield* Daemon.start(config)
          yield* Console.log(`Daemon started (interval: 1h, plist: ~/Library/LaunchAgents/com.jasonkuhrt.bookmarks-sync.plist)`)
          break
        }
        case "stop": {
          yield* Daemon.stop()
          yield* Console.log("Daemon stopped and plist removed.")
          break
        }
        case "status": {
          const st = yield* Daemon.status()
          const formatOptDate = (opt: Option.Option<DateTime.Utc>) =>
            Option.isSome(opt) ? opt.value.toJSON() : "unknown"
          yield* Console.log(`Daemon status:`)
          yield* Console.log(`  Running:  ${st.running ? "yes" : "no"}`)
          yield* Console.log(`  Last run: ${formatOptDate(st.lastRun)}`)
          yield* Console.log(`  Next run: ${formatOptDate(st.nextRun)}`)
          yield* Console.log(`  Plist:    ${st.plistPath}`)
          break
        }
      }
      break
    }
    case "doctor": {
      const doctorYamlPath = Paths.defaultYamlPath()
      const doctorResult = yield* Doctor.runDiagnostics(doctorYamlPath)
      yield* Console.log(Doctor.formatReport(doctorResult))
      if (!doctorResult.allPassed) {
        return yield* Effect.fail(new CliExitError())
      }
      break
    }
    case "validate": {
      const yamlPath = Paths.defaultYamlPath()
      yield* YamlModule.load(yamlPath).pipe(
        Effect.flatMap(() => Console.log("bookmarks.yaml is valid")),
        Effect.catchAll((e) =>
          Effect.gen(function* () {
            yield* Console.error(e.message)
            return yield* Effect.fail(new CliExitError())
          })
        ),
      )
      break
    }
    default:
      yield* Console.error(`Unknown command: ${command}`)
      yield* Console.log(USAGE)
      return yield* Effect.fail(new CliExitError())
  }
})

Effect.runPromiseExit(program).then((exit) => {
  if (Exit.isFailure(exit)) {
    const err = Cause.squash(exit.cause)
    if (!CliExitError.is(err)) console.error(err)
    process.exit(1)
  }
})
