import type * as $Fields from './fields.js'

export * as CustomViewSortInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface CustomViewSortInput {
kind: "InputObject",
name: "CustomViewSortInput",
isAllFieldsNullable: true,
fields: {
name: $Fields.name,
createdAt: $Fields.createdAt,
shared: $Fields.shared,
updatedAt: $Fields.updatedAt
},
type: {
name?: $Fields.name['type'],
createdAt?: $Fields.createdAt['type'],
shared?: $Fields.shared['type'],
updatedAt?: $Fields.updatedAt['type']
}
}