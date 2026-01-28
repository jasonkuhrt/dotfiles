import type * as $Fields from './fields.js'

export * as UserPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 3 |
*/
export interface UserPayload {
kind: "Object",
name: "UserPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
user: $Fields.user,
success: $Fields.success
}
}