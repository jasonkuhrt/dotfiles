import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueBatchCreateInput}.
*
* The issues to create.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueCreateInput}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueBatchCreateInput} |
* | **Path** | `IssueBatchCreateInput.issues` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface issues {
kind: "InputField",
name: "issues",
inlineType: [1, [1, ]],
namedType: $Schema.IssueCreateInput,
type: readonly ($Schema.IssueCreateInput['type'])[]
}