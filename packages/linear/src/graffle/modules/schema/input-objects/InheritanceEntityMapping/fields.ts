import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InheritanceEntityMapping}.
*
* Mapping of the WorkflowState ID to the new WorkflowState ID.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.InheritanceEntityMapping} |
* | **Path** | `InheritanceEntityMapping.workflowStates` |
* | **Nullability** | Required |
*/
export interface workflowStates {
kind: "InputField",
name: "workflowStates",
inlineType: [1, ],
namedType: $Schema.JSONObject,
type: $Schema.JSONObject['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InheritanceEntityMapping}.
*
* Mapping of the IssueLabel ID to the new IssueLabel name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.InheritanceEntityMapping} |
* | **Path** | `InheritanceEntityMapping.issueLabels` |
* | **Nullability** | Optional |
*/
export interface issueLabels {
kind: "InputField",
name: "issueLabels",
inlineType: [0, ],
namedType: $Schema.JSONObject,
type: $Schema.JSONObject['codec']['_typeDecoded'] | null | undefined
}