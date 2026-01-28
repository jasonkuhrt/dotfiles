import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"IssueHistoryTriageRuleError"`
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
value: "IssueHistoryTriageRuleError"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistoryTriageRuleError}.
*
* The type of error that occurred.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TriageRuleErrorType}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.IssueHistoryTriageRuleError} |
* | **Path** | `IssueHistoryTriageRuleError.type` |
* | **Nullability** | Required |
*/
export interface type {
kind: "OutputField",
name: "type",
arguments: {},
inlineType: [1, ],
namedType: $Schema.TriageRuleErrorType
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistoryTriageRuleError}.
*
* The property that caused the error.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistoryTriageRuleError} |
* | **Path** | `IssueHistoryTriageRuleError.property` |
* | **Nullability** | Optional |
*/
export interface property {
kind: "OutputField",
name: "property",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistoryTriageRuleError}.
*
* Whether the conflict was for the same child label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistoryTriageRuleError} |
* | **Path** | `IssueHistoryTriageRuleError.conflictForSameChildLabel` |
* | **Nullability** | Optional |
*/
export interface conflictForSameChildLabel {
kind: "OutputField",
name: "conflictForSameChildLabel",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistoryTriageRuleError}.
*
* The team the issue was being moved from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Team} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistoryTriageRuleError} |
* | **Path** | `IssueHistoryTriageRuleError.fromTeam` |
* | **Nullability** | Optional |
*/
export interface fromTeam {
kind: "OutputField",
name: "fromTeam",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Team
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistoryTriageRuleError}.
*
* The team the issue was being moved to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Team} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistoryTriageRuleError} |
* | **Path** | `IssueHistoryTriageRuleError.toTeam` |
* | **Nullability** | Optional |
*/
export interface toTeam {
kind: "OutputField",
name: "toTeam",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Team
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistoryTriageRuleError}.
*
* The conflicting labels.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabel}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistoryTriageRuleError} |
* | **Path** | `IssueHistoryTriageRuleError.conflictingLabels` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface conflictingLabels {
kind: "OutputField",
name: "conflictingLabels",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.IssueLabel
}
