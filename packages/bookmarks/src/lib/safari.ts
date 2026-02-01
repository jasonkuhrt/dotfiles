/**
 * Safari plist adapter.
 *
 * Reads and writes Safari's Bookmarks.plist per profile.
 * Handles Core Data epoch timestamp conversion and plist binary/XML format.
 */

import type { Effect } from "effect"
import type * as SchemaModule from "./schema.js"

/** Read Safari bookmarks from the given plist path. */
export declare const readBookmarks: (plistPath: string) => Effect.Effect<SchemaModule.BookmarkTree, Error>

/** Write a bookmark tree to Safari's Bookmarks.plist. */
export declare const writeBookmarks: (
  plistPath: string,
  tree: SchemaModule.BookmarkTree,
) => Effect.Effect<void, Error>
