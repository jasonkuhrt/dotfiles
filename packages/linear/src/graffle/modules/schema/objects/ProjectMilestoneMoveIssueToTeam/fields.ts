import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"ProjectMilestoneMoveIssueToTeam"`
*
* {@link https://graphql.org/learn/queries/#meta-fields | GraphQL __typename documentation}
*/
export interface __typename {
kind: "OutputField",
name: "__typename",
arguments: {},
inlineType: [1],
namedType: {
kind: "__typename",
value: "ProjectMilestoneMoveIssueToTeam"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ProjectMilestoneMoveIssueToTeam}.
*
* The issue id in this relationship, you can use * as wildcard if all issues are being moved to the same team
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneMoveIssueToTeam} |
* | **Path** | `ProjectMilestoneMoveIssueToTeam.issueId` |
* | **Nullability** | Required |
*/
export interface issueId {
kind: "OutputField",
name: "issueId",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ProjectMilestoneMoveIssueToTeam}.
*
* The team id in this relationship
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneMoveIssueToTeam} |
* | **Path** | `ProjectMilestoneMoveIssueToTeam.teamId` |
* | **Nullability** | Required |
*/
export interface teamId {
kind: "OutputField",
name: "teamId",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}
