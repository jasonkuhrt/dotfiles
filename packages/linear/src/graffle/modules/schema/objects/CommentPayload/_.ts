import type * as $Fields from './fields.js'

export * as CommentPayload from './fields.js'

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
export interface CommentPayload {
kind: "Object",
name: "CommentPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
comment: $Fields.comment,
success: $Fields.success
}
}