/**
 * Launchd daemon lifecycle.
 *
 * Generates, installs, loads, and unloads a launchd plist for
 * periodic bookmark sync. No hand-editing plist files — the CLI owns the lifecycle.
 */

import type { Effect } from "effect"

export interface DaemonStatus {
  readonly running: boolean
  readonly lastRun: string | null
  readonly nextRun: string | null
  readonly plistPath: string
}

/** Generate + install + load the launchd plist. */
export declare const start: () => Effect.Effect<void, Error>

/** Unload the launchd plist. */
export declare const stop: () => Effect.Effect<void, Error>

/** Check daemon status: running, last run, next run. */
export declare const status: () => Effect.Effect<DaemonStatus, Error>
