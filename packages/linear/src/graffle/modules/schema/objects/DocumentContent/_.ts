import type * as $Fields from './fields.js'

export * as DocumentContent from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A document content for a project.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 13 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface DocumentContent {
kind: "Object",
name: "DocumentContent",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
content: $Fields.content,
contentState: $Fields.contentState,
issue: $Fields.issue,
project: $Fields.project,
initiative: $Fields.initiative,
projectMilestone: $Fields.projectMilestone,
document: $Fields.document,
aiPromptRules: $Fields.aiPromptRules,
restoredAt: $Fields.restoredAt
}
}