import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitAutomationStateUpdateInput}.
*
* The associated workflow state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitAutomationStateUpdateInput} |
* | **Path** | `GitAutomationStateUpdateInput.stateId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitAutomationStateUpdateInput}.
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
* | **Parent** | {@link $Schema.GitAutomationStateUpdateInput} |
* | **Path** | `GitAutomationStateUpdateInput.branchPattern` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitAutomationStateUpdateInput}.
*
* The associated target branch. If null, all branches are targeted.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitAutomationStateUpdateInput} |
* | **Path** | `GitAutomationStateUpdateInput.targetBranchId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitAutomationStateUpdateInput}.
*
* The event that triggers the automation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitAutomationStates} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.GitAutomationStateUpdateInput} |
* | **Path** | `GitAutomationStateUpdateInput.event` |
* | **Nullability** | Optional |
*/
export interface event {
kind: "InputField",
name: "event",
inlineType: [0, ],
namedType: $Schema.GitAutomationStates,
type: $Schema.GitAutomationStates['members'] | null | undefined
}