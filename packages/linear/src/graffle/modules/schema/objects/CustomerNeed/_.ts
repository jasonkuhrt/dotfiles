import type * as $Fields from './fields.js'

export * as CustomerNeed from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A customer need, expressed through a reference to an issue, project, or comment.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 16 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface CustomerNeed {
kind: "Object",
name: "CustomerNeed",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
customer: $Fields.customer,
issue: $Fields.issue,
project: $Fields.project,
comment: $Fields.comment,
attachment: $Fields.attachment,
projectAttachment: $Fields.projectAttachment,
priority: $Fields.priority,
body: $Fields.body,
bodyData: $Fields.bodyData,
creator: $Fields.creator,
originalIssue: $Fields.originalIssue,
url: $Fields.url
}
}