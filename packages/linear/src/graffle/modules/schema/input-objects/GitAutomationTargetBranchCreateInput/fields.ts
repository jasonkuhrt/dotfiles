import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitAutomationTargetBranchCreateInput}.
*
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitAutomationTargetBranchCreateInput} |
* | **Path** | `GitAutomationTargetBranchCreateInput.id` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitAutomationTargetBranchCreateInput}.
*
* The team associated with the Git target branch automation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitAutomationTargetBranchCreateInput} |
* | **Path** | `GitAutomationTargetBranchCreateInput.teamId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitAutomationTargetBranchCreateInput}.
*
* The target branch pattern.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitAutomationTargetBranchCreateInput} |
* | **Path** | `GitAutomationTargetBranchCreateInput.branchPattern` |
* | **Nullability** | Required |
*/
export interface branchPattern {
kind: "InputField",
name: "branchPattern",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitAutomationTargetBranchCreateInput}.
*
* Whether the branch pattern is a regular expression.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitAutomationTargetBranchCreateInput} |
* | **Path** | `GitAutomationTargetBranchCreateInput.isRegex` |
* | **Default** | `false` |
* | **Nullability** | Optional |
*/
export interface isRegex {
kind: "InputField",
name: "isRegex",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}