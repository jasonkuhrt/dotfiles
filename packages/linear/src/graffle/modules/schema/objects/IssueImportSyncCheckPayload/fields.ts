import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"IssueImportSyncCheckPayload"`
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
value: "IssueImportSyncCheckPayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueImportSyncCheckPayload}.
*
* Returns true if the import can be synced, false otherwise
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueImportSyncCheckPayload} |
* | **Path** | `IssueImportSyncCheckPayload.canSync` |
* | **Nullability** | Required |
*/
export interface canSync {
kind: "OutputField",
name: "canSync",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueImportSyncCheckPayload}.
*
* An error message with a root cause of why the import cannot be synced
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueImportSyncCheckPayload} |
* | **Path** | `IssueImportSyncCheckPayload.error` |
* | **Nullability** | Optional |
*/
export interface error {
kind: "OutputField",
name: "error",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}
