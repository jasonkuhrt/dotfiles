import type * as $Fields from './fields.js'

export * as IssueImport from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* An import job for data from an external service.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 15 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface IssueImport {
kind: "Object",
name: "IssueImport",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
teamName: $Fields.teamName,
creatorId: $Fields.creatorId,
service: $Fields.service,
status: $Fields.status,
mapping: $Fields.mapping,
error: $Fields.error,
progress: $Fields.progress,
csvFileUrl: $Fields.csvFileUrl,
errorMetadata: $Fields.errorMetadata,
serviceMetadata: $Fields.serviceMetadata,
displayName: $Fields.displayName
}
}