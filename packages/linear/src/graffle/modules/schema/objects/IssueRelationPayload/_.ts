import type * as $Fields from './fields.js'

export * as IssueRelationPayload from './fields.js'

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
export interface IssueRelationPayload {
kind: "Object",
name: "IssueRelationPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
issueRelation: $Fields.issueRelation,
success: $Fields.success
}
}