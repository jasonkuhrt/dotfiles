import type * as $Fields from './fields.js'

export * as RoadmapToProjectPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 3 |
*/
export interface RoadmapToProjectPayload {
kind: "Object",
name: "RoadmapToProjectPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
roadmapToProject: $Fields.roadmapToProject,
success: $Fields.success
}
}