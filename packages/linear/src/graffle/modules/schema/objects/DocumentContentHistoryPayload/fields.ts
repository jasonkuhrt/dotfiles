import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"DocumentContentHistoryPayload"`
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
value: "DocumentContentHistoryPayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.DocumentContentHistoryPayload}.
*
* The document content history entries.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentContentHistoryType}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.DocumentContentHistoryPayload} |
* | **Path** | `DocumentContentHistoryPayload.history` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface history {
kind: "OutputField",
name: "history",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.DocumentContentHistoryType
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.DocumentContentHistoryPayload}.
*
* Whether the operation was successful.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.DocumentContentHistoryPayload} |
* | **Path** | `DocumentContentHistoryPayload.success` |
* | **Nullability** | Required |
*/
export interface success {
kind: "OutputField",
name: "success",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}
