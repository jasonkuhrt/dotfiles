import type * as $Fields from './fields.js'

export * as ReactionPayload from './fields.js'

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
export interface ReactionPayload {
kind: "Object",
name: "ReactionPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
reaction: $Fields.reaction,
success: $Fields.success
}
}