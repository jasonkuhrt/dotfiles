/**
 * Core sync engine.
 *
 * Pipeline: diff -> detect conflicts -> resolve (newest-wins) -> apply.
 * Produces graveyard entries for conflict losers.
 */

import type { Effect } from "effect"
import type { BookmarkPatch } from "./patch.js"
import type * as SchemaModule from "./schema.js"

export interface SyncResult {
  readonly applied: readonly BookmarkPatch[]
  readonly graveyarded: readonly BookmarkPatch[]
}

export interface ConflictResolution {
  readonly apply: readonly BookmarkPatch[]
  readonly graveyard: readonly BookmarkPatch[]
}

/** Resolve conflicts between YAML-side and browser-side patches. Newest wins. */
export declare const resolveConflicts: (
  yamlPatches: readonly BookmarkPatch[],
  browserPatches: readonly BookmarkPatch[],
) => Effect.Effect<ConflictResolution, Error>

/** Apply a set of patches to a bookmark tree, producing the updated tree. */
export declare const applyPatches: (
  tree: SchemaModule.BookmarkTree,
  patches: readonly BookmarkPatch[],
) => Effect.Effect<SchemaModule.BookmarkTree, Error>

/** Run a full bidirectional sync. */
export declare const sync: (options?: { readonly dryRun?: boolean }) => Effect.Effect<SyncResult, Error>
