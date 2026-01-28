import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectMilestoneMoveProjectTeamsInput}.
*
* The project id
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneMoveProjectTeamsInput} |
* | **Path** | `ProjectMilestoneMoveProjectTeamsInput.projectId` |
* | **Nullability** | Required |
*/
export interface projectId {
kind: "InputField",
name: "projectId",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectMilestoneMoveProjectTeamsInput}.
*
* The team ids for the project
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneMoveProjectTeamsInput} |
* | **Path** | `ProjectMilestoneMoveProjectTeamsInput.teamIds` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface teamIds {
kind: "InputField",
name: "teamIds",
inlineType: [1, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[]
}