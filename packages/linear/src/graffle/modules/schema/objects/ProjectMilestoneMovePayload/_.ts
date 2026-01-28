import type * as $Fields from './fields.js'

export * as ProjectMilestoneMovePayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 5 |
*/
export interface ProjectMilestoneMovePayload {
kind: "Object",
name: "ProjectMilestoneMovePayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
projectMilestone: $Fields.projectMilestone,
success: $Fields.success,
previousIssueTeamIds: $Fields.previousIssueTeamIds,
previousProjectTeamIds: $Fields.previousProjectTeamIds
}
}