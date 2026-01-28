import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"GitAutomationState"`
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
value: "GitAutomationState"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.GitAutomationState}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitAutomationState} |
* | **Path** | `GitAutomationState.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "OutputField",
name: "id",
arguments: {},
inlineType: [1, ],
namedType: $Schema.ID
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.GitAutomationState}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.GitAutomationState} |
* | **Path** | `GitAutomationState.createdAt` |
* | **Nullability** | Required |
*/
export interface createdAt {
kind: "OutputField",
name: "createdAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.GitAutomationState}.
*
* The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
* been updated after creation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.GitAutomationState} |
* | **Path** | `GitAutomationState.updatedAt` |
* | **Nullability** | Required |
*/
export interface updatedAt {
kind: "OutputField",
name: "updatedAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.GitAutomationState}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.GitAutomationState} |
* | **Path** | `GitAutomationState.archivedAt` |
* | **Nullability** | Optional |
*/
export interface archivedAt {
kind: "OutputField",
name: "archivedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.GitAutomationState}.
*
* The associated workflow state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowState} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.GitAutomationState} |
* | **Path** | `GitAutomationState.state` |
* | **Nullability** | Optional |
*/
export interface state {
kind: "OutputField",
name: "state",
arguments: {},
inlineType: [0, ],
namedType: $Schema.WorkflowState
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.GitAutomationState}.
*
* The team to which this automation state belongs.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Team}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.GitAutomationState} |
* | **Path** | `GitAutomationState.team` |
* | **Nullability** | Required |
*/
export interface team {
kind: "OutputField",
name: "team",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Team
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.GitAutomationState}.
*
* The target branch associated to this automation state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitAutomationTargetBranch} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.GitAutomationState} |
* | **Path** | `GitAutomationState.targetBranch` |
* | **Nullability** | Optional |
*/
export interface targetBranch {
kind: "OutputField",
name: "targetBranch",
arguments: {},
inlineType: [0, ],
namedType: $Schema.GitAutomationTargetBranch
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.GitAutomationState}.
*
* The event that triggers the automation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitAutomationStates}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.GitAutomationState} |
* | **Path** | `GitAutomationState.event` |
* | **Nullability** | Required |
*/
export interface event {
kind: "OutputField",
name: "event",
arguments: {},
inlineType: [1, ],
namedType: $Schema.GitAutomationStates
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.GitAutomationState}.
*
* [DEPRECATED] The target branch, if null, the automation will be triggered on any branch.
*
* @deprecated Use targetBranch instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitAutomationState} |
* | **Path** | `GitAutomationState.branchPattern` |
* | **⚠ Deprecated** | Use targetBranch instead. |
* | **Nullability** | Optional |
*/
export interface branchPattern {
kind: "OutputField",
name: "branchPattern",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}
