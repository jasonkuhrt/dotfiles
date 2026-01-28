import type * as $Fields from './fields.js'

export * as IssueLabelPayload from './fields.js'

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
export interface IssueLabelPayload {
kind: "Object",
name: "IssueLabelPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
issueLabel: $Fields.issueLabel,
success: $Fields.success
}
}