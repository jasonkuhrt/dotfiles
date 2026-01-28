import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"IssueImportJqlCheckPayload"`
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
value: "IssueImportJqlCheckPayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueImportJqlCheckPayload}.
*
* Returns true if the JQL query has been validated successfully, false otherwise
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueImportJqlCheckPayload} |
* | **Path** | `IssueImportJqlCheckPayload.success` |
* | **Nullability** | Required |
*/
export interface success {
kind: "OutputField",
name: "success",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueImportJqlCheckPayload}.
*
* Returns an approximate number of issues matching the JQL query, if available
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueImportJqlCheckPayload} |
* | **Path** | `IssueImportJqlCheckPayload.count` |
* | **Nullability** | Optional |
*/
export interface count {
kind: "OutputField",
name: "count",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueImportJqlCheckPayload}.
*
* An error message returned by Jira when validating the JQL query.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueImportJqlCheckPayload} |
* | **Path** | `IssueImportJqlCheckPayload.error` |
* | **Nullability** | Optional |
*/
export interface error {
kind: "OutputField",
name: "error",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}
