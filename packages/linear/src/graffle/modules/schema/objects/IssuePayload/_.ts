import type * as $Fields from './fields.js'

export * as IssuePayload from './fields.js'

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
export interface IssuePayload {
kind: "Object",
name: "IssuePayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
issue: $Fields.issue,
success: $Fields.success
}
}