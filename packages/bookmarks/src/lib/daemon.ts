/**
 * Launchd daemon lifecycle.
 *
 * Generates, installs, loads, and unloads a launchd plist for
 * periodic bookmark sync. No hand-editing plist files -- the CLI owns the lifecycle.
 */

import { DateTime, Duration, Effect, Option, pipe } from "effect"
import { execFile } from "node:child_process"
import * as Fs from "node:fs/promises"
import * as Path from "node:path"

// -- Constants --

const LABEL = "com.jasonkuhrt.bookmarks-sync"
const PLIST_FILENAME = `${LABEL}.plist`
const HOME = process.env["HOME"] ?? ""
const PLIST_DIR = Path.join(HOME, "Library/LaunchAgents")
const PLIST_PATH = Path.join(PLIST_DIR, PLIST_FILENAME)
const LOG_DIR = Path.join(HOME, "Library/Logs/bookmarks-sync")
const STDOUT_LOG = Path.join(LOG_DIR, "bookmarks-sync.log")

// -- Types --

export interface DaemonConfig {
  /** Sync interval. Default: 1 hour. */
  readonly interval: Duration.Duration
  /** Directory for stdout/stderr logs. */
  readonly logDir: string
  /** Working directory for the sync process. */
  readonly workingDir: string
  /** Absolute path to the bun binary. */
  readonly bunPath: string
}

export interface DaemonStatus {
  readonly running: boolean
  readonly lastRun: Option.Option<DateTime.Utc>
  readonly nextRun: Option.Option<DateTime.Utc>
  readonly plistPath: string
}

// -- Helpers --

const execFileEffect = (cmd: string, args: readonly string[]): Effect.Effect<string, Error> =>
  Effect.tryPromise({
    try: () =>
      new Promise<string>((resolve, reject) => {
        execFile(cmd, [...args], { encoding: "utf-8" }, (err, stdout) => {
          if (err) reject(err)
          else resolve(stdout)
        })
      }),
    catch: (e) => (e instanceof Error ? e : new Error(String(e))),
  })

const writeFile = (filePath: string, content: string): Effect.Effect<void, Error> =>
  Effect.tryPromise({
    try: () => Fs.writeFile(filePath, content, "utf-8"),
    catch: () => new Error(`Failed to write ${filePath}`),
  })

const removeFile = (filePath: string): Effect.Effect<void, Error> =>
  Effect.tryPromise({
    try: () => Fs.rm(filePath, { force: true }),
    catch: () => new Error(`Failed to remove ${filePath}`),
  })

const mkdir = (dir: string): Effect.Effect<void, Error> =>
  Effect.tryPromise({
    try: () => Fs.mkdir(dir, { recursive: true }),
    catch: () => new Error(`Failed to create directory ${dir}`),
  }).pipe(Effect.asVoid)

const fileExists = (filePath: string): Effect.Effect<boolean, Error> =>
  Effect.tryPromise({
    try: () => Fs.access(filePath).then(() => true, () => false),
    catch: () => new Error(`Failed to check ${filePath}`),
  })

const resolveBunPath = (): Effect.Effect<string, Error> =>
  pipe(
    execFileEffect("which", ["bun"]),
    Effect.map((s) => s.trim()),
    Effect.catchAll(() => Effect.succeed(process.execPath)),
  )

// -- Plist generation --

/** Generate a launchd plist XML string from the given config. */
export const generatePlist = (config: DaemonConfig): string => {
  const intervalSeconds = Math.round(Duration.toSeconds(config.interval))
  const stdoutLog = Path.join(config.logDir, "bookmarks-sync.log")
  const stderrLog = Path.join(config.logDir, "bookmarks-sync.error.log")

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>${LABEL}</string>
    <key>ProgramArguments</key>
    <array>
        <string>${config.bunPath}</string>
        <string>run</string>
        <string>bookmarks</string>
        <string>sync</string>
    </array>
    <key>StartInterval</key>
    <integer>${intervalSeconds}</integer>
    <key>StandardOutPath</key>
    <string>${stdoutLog}</string>
    <key>StandardErrorPath</key>
    <string>${stderrLog}</string>
    <key>WorkingDirectory</key>
    <string>${config.workingDir}</string>
</dict>
</plist>
`
}

// -- Default config --

/** Build a DaemonConfig with sensible defaults. */
export const defaultConfig = (): Effect.Effect<DaemonConfig, Error> =>
  Effect.gen(function* () {
    const bunPath = yield* resolveBunPath()
    const workingDir = Path.resolve(import.meta.dirname, "../../../..")
    return {
      interval: Duration.hours(1),
      logDir: LOG_DIR,
      workingDir,
      bunPath,
    }
  })

// -- Lifecycle --

/** Generate + install + load the launchd plist. */
export const start = (config: DaemonConfig): Effect.Effect<void, Error> =>
  Effect.gen(function* () {
    // Ensure directories exist
    yield* mkdir(PLIST_DIR)
    yield* mkdir(config.logDir)

    // Generate and write plist
    const plistContent = generatePlist(config)
    yield* writeFile(PLIST_PATH, plistContent)

    // Load via launchctl
    yield* execFileEffect("launchctl", ["load", PLIST_PATH])
  })

/** Unload the launchd plist and remove the file. */
export const stop = (): Effect.Effect<void, Error> =>
  Effect.gen(function* () {
    const exists = yield* fileExists(PLIST_PATH)
    if (!exists) {
      return yield* Effect.fail(new Error(`Plist not found: ${PLIST_PATH}. Is the daemon running?`))
    }

    // Unload via launchctl (ignore error if not loaded)
    yield* pipe(
      execFileEffect("launchctl", ["unload", PLIST_PATH]),
      Effect.catchAll(() => Effect.void),
    )

    // Remove plist file
    yield* removeFile(PLIST_PATH)
  })

/** Check daemon status: running, last run, next run. */
export const status = (): Effect.Effect<DaemonStatus, Error> =>
  Effect.gen(function* () {
    // Check if the label is loaded in launchctl
    const running = yield* pipe(
      execFileEffect("launchctl", ["list", LABEL]),
      Effect.map(() => true),
      Effect.catchAll(() => Effect.succeed(false)),
    )

    // Parse last run from stdout log (last line with a timestamp)
    const lastRun = yield* pipe(
      Effect.tryPromise({
        try: () => Fs.readFile(STDOUT_LOG, "utf-8"),
        catch: () => new Error("Failed to read log"),
      }),
      Effect.map((content) => parseLastRunTimestamp(content)),
      Effect.catchAll(() => Effect.succeed(Option.none<DateTime.Utc>())),
    )

    // Compute next run: lastRun + interval from plist (or none if not running)
    const nextRun = yield* pipe(
      running
        ? pipe(
            readIntervalFromPlist(),
            Effect.map((intervalSeconds) =>
              Option.map(lastRun, (last) =>
                DateTime.addDuration(last, Duration.seconds(intervalSeconds)),
              ),
            ),
          )
        : Effect.succeed(Option.none<DateTime.Utc>()),
      Effect.catchAll(() => Effect.succeed(Option.none<DateTime.Utc>())),
    )

    return {
      running,
      lastRun,
      nextRun,
      plistPath: PLIST_PATH,
    }
  })

// -- Internal helpers --

/** Parse the most recent timestamp from the sync log. */
const parseLastRunTimestamp = (logContent: string): Option.Option<DateTime.Utc> => {
  // Look for ISO-8601 timestamps or "Sync complete" lines with dates
  const lines = logContent.trim().split("\n").reverse()
  for (const line of lines) {
    // Try to find an ISO timestamp at the start of a line
    const isoMatch = line.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[.\d]*Z?)/)
    if (isoMatch) {
      return pipe(
        DateTime.make(isoMatch[1]!),
        Option.map(DateTime.toUtc),
      )
    }
    // Fallback: try the modification time approach -- we'll use file stat instead
  }
  return Option.none()
}

/** Read the StartInterval from the installed plist file. */
const readIntervalFromPlist = (): Effect.Effect<number, Error> =>
  pipe(
    Effect.tryPromise({
      try: () => Fs.readFile(PLIST_PATH, "utf-8"),
      catch: () => new Error("Failed to read plist"),
    }),
    Effect.flatMap((content) => {
      const match = content.match(/<key>StartInterval<\/key>\s*<integer>(\d+)<\/integer>/)
      if (!match) return Effect.fail(new Error("StartInterval not found in plist"))
      return Effect.succeed(Number(match[1]))
    }),
  )
