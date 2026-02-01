/**
 * Chrome JSON adapter.
 *
 * Reads and writes Chrome's Bookmarks JSON file per profile.
 * Handles Chrome's Windows-epoch timestamps and checksum recalculation.
 */

import type { Effect } from "effect"
import type * as SchemaModule from "./schema.js"

/** Read Chrome bookmarks from the given profile directory. */
export declare const readBookmarks: (profilePath: string) => Effect.Effect<SchemaModule.BookmarkTree, Error>

/** Write a bookmark tree to Chrome's Bookmarks JSON. Recalculates checksum. */
export declare const writeBookmarks: (
  profilePath: string,
  tree: SchemaModule.BookmarkTree,
) => Effect.Effect<void, Error>
