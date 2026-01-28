import type * as $Fields from './fields.js'

export * as TeamPayload from './fields.js'

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
export interface TeamPayload {
kind: "Object",
name: "TeamPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
team: $Fields.team,
success: $Fields.success
}
}