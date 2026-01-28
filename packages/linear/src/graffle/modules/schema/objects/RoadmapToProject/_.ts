import type * as $Fields from './fields.js'

export * as RoadmapToProject from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* [Deprecated] Join table between projects and roadmaps.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 7 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface RoadmapToProject {
kind: "Object",
name: "RoadmapToProject",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
project: $Fields.project,
roadmap: $Fields.roadmap,
sortOrder: $Fields.sortOrder
}
}