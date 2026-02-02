import * as Schema from "effect/Schema"
import { BookmarkLeaf } from "./bookmark-leaf.js"

export class BookmarkFolder extends Schema.TaggedClass<BookmarkFolder>("BookmarkFolder")("BookmarkFolder", {
  name: Schema.String,
  children: Schema.Array(Schema.suspend((): Schema.Schema<BookmarkNode> => BookmarkNode)),
}) {
  static is = Schema.is(BookmarkFolder)
}

export type BookmarkNode = BookmarkLeaf | BookmarkFolder

export const BookmarkNode: Schema.Schema<BookmarkNode> = Schema.Union(
  BookmarkLeaf,
  BookmarkFolder,
).annotations({ identifier: "BookmarkNode" })

export const BookmarkSection = Schema.Array(BookmarkNode)
export type BookmarkSection = typeof BookmarkSection.Type
