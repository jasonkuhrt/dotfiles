import type * as $Fields from './fields.js'

export * as RelationExistsComparator from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Comparator for relation existence.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | Yes |
*/
export interface RelationExistsComparator {
kind: "InputObject",
name: "RelationExistsComparator",
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