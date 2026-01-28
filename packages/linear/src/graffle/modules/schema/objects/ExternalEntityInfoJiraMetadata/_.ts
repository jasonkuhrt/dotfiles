import type * as $Fields from './fields.js'

export * as ExternalEntityInfoJiraMetadata from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Metadata about the external Jira entity.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 3 |
*/
export interface ExternalEntityInfoJiraMetadata {
kind: "Object",
name: "ExternalEntityInfoJiraMetadata",
fields: {
__typename: $Fields.__typename,
issueKey: $Fields.issueKey,
projectId: $Fields.projectId,
issueTypeId: $Fields.issueTypeId
}
}