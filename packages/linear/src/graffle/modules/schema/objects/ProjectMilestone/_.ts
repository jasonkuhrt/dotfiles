import type * as $Fields from './fields.js'

export * as ProjectMilestone from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A milestone for a project.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 16 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface ProjectMilestone {
kind: "Object",
name: "ProjectMilestone",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
name: $Fields.name,
documentContent: $Fields.documentContent,
targetDate: $Fields.targetDate,
project: $Fields.project,
progressHistory: $Fields.progressHistory,
currentProgress: $Fields.currentProgress,
sortOrder: $Fields.sortOrder,
description: $Fields.description,
status: $Fields.status,
progress: $Fields.progress,
descriptionState: $Fields.descriptionState,
issues: $Fields.issues
}
}