import type * as $Fields from './fields.js'

export * as Release from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* [Internal] A release.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 18 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface Release {
kind: "Object",
name: "Release",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
name: $Fields.name,
description: $Fields.description,
version: $Fields.version,
commitSha: $Fields.commitSha,
pipeline: $Fields.pipeline,
stage: $Fields.stage,
slugId: $Fields.slugId,
startDate: $Fields.startDate,
targetDate: $Fields.targetDate,
startedAt: $Fields.startedAt,
completedAt: $Fields.completedAt,
canceledAt: $Fields.canceledAt,
documents: $Fields.documents,
links: $Fields.links
}
}