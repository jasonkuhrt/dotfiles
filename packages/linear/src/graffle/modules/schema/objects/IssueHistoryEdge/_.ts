import type * as $Fields from './fields.js'

export * as IssueHistoryEdge from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 2 |
*/
export interface IssueHistoryEdge {
kind: "Object",
name: "IssueHistoryEdge",
fields: {
__typename: $Fields.__typename,
node: $Fields.node,
cursor: $Fields.cursor
}
}