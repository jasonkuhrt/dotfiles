import * as Schema from "effect/Schema"
import { BookmarkSection } from "./bookmark-structure.js"

export class BookmarkTree extends Schema.Class<BookmarkTree>("BookmarkTree")({
  favorites_bar: Schema.optional(BookmarkSection),
  other: Schema.optional(BookmarkSection),
  reading_list: Schema.optional(BookmarkSection),
  mobile: Schema.optional(BookmarkSection),
}) {
  static is = Schema.is(BookmarkTree)
}
