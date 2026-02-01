/**
 * Graveyard management and garbage collection.
 *
 * The graveyard is a real bookmark folder (`_graveyard/`) that stores
 * conflict losers with self-describing names: `YYYY-MM-DD_{source}_{reason}/`.
 * GC removes entries older than the configured max age (default 90 days).
 */

import type { Effect } from "effect"
import type * as SchemaModule from "./schema.js"
import type { BookmarkPatch } from "./patch.js"

/** Create a graveyard entry from a conflict-losing patch. */
export declare const addToGraveyard: (
  tree: SchemaModule.BookmarkTree,
  patch: BookmarkPatch,
  source: string,
  reason: string,
) => Effect.Effect<SchemaModule.BookmarkTree, Error>

/** Remove graveyard entries older than maxAge. */
export declare const gc: (
  tree: SchemaModule.BookmarkTree,
  maxAge: string,
) => Effect.Effect<SchemaModule.BookmarkTree, Error>
