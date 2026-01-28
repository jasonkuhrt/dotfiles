import type * as $Fields from './fields.js'

export * as ProjectMilestoneMoveProjectTeams from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 2 |
*/
export interface ProjectMilestoneMoveProjectTeams {
kind: "Object",
name: "ProjectMilestoneMoveProjectTeams",
fields: {
__typename: $Fields.__typename,
projectId: $Fields.projectId,
teamIds: $Fields.teamIds
}
}