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

import { Cause, Console, Data, DateTime, Duration, Effect, Exit, Option } from "effect"

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

const parseMaxAge = (input: string): Effect.Effect<Duration.Duration, CliExitError> =>
  Effect.gen(function* () {
    const match = /^(\d+)([mhd])$/.exec(input)
    if (!match) {
      yield* Console.error("Invalid --max-age value. Use formats like 30d, 12h, or 45m.")
      return yield* Effect.fail(new CliExitError())
    }

    const amount = Number(match[1])
    const unit = match[2]
    switch (unit) {
      case "m":
        return Duration.minutes(amount)
      case "h":
        return Duration.hours(amount)
      case "d":
        return Duration.days(amount)
      default:
        yield* Console.error("Invalid --max-age unit. Use m, h, or d.")
        return yield* Effect.fail(new CliExitError())
    }
  })

const printSyncSummary = (label: string, result: SyncModule.SyncResult) =>
  Effect.gen(function* () {
    yield* Console.log(`\n${label}: ${result.applied.length} applied, ${result.graveyarded.length} graveyarded`)
    for (const targetResult of result.targets) {
      yield* Console.log(
        `  ${targetResult.target.browser}/${targetResult.target.profile}: ` +
          `${targetResult.applied.length} applied, ${targetResult.graveyarded.length} graveyarded`,
      )
    }
  })

const printStatus = (status: SyncModule.StatusResult) =>
  Effect.gen(function* () {
    yield* Console.log(`YAML: ${status.yamlPath}`)
    if (status.targets.length === 0) {
      yield* Console.log("No enabled targets configured.")
      return
    }

    for (const targetStatus of status.targets) {
      yield* Console.log(`${targetStatus.target.browser}/${targetStatus.target.profile}`)
      yield* Console.log(`  path: ${targetStatus.target.path}`)
      yield* Console.log(`  pending -> browser: ${targetStatus.yamlPatches.length}`)
      yield* Console.log(`  pending -> yaml:    ${targetStatus.browserPatches.length}`)
    }
  })

const printBackupSummary = (result: SyncModule.BackupResult) =>
  Effect.gen(function* () {
    yield* Console.log(`Backups written to ${result.backupDir}`)
    for (const file of result.files) {
      yield* Console.log(`  wrote ${file}`)
    }
    for (const skipped of result.skipped) {
      yield* Console.log(`  skipped ${skipped}`)
    }
  })

const program = Effect.gen(function* () {
  const [command, ...args] = process.argv.slice(2)

  if (!command) {
    yield* Console.log(USAGE)
    return
  }

  const { positional } = parseArgs(args)

  switch (command) {
    case "push": {
      const { flags: pushFlags } = parseArgs(args)
      const pushResult = yield* SyncModule.push({
        yamlPath: Paths.defaultYamlPath(),
        dryRun: pushFlags.dryRun,
      })
      yield* printSyncSummary("Push complete", pushResult)
      break
    }
    case "pull": {
      const { flags: pullFlags } = parseArgs(args)
      const pullResult = yield* SyncModule.pull({
        yamlPath: Paths.defaultYamlPath(),
        dryRun: pullFlags.dryRun,
      })
      yield* printSyncSummary("Pull complete", pullResult)
      break
    }
    case "sync": {
      const { flags: syncFlags } = parseArgs(args)
      const syncResult = yield* SyncModule.sync({
        yamlPath: Paths.defaultYamlPath(),
        dryRun: syncFlags.dryRun,
      })
      yield* printSyncSummary("Sync complete", syncResult)
      break
    }
    case "status": {
      yield* printStatus(
        yield* SyncModule.status({
          yamlPath: Paths.defaultYamlPath(),
        }),
      )
      break
    }
    case "backup": {
      yield* printBackupSummary(
        yield* SyncModule.backup({
          yamlPath: Paths.defaultYamlPath(),
          backupDir: Paths.defaultBackupDir(),
        }),
      )
      break
    }
    case "gc": {
      const { flags: gcFlags } = parseArgs(args)
      const maxAge = yield* parseMaxAge(gcFlags.maxAge)
      const gcResult = yield* SyncModule.gc({
        yamlPath: Paths.defaultYamlPath(),
        graveyardMaxAge: maxAge,
      })
      yield* printSyncSummary("GC complete", gcResult)
      break
    }
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
