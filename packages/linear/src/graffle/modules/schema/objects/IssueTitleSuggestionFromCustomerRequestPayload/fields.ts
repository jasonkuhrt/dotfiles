import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"IssueTitleSuggestionFromCustomerRequestPayload"`
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
value: "IssueTitleSuggestionFromCustomerRequestPayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueTitleSuggestionFromCustomerRequestPayload}.
*
* The identifier of the last sync operation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueTitleSuggestionFromCustomerRequestPayload} |
* | **Path** | `IssueTitleSuggestionFromCustomerRequestPayload.lastSyncId` |
* | **Nullability** | Required |
*/
export interface lastSyncId {
kind: "OutputField",
name: "lastSyncId",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueTitleSuggestionFromCustomerRequestPayload}.
*
* The suggested issue title.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueTitleSuggestionFromCustomerRequestPayload} |
* | **Path** | `IssueTitleSuggestionFromCustomerRequestPayload.title` |
* | **Nullability** | Required |
*/
export interface title {
kind: "OutputField",
name: "title",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueTitleSuggestionFromCustomerRequestPayload}.
*
* [Internal] The log id of the ai response.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueTitleSuggestionFromCustomerRequestPayload} |
* | **Path** | `IssueTitleSuggestionFromCustomerRequestPayload.logId` |
* | **Nullability** | Optional |
*/
export interface logId {
kind: "OutputField",
name: "logId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}
