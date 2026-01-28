import type * as $Fields from './fields.js'

export * as IssueRelationHistoryPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Issue relation history's payload.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 2 |
*/
export interface IssueRelationHistoryPayload {
kind: "Object",
name: "IssueRelationHistoryPayload",
fields: {
__typename: $Fields.__typename,
identifier: $Fields.identifier,
type: $Fields.type
}
}