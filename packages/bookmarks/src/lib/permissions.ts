/**
 * Permissions checking.
 *
 * Safari's Bookmarks.plist requires Full Disk Access.
 * This module detects whether the permission is granted and
 * provides a helpful error message with instructions if not.
 *
 * Also provides browser-is-running guards and target availability
 * checks for graceful degradation.
 */

import { Data, Effect } from "effect"
import { access } from "node:fs/promises"
import { homedir } from "node:os"
import { join } from "node:path"

// -- Tagged Errors --

/** Full Disk Access is required but not granted. */
export class PermissionDenied extends Data.TaggedError("PermissionDenied")<{
  readonly path: string
  readonly reason: string
}> {
  override get message(): string {
    return [
      `Permission denied: cannot read ${this.path}`,
      this.reason,
      ``,
      `To grant Full Disk Access:`,
      `  1. Open System Settings`,
      `  2. Navigate to Privacy & Security > Full Disk Access`,
      `  3. Enable access for your terminal application (e.g. Terminal, iTerm2, Ghostty)`,
      `  4. Restart the terminal and try again`,
    ].join("\n")
  }
}

/** A browser is currently running, which may interfere with write operations. */
export class BrowserRunning extends Data.TaggedError("BrowserRunning")<{
  readonly browser: string
}> {
  override get message(): string {
    return [
      `${this.browser} is currently running.`,
      `Writing bookmarks while the browser is open may cause data loss or conflicts.`,
      `Please close ${this.browser} and try again.`,
    ].join("\n")
  }
}

/** The bookmark target (file/browser) is not available on this system. */
export class TargetUnavailable extends Data.TaggedError("TargetUnavailable")<{
  readonly target: string
  readonly path: string
}> {
  override get message(): string {
    return `Target unavailable: ${this.target} bookmark file not found at ${this.path}`
  }
}

// -- Safari Plist Path --

const SAFARI_PLIST_PATH = join(homedir(), "Library/Safari/Bookmarks.plist")

// -- Full Disk Access --

/** Check if Full Disk Access is granted by attempting to read Safari's plist. Returns true if accessible. */
export const checkFullDiskAccess = (): Effect.Effect<boolean> =>
  Effect.tryPromise({
    try: async () => {
      await access(SAFARI_PLIST_PATH)
      return true
    },
    catch: () => false,
  }).pipe(Effect.catchAll(() => Effect.succeed(false)))

/** Assert Full Disk Access, failing with a {@link PermissionDenied} error if not granted. */
export const requireFullDiskAccess = (): Effect.Effect<void, PermissionDenied> =>
  Effect.gen(function* () {
    const granted = yield* checkFullDiskAccess()
    if (!granted) {
      yield* new PermissionDenied({
        path: SAFARI_PLIST_PATH,
        reason: "Full Disk Access is required to read Safari bookmarks.",
      })
    }
  })

// -- Browser Running Detection --

/** Check if a browser process is currently running. */
export const checkBrowserRunning = (browser: string): Effect.Effect<boolean> =>
  Effect.tryPromise({
    try: async () => {
      const proc = Bun.spawn(["pgrep", "-x", browser], {
        stdout: "pipe",
        stderr: "pipe",
      })
      const exitCode = await proc.exited
      return exitCode === 0
    },
    catch: () => false,
  }).pipe(Effect.catchAll(() => Effect.succeed(false)))

/** Assert that a browser is not running, failing with a {@link BrowserRunning} error if it is. */
export const requireBrowserNotRunning = (browser: string): Effect.Effect<void, BrowserRunning> =>
  Effect.gen(function* () {
    const running = yield* checkBrowserRunning(browser)
    if (running) {
      yield* new BrowserRunning({ browser })
    }
  })

// -- Target Availability --

/** Check if a bookmark file exists at the given path. */
export const checkTargetAvailable = (path: string): Effect.Effect<boolean> =>
  Effect.tryPromise({
    try: async () => {
      await access(path)
      return true
    },
    catch: () => false,
  }).pipe(Effect.catchAll(() => Effect.succeed(false)))

/** Assert that a bookmark target file exists, failing with a {@link TargetUnavailable} error if not. */
export const requireTargetAvailable = (target: string, path: string): Effect.Effect<void, TargetUnavailable> =>
  Effect.gen(function* () {
    const available = yield* checkTargetAvailable(path)
    if (!available) {
      yield* new TargetUnavailable({ target, path })
    }
  })
