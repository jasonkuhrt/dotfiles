import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"IssueHistoryTriageRuleMetadata"`
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
value: "IssueHistoryTriageRuleMetadata"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistoryTriageRuleMetadata}.
*
* The error that occurred, if any.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueHistoryTriageRuleError} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistoryTriageRuleMetadata} |
* | **Path** | `IssueHistoryTriageRuleMetadata.triageRuleError` |
* | **Nullability** | Optional |
*/
export interface triageRuleError {
kind: "OutputField",
name: "triageRuleError",
arguments: {},
inlineType: [0, ],
namedType: $Schema.IssueHistoryTriageRuleError
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistoryTriageRuleMetadata}.
*
* The triage rule that triggered the issue update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowDefinition} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistoryTriageRuleMetadata} |
* | **Path** | `IssueHistoryTriageRuleMetadata.updatedByTriageRule` |
* | **Nullability** | Optional |
*/
export interface updatedByTriageRule {
kind: "OutputField",
name: "updatedByTriageRule",
arguments: {},
inlineType: [0, ],
namedType: $Schema.WorkflowDefinition
}
