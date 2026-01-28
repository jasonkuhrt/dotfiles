import type * as $Fields from './fields.js'

export * as GitAutomationStatePayload from './fields.js'

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
export interface GitAutomationStatePayload {
kind: "Object",
name: "GitAutomationStatePayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
gitAutomationState: $Fields.gitAutomationState,
success: $Fields.success
}
}