import type * as $Fields from './fields.js'

export * as EstimateComparator from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Comparator for estimates.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 11 |
* | **All Fields Nullable** | Yes |
*/
export interface EstimateComparator {
kind: "InputObject",
name: "EstimateComparator",
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
gte: $Fields.gte,
or: $Fields.or,
and: $Fields.and
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
gte?: $Fields.gte['type'],
or?: $Fields.or['type'],
and?: $Fields.and['type']
}
}