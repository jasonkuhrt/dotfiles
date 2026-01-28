import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"ProjectFilterSuggestionPayload"`
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
value: "ProjectFilterSuggestionPayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ProjectFilterSuggestionPayload}.
*
* The json filter that is suggested.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.ProjectFilterSuggestionPayload} |
* | **Path** | `ProjectFilterSuggestionPayload.filter` |
* | **Nullability** | Optional |
*/
export interface filter {
kind: "OutputField",
name: "filter",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ProjectFilterSuggestionPayload}.
*
* The log id of the prompt, that created this filter.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectFilterSuggestionPayload} |
* | **Path** | `ProjectFilterSuggestionPayload.logId` |
* | **Nullability** | Optional |
*/
export interface logId {
kind: "OutputField",
name: "logId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}
