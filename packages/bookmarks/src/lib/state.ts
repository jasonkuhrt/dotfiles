/**
 * Sync state persistence.
 *
 * Stores the "last known agreed state" at .sync-state.json (gitignored).
 * This is the baseline for three-way diff on next sync.
 */

import type { Effect } from "effect"

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

/** Load sync state from .sync-state.json. Returns empty state if file doesn't exist. */
export declare const load: (basePath: string) => Effect.Effect<SyncState, Error>

/** Save sync state to .sync-state.json. */
export declare const save: (basePath: string, state: SyncState) => Effect.Effect<void, Error>

/** Create an initial empty sync state. */
export declare const empty: () => SyncState
