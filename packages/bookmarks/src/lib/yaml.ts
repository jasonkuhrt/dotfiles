/**
 * Load and save bookmarks.yaml.
 *
 * Reads the YAML source of truth, validates against the schema,
 * and writes back after sync operations.
 */

import type { Effect } from "effect"
import type * as SchemaModule from "./schema.js"

/** Load and validate bookmarks.yaml from the given path. */
export declare const load: (path: string) => Effect.Effect<SchemaModule.BookmarksConfig, Error>

/** Write a BookmarksConfig back to bookmarks.yaml. */
export declare const save: (path: string, config: SchemaModule.BookmarksConfig) => Effect.Effect<void, Error>

/** Resolve a profile's effective bookmark tree (base + profile overlay). */
export declare const resolveProfile: (
  config: SchemaModule.BookmarksConfig,
  profileKey: string,
) => Effect.Effect<SchemaModule.BookmarkTree, Error>
