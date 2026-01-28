import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectMilestoneMoveInput}.
*
* The identifier of the project to move the milestone to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneMoveInput} |
* | **Path** | `ProjectMilestoneMoveInput.projectId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectMilestoneMoveInput}.
*
* The team id to move the attached issues to. This is needed when there is a mismatch between a project's teams and the milestone's issues' teams. Either this or addIssueTeamToProject is required in that situation to resolve constraints.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneMoveInput} |
* | **Path** | `ProjectMilestoneMoveInput.newIssueTeamId` |
* | **Nullability** | Optional |
*/
export interface newIssueTeamId {
kind: "InputField",
name: "newIssueTeamId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectMilestoneMoveInput}.
*
* Whether to add each milestone issue's team to the project. This is needed when there is a mismatch between a project's teams and the milestone's issues' teams. Either this or newIssueTeamId is required in that situation to resolve constraints.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneMoveInput} |
* | **Path** | `ProjectMilestoneMoveInput.addIssueTeamToProject` |
* | **Nullability** | Optional |
*/
export interface addIssueTeamToProject {
kind: "InputField",
name: "addIssueTeamToProject",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectMilestoneMoveInput}.
*
* A list of issue id to team ids, used for undoing a previous milestone move where the specified issues were moved from the specified teams.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestoneMoveIssueToTeamInput}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneMoveInput} |
* | **Path** | `ProjectMilestoneMoveInput.undoIssueTeamIds` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface undoIssueTeamIds {
kind: "InputField",
name: "undoIssueTeamIds",
inlineType: [0, [1, ]],
namedType: $Schema.ProjectMilestoneMoveIssueToTeamInput,
type: readonly ($Schema.ProjectMilestoneMoveIssueToTeamInput['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectMilestoneMoveInput}.
*
* A mapping of project id to a previous set of team ids, used for undoing a previous milestone move where the specified teams were added to the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestoneMoveProjectTeamsInput} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneMoveInput} |
* | **Path** | `ProjectMilestoneMoveInput.undoProjectTeamIds` |
* | **Nullability** | Optional |
*/
export interface undoProjectTeamIds {
kind: "InputField",
name: "undoProjectTeamIds",
inlineType: [0, ],
namedType: $Schema.ProjectMilestoneMoveProjectTeamsInput,
type: $Schema.ProjectMilestoneMoveProjectTeamsInput['type'] | null | undefined
}