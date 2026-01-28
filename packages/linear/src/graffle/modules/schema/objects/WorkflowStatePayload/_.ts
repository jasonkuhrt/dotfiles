import type * as $Fields from './fields.js'

export * as WorkflowStatePayload from './fields.js'

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
export interface WorkflowStatePayload {
kind: "Object",
name: "WorkflowStatePayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
workflowState: $Fields.workflowState,
success: $Fields.success
}
}