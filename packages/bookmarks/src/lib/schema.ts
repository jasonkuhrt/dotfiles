/**
 * YAML schema validation with Effect Schema.
 *
 * Defines the bookmark data model and validates bookmarks.yaml against it.
 * Core types: BookmarkNode (folder | leaf), BookmarkTree, BookmarksConfig.
 *
 * This module is also the source of truth for JSON Schema generation —
 * run `bun src/lib/generate-json-schema.ts` to emit bookmarks.schema.json.
 */

import * as Schema from "effect/Schema"

// -- Bookmark node types --
//
// Recursive schemas require identifier annotations for JSON Schema generation.
// The suspend() in BookmarkFolder.children references BookmarkNode by identifier,
// which lets JSONSchema.make produce clean $ref pointers.

export class BookmarkLeaf extends Schema.Class<BookmarkLeaf>("BookmarkLeaf")({
  name: Schema.String,
  url: Schema.String,
}) {}

export class BookmarkFolder extends Schema.Class<BookmarkFolder>("BookmarkFolder")({
  name: Schema.String,
  children: Schema.Array(Schema.suspend((): Schema.Schema<BookmarkNode> => BookmarkNode)),
}) {}

export type BookmarkNode = BookmarkLeaf | BookmarkFolder

export const BookmarkNode: Schema.Schema<BookmarkNode> = Schema.Union(
  BookmarkLeaf,
  BookmarkFolder,
).annotations({ identifier: "BookmarkNode" })

// -- Section type (favorites_bar, other, reading_list, mobile) --

export const BookmarkSection = Schema.Array(BookmarkNode)
export type BookmarkSection = typeof BookmarkSection.Type

// -- Bookmark tree (sections container, used for both `base` and profile overlays) --

export class BookmarkTree extends Schema.Class<BookmarkTree>("BookmarkTree")({
  favorites_bar: Schema.optional(BookmarkSection),
  other: Schema.optional(BookmarkSection),
  reading_list: Schema.optional(BookmarkSection),
  mobile: Schema.optional(BookmarkSection),
}) {}

// -- Target profile config --

export class TargetProfile extends Schema.Class<TargetProfile>("TargetProfile")({
  path: Schema.String,
  enabled: Schema.optional(Schema.Boolean),
}) {}

// -- Browser targets: each browser has named profiles --

const BrowserProfiles = Schema.Record({ key: Schema.String, value: TargetProfile })

// -- Top-level config --

export class BookmarksConfig extends Schema.Class<BookmarksConfig>("BookmarksConfig")({
  targets: Schema.Record({ key: Schema.String, value: BrowserProfiles }),
  base: BookmarkTree,
  profiles: Schema.optional(Schema.Record({ key: Schema.String, value: BookmarkTree })),
}) {}
