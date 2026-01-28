import type * as $Fields from './fields.js'

export * as ContentComparator from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* [Internal] Comparator for content.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | Yes |
*/
export interface ContentComparator {
kind: "InputObject",
name: "ContentComparator",
isAllFieldsNullable: true,
fields: {
contains: $Fields.contains,
notContains: $Fields.notContains
},
type: {
contains?: $Fields.contains['type'],
notContains?: $Fields.notContains['type']
}
}