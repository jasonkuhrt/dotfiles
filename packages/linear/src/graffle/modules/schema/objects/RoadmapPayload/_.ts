import type * as $Fields from './fields.js'

export * as RoadmapPayload from './fields.js'

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
export interface RoadmapPayload {
kind: "Object",
name: "RoadmapPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
roadmap: $Fields.roadmap,
success: $Fields.success
}
}