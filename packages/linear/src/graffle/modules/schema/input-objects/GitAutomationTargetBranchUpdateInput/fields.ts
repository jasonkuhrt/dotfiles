import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitAutomationTargetBranchUpdateInput}.
*
* The target branch pattern.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitAutomationTargetBranchUpdateInput} |
* | **Path** | `GitAutomationTargetBranchUpdateInput.branchPattern` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitAutomationTargetBranchUpdateInput}.
*
* Whether the branch pattern is a regular expression.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitAutomationTargetBranchUpdateInput} |
* | **Path** | `GitAutomationTargetBranchUpdateInput.isRegex` |
* | **Nullability** | Optional |
*/
export interface isRegex {
kind: "InputField",
name: "isRegex",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}