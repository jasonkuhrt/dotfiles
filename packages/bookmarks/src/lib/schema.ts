/**
 * YAML schema validation with Effect Schema.
 *
 * Defines the bookmark data model and validates bookmarks.yaml against it.
 * Core types: BookmarkNode (folder | leaf), BookmarkTree, BookmarksConfig.
 */

import * as Schema from "effect/Schema"

// -- Bookmark node types --

export class BookmarkLeaf extends Schema.Class<BookmarkLeaf>("BookmarkLeaf")({
  name: Schema.String,
  url: Schema.String,
}) {}

export class BookmarkFolder extends Schema.Class<BookmarkFolder>("BookmarkFolder")({
  name: Schema.String,
  children: Schema.suspend((): Schema.Schema<readonly BookmarkNode[]> => Schema.Array(BookmarkNode)),
}) {}

export type BookmarkNode = BookmarkLeaf | BookmarkFolder

export const BookmarkNode: Schema.Schema<BookmarkNode> = Schema.Union(BookmarkLeaf, BookmarkFolder)

// -- Section type (favorites_bar, other, reading_list, mobile) --

export const BookmarkSection = Schema.Array(BookmarkNode)
export type BookmarkSection = typeof BookmarkSection.Type

// -- Bookmark tree (resolved for a profile) --

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

// -- Top-level config --

export class BookmarksConfig extends Schema.Class<BookmarksConfig>("BookmarksConfig")({
  targets: Schema.Record({ key: Schema.String, value: Schema.Record({ key: Schema.String, value: TargetProfile }) }),
  base: BookmarkTree,
  profiles: Schema.optional(Schema.Record({ key: Schema.String, value: BookmarkTree })),
}) {}
