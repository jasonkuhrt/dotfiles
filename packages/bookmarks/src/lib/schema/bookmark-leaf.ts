import * as Schema from "effect/Schema"

export class BookmarkLeaf extends Schema.TaggedClass<BookmarkLeaf>("BookmarkLeaf")("BookmarkLeaf", {
  name: Schema.String,
  url: Schema.String,
}) {
  static is = Schema.is(BookmarkLeaf)
}
