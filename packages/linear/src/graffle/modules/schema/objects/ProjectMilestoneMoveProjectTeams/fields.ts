import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"ProjectMilestoneMoveProjectTeams"`
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
value: "ProjectMilestoneMoveProjectTeams"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ProjectMilestoneMoveProjectTeams}.
*
* The project id
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneMoveProjectTeams} |
* | **Path** | `ProjectMilestoneMoveProjectTeams.projectId` |
* | **Nullability** | Required |
*/
export interface projectId {
kind: "OutputField",
name: "projectId",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ProjectMilestoneMoveProjectTeams}.
*
* The team ids for the project
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneMoveProjectTeams} |
* | **Path** | `ProjectMilestoneMoveProjectTeams.teamIds` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface teamIds {
kind: "OutputField",
name: "teamIds",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.String
}
