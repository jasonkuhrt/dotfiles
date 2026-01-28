import type * as $Fields from './fields.js'

export * as IssueRelation from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A relation between two issues.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 7 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface IssueRelation {
kind: "Object",
name: "IssueRelation",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
type: $Fields.type,
issue: $Fields.issue,
relatedIssue: $Fields.relatedIssue
}
}