import type * as $Fields from './fields.js'

export * as ProjectRelation from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A relation between two projects.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 12 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface ProjectRelation {
kind: "Object",
name: "ProjectRelation",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
type: $Fields.type,
project: $Fields.project,
projectMilestone: $Fields.projectMilestone,
anchorType: $Fields.anchorType,
relatedProject: $Fields.relatedProject,
relatedProjectMilestone: $Fields.relatedProjectMilestone,
relatedAnchorType: $Fields.relatedAnchorType,
user: $Fields.user
}
}