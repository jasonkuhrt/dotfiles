import * as Schema from "effect/Schema"

export class TargetProfile extends Schema.Class<TargetProfile>("TargetProfile")({
  path: Schema.String,
  enabled: Schema.optional(Schema.Boolean),
}) {
  static is = Schema.is(TargetProfile)
}
