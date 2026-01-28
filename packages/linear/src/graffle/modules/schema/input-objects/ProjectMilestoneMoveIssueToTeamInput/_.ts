import type * as $Fields from './fields.js'

export * as ProjectMilestoneMoveIssueToTeamInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* [Internal] Used for ProjectMilestoneMoveInput to describe a mapping between an issue and its team.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | No |
*/
export interface ProjectMilestoneMoveIssueToTeamInput {
kind: "InputObject",
name: "ProjectMilestoneMoveIssueToTeamInput",
isAllFieldsNullable: false,
fields: {
issueId: $Fields.issueId,
teamId: $Fields.teamId
},
type: {
issueId: $Fields.issueId['type'],
teamId: $Fields.teamId['type']
}
}