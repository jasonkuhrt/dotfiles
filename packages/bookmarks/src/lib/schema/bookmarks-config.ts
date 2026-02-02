import * as Schema from "effect/Schema"
import { BookmarkTree } from "./bookmark-tree.js"
import { TargetProfile } from "./target-profile.js"

const BrowserProfiles = Schema.Record({ key: Schema.String, value: TargetProfile })

export class BookmarksConfig extends Schema.Class<BookmarksConfig>("BookmarksConfig")({
  targets: Schema.Record({ key: Schema.String, value: BrowserProfiles }),
  base: BookmarkTree,
  profiles: Schema.optional(Schema.Record({ key: Schema.String, value: BookmarkTree })),
}) {
  static is = Schema.is(BookmarksConfig)
}
