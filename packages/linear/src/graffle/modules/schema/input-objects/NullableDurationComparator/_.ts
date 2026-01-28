import type * as $Fields from './fields.js'

export * as NullableDurationComparator from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Nullable comparator for optional durations.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 9 |
* | **All Fields Nullable** | Yes |
*/
export interface NullableDurationComparator {
kind: "InputObject",
name: "NullableDurationComparator",
isAllFieldsNullable: true,
fields: {
eq: $Fields.eq,
neq: $Fields.neq,
in: $Fields.in,
nin: $Fields.nin,
null: $Fields.null,
lt: $Fields.lt,
lte: $Fields.lte,
gt: $Fields.gt,
gte: $Fields.gte
},
type: {
eq?: $Fields.eq['type'],
neq?: $Fields.neq['type'],
in?: $Fields.in['type'],
nin?: $Fields.nin['type'],
null?: $Fields.null['type'],
lt?: $Fields.lt['type'],
lte?: $Fields.lte['type'],
gt?: $Fields.gt['type'],
gte?: $Fields.gte['type']
}
}