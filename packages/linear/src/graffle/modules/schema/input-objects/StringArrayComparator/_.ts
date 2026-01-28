import type * as $Fields from './fields.js'

export * as StringArrayComparator from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Comparator for strings.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | Yes |
*/
export interface StringArrayComparator {
kind: "InputObject",
name: "StringArrayComparator",
isAllFieldsNullable: true,
fields: {
length: $Fields.length,
every: $Fields.every,
some: $Fields.some
},
type: {
length?: $Fields.length['type'],
every?: $Fields.every['type'],
some?: $Fields.some['type']
}
}