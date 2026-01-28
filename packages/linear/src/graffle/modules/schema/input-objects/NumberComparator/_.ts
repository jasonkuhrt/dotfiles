import type * as $Fields from './fields.js'

export * as NumberComparator from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Comparator for numbers.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 8 |
* | **All Fields Nullable** | Yes |
*/
export interface NumberComparator {
kind: "InputObject",
name: "NumberComparator",
isAllFieldsNullable: true,
fields: {
eq: $Fields.eq,
neq: $Fields.neq,
in: $Fields.in,
nin: $Fields.nin,
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
lt?: $Fields.lt['type'],
lte?: $Fields.lte['type'],
gt?: $Fields.gt['type'],
gte?: $Fields.gte['type']
}
}