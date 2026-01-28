import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TriageResponsibilityManualSelectionInput}.
*
* The set of users responsible for triage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TriageResponsibilityManualSelectionInput} |
* | **Path** | `TriageResponsibilityManualSelectionInput.userIds` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface userIds {
kind: "InputField",
name: "userIds",
inlineType: [1, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[]
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TriageResponsibilityManualSelectionInput}.
*
* [Internal] The index of the current userId used for the assign action when having more than one user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Int} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TriageResponsibilityManualSelectionInput} |
* | **Path** | `TriageResponsibilityManualSelectionInput.assignmentIndex` |
* | **Nullability** | Optional |
*/
export interface assignmentIndex {
kind: "InputField",
name: "assignmentIndex",
inlineType: [0, ],
namedType: $Schema.Int,
type: $Schema.Int['codec']['_typeDecoded'] | null | undefined
}