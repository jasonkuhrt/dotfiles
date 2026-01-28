import type * as $Fields from './fields.js'

export * as AgentActivityPayload from './fields.js'

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
export interface AgentActivityPayload {
kind: "Object",
name: "AgentActivityPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
agentActivity: $Fields.agentActivity,
success: $Fields.success
}
}