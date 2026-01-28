import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitAutomationStateCreateInput}.
*
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitAutomationStateCreateInput} |
* | **Path** | `GitAutomationStateCreateInput.id` |
* | **Nullability** | Optional |
*/
export interface id {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitAutomationStateCreateInput}.
*
* The team associated with the automation state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitAutomationStateCreateInput} |
* | **Path** | `GitAutomationStateCreateInput.teamId` |
* | **Nullability** | Required |
*/
export interface teamId {
kind: "InputField",
name: "teamId",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitAutomationStateCreateInput}.
*
* The associated workflow state. If null, will override default behaviour and take no action.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitAutomationStateCreateInput} |
* | **Path** | `GitAutomationStateCreateInput.stateId` |
* | **Nullability** | Optional |
*/
export interface stateId {
kind: "InputField",
name: "stateId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitAutomationStateCreateInput}.
*
* [DEPRECATED] The target branch pattern. If null, all branches are targeted.
*
* @deprecated Use targetBranchId instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitAutomationStateCreateInput} |
* | **Path** | `GitAutomationStateCreateInput.branchPattern` |
* | **⚠ Deprecated** | Use targetBranchId instead. |
* | **Nullability** | Optional |
*/
export interface branchPattern {
kind: "InputField",
name: "branchPattern",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitAutomationStateCreateInput}.
*
* The associated target branch. If null, all branches are targeted.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitAutomationStateCreateInput} |
* | **Path** | `GitAutomationStateCreateInput.targetBranchId` |
* | **Nullability** | Optional |
*/
export interface targetBranchId {
kind: "InputField",
name: "targetBranchId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitAutomationStateCreateInput}.
*
* The event that triggers the automation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitAutomationStates}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.GitAutomationStateCreateInput} |
* | **Path** | `GitAutomationStateCreateInput.event` |
* | **Nullability** | Required |
*/
export interface event {
kind: "InputField",
name: "event",
inlineType: [1, ],
namedType: $Schema.GitAutomationStates,
type: $Schema.GitAutomationStates['members']
}