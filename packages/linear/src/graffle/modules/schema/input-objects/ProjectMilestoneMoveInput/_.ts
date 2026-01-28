import type * as $Fields from './fields.js'

export * as ProjectMilestoneMoveInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 5 |
* | **All Fields Nullable** | Yes |
*/
export interface ProjectMilestoneMoveInput {
kind: "InputObject",
name: "ProjectMilestoneMoveInput",
isAllFieldsNullable: true,
fields: {
projectId: $Fields.projectId,
newIssueTeamId: $Fields.newIssueTeamId,
addIssueTeamToProject: $Fields.addIssueTeamToProject,
undoIssueTeamIds: $Fields.undoIssueTeamIds,
undoProjectTeamIds: $Fields.undoProjectTeamIds
},
type: {
projectId: $Fields.projectId['type'],
newIssueTeamId?: $Fields.newIssueTeamId['type'],
addIssueTeamToProject?: $Fields.addIssueTeamToProject['type'],
undoIssueTeamIds?: $Fields.undoIssueTeamIds['type'],
undoProjectTeamIds?: $Fields.undoProjectTeamIds['type']
}
}