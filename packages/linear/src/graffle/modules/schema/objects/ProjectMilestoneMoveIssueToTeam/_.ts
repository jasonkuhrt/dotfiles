import type * as $Fields from './fields.js'

export * as ProjectMilestoneMoveIssueToTeam from './fields.js'

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
export interface ProjectMilestoneMoveIssueToTeam {
kind: "Object",
name: "ProjectMilestoneMoveIssueToTeam",
fields: {
__typename: $Fields.__typename,
issueId: $Fields.issueId,
teamId: $Fields.teamId
}
}