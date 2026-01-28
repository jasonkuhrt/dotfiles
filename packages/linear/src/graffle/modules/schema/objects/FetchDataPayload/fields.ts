import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"FetchDataPayload"`
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
value: "FetchDataPayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.FetchDataPayload}.
*
* The fetched data based on the natural language query.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.FetchDataPayload} |
* | **Path** | `FetchDataPayload.data` |
* | **Nullability** | Optional |
*/
export interface data {
kind: "OutputField",
name: "data",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.FetchDataPayload}.
*
* The GraphQL query used to fetch the data.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FetchDataPayload} |
* | **Path** | `FetchDataPayload.query` |
* | **Nullability** | Optional |
*/
export interface query {
kind: "OutputField",
name: "query",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.FetchDataPayload}.
*
* The filters used to fetch the data.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.FetchDataPayload} |
* | **Path** | `FetchDataPayload.filters` |
* | **Nullability** | Optional |
*/
export interface filters {
kind: "OutputField",
name: "filters",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.FetchDataPayload}.
*
* Whether the fetch operation was successful.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FetchDataPayload} |
* | **Path** | `FetchDataPayload.success` |
* | **Nullability** | Required |
*/
export interface success {
kind: "OutputField",
name: "success",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}
