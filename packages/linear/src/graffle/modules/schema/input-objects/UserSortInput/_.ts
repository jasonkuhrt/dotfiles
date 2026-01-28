import type * as $Fields from './fields.js'

export * as UserSortInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* User sorting options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | Yes |
*/
export interface UserSortInput {
kind: "InputObject",
name: "UserSortInput",
isAllFieldsNullable: true,
fields: {
name: $Fields.name,
displayName: $Fields.displayName
},
type: {
name?: $Fields.name['type'],
displayName?: $Fields.displayName['type']
}
}