/**
 * Sync state persistence.
 *
 * Stores the "last known agreed state" at .sync-state.json (gitignored).
 * This is the baseline for three-way diff on next sync.
 */

import { Effect } from "effect"
import * as Fs from "node:fs/promises"
import * as Path from "node:path"

export interface ProfileState {
  readonly yaml_hash: string
  readonly browser_hash: string
  readonly bookmarks: Record<string, {
    readonly name: string
    readonly path: string
    readonly date_modified: string
  }>
}

export interface SyncState {
  readonly version: 1
  readonly last_sync: string
  readonly profiles: Record<string, ProfileState>
}

const STATE_FILE = ".sync-state.json"

/** Create an initial empty sync state. */
export const empty = (): SyncState => ({
  version: 1,
  last_sync: "",
  profiles: {},
})

/** Load sync state from .sync-state.json. Returns empty state if file doesn't exist. */
export const load = (basePath: string): Effect.Effect<SyncState, Error> =>
  Effect.gen(function* () {
    const filePath = Path.join(basePath, STATE_FILE)
    const content = yield* Effect.tryPromise({
      try: () => Fs.readFile(filePath, "utf-8"),
      catch: (e) => new Error(`Failed to read sync state: ${e}`),
    }).pipe(Effect.catchAll(() => Effect.succeed(null as string | null)))

    if (content === null) return empty()

    return yield* Effect.try({
      try: () => JSON.parse(content) as SyncState,
      catch: (e) => new Error(`Failed to parse sync state: ${e}`),
    })
  })

/** Save sync state to .sync-state.json. */
export const save = (basePath: string, state: SyncState): Effect.Effect<void, Error> =>
  Effect.tryPromise({
    try: () => Fs.writeFile(
      Path.join(basePath, STATE_FILE),
      JSON.stringify(state, null, 2),
      "utf-8",
    ),
    catch: (e) => new Error(`Failed to write sync state: ${e}`),
  })
