import type * as $Fields from './fields.js'

export * as ProjectMilestoneMoveProjectTeamsInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* [Internal] Used for ProjectMilestoneMoveInput to describe a snapshot of a project and its team ids
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | No |
*/
export interface ProjectMilestoneMoveProjectTeamsInput {
kind: "InputObject",
name: "ProjectMilestoneMoveProjectTeamsInput",
isAllFieldsNullable: false,
fields: {
projectId: $Fields.projectId,
teamIds: $Fields.teamIds
},
type: {
projectId: $Fields.projectId['type'],
teamIds: $Fields.teamIds['type']
}
}