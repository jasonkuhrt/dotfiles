/**
 * Load and save bookmarks.yaml.
 *
 * Reads the YAML source of truth, validates against the schema,
 * and writes back after sync operations.
 */

import { Effect, Schema } from "effect"
import * as Yaml from "yaml"
import * as Fs from "node:fs/promises"
import { BookmarkSection, BookmarkTree, BookmarksConfig } from "./schema/__.js"

/** Load and validate bookmarks.yaml from the given path. */
export const load = (path: string): Effect.Effect<BookmarksConfig, Error> =>
  Effect.gen(function* () {
    const raw = yield* Effect.tryPromise({
      try: () => Fs.readFile(path, "utf-8"),
      catch: (e) => new Error(`Failed to read ${path}: ${e}`),
    })
    const parsed: unknown = Yaml.parse(raw)
    return yield* Schema.decodeUnknown(BookmarksConfig)(parsed).pipe(
      Effect.mapError((e) => new Error(`Schema validation failed: ${e.message}`)),
    )
  })

const SCHEMA_MODELINE = "# yaml-language-server: $schema=../packages/bookmarks/src/lib/bookmarks.schema.json\n"

/** Write a BookmarksConfig back to bookmarks.yaml. */
export const save = (path: string, config: BookmarksConfig): Effect.Effect<void, Error> =>
  Effect.gen(function* () {
    const encoded = yield* Schema.encode(BookmarksConfig)(config).pipe(
      Effect.mapError((e) => new Error(`Schema encoding failed: ${e.message}`)),
    )
    const yamlStr = SCHEMA_MODELINE + Yaml.stringify(encoded, { indent: 2 })
    yield* Effect.tryPromise({
      try: () => Fs.writeFile(path, yamlStr, "utf-8"),
      catch: (e) => new Error(`Failed to write ${path}: ${e}`),
    })
  })

/** Resolve a profile's effective bookmark tree (base + profile overlay). */
export const resolveProfile = (
  config: BookmarksConfig,
  profileKey: string,
): Effect.Effect<BookmarkTree, Error> =>
  Effect.gen(function* () {
    const base = config.base
    const overlay = config.profiles?.[profileKey]
    if (!overlay) return base

    return BookmarkTree.make({
      favorites_bar: mergeSection(base.favorites_bar, overlay.favorites_bar),
      other: mergeSection(base.other, overlay.other),
      reading_list: mergeSection(base.reading_list, overlay.reading_list),
      mobile: mergeSection(base.mobile, overlay.mobile),
    })
  })

/** Append profile-specific items after base items in a section. */
const mergeSection = (
  base: BookmarkSection | undefined,
  overlay: BookmarkSection | undefined,
): BookmarkSection | undefined => {
  if (!base && !overlay) return undefined
  if (!overlay) return base
  if (!base) return overlay
  return [...base, ...overlay]
}
