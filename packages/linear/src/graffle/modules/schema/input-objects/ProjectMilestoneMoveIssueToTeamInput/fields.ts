import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectMilestoneMoveIssueToTeamInput}.
*
* The issue id in this relationship, you can use * as wildcard if all issues are being moved to the same team
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneMoveIssueToTeamInput} |
* | **Path** | `ProjectMilestoneMoveIssueToTeamInput.issueId` |
* | **Nullability** | Required |
*/
export interface issueId {
kind: "InputField",
name: "issueId",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectMilestoneMoveIssueToTeamInput}.
*
* The team id in this relationship
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneMoveIssueToTeamInput} |
* | **Path** | `ProjectMilestoneMoveIssueToTeamInput.teamId` |
* | **Nullability** | Required |
*/
export interface teamId {
kind: "InputField",
name: "teamId",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}