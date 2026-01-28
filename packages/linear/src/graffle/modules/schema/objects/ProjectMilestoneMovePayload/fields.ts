import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"ProjectMilestoneMovePayload"`
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
value: "ProjectMilestoneMovePayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ProjectMilestoneMovePayload}.
*
* The identifier of the last sync operation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneMovePayload} |
* | **Path** | `ProjectMilestoneMovePayload.lastSyncId` |
* | **Nullability** | Required |
*/
export interface lastSyncId {
kind: "OutputField",
name: "lastSyncId",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ProjectMilestoneMovePayload}.
*
* The project milestone that was created or updated.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestone}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneMovePayload} |
* | **Path** | `ProjectMilestoneMovePayload.projectMilestone` |
* | **Nullability** | Required |
*/
export interface projectMilestone {
kind: "OutputField",
name: "projectMilestone",
arguments: {},
inlineType: [1, ],
namedType: $Schema.ProjectMilestone
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ProjectMilestoneMovePayload}.
*
* Whether the operation was successful.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneMovePayload} |
* | **Path** | `ProjectMilestoneMovePayload.success` |
* | **Nullability** | Required |
*/
export interface success {
kind: "OutputField",
name: "success",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ProjectMilestoneMovePayload}.
*
* A snapshot of the issues that were moved to new teams, if the user selected to do it, containing an array of mappings between an issue and its previous team. Store on the client to use for undoing a previous milestone move.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestoneMoveIssueToTeam}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneMovePayload} |
* | **Path** | `ProjectMilestoneMovePayload.previousIssueTeamIds` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface previousIssueTeamIds {
kind: "OutputField",
name: "previousIssueTeamIds",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.ProjectMilestoneMoveIssueToTeam
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ProjectMilestoneMovePayload}.
*
* A snapshot of the project that had new teams added to it, if the user selected to do it, containing an array of mappings between a project and its previous teams. Store on the client to use for undoing a previous milestone move.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestoneMoveProjectTeams} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneMovePayload} |
* | **Path** | `ProjectMilestoneMovePayload.previousProjectTeamIds` |
* | **Nullability** | Optional |
*/
export interface previousProjectTeamIds {
kind: "OutputField",
name: "previousProjectTeamIds",
arguments: {},
inlineType: [0, ],
namedType: $Schema.ProjectMilestoneMoveProjectTeams
}
