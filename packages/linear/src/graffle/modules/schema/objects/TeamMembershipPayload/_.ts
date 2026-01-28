import type * as $Fields from './fields.js'

export * as TeamMembershipPayload from './fields.js'

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
export interface TeamMembershipPayload {
kind: "Object",
name: "TeamMembershipPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
teamMembership: $Fields.teamMembership,
success: $Fields.success
}
}