import type * as $Fields from './fields.js'

export * as BooleanComparator from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Comparator for booleans.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | Yes |
*/
export interface BooleanComparator {
kind: "InputObject",
name: "BooleanComparator",
isAllFieldsNullable: true,
fields: {
eq: $Fields.eq,
neq: $Fields.neq
},
type: {
eq?: $Fields.eq['type'],
neq?: $Fields.neq['type']
}
}