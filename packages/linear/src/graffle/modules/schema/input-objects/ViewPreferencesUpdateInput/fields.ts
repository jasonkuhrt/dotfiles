import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ViewPreferencesUpdateInput}.
*
* View preferences.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.ViewPreferencesUpdateInput} |
* | **Path** | `ViewPreferencesUpdateInput.preferences` |
* | **Nullability** | Optional |
*/
export interface preferences {
kind: "InputField",
name: "preferences",
inlineType: [0, ],
namedType: $Schema.JSONObject,
type: $Schema.JSONObject['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ViewPreferencesUpdateInput}.
*
* The default parameters for the insight on that view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.ViewPreferencesUpdateInput} |
* | **Path** | `ViewPreferencesUpdateInput.insights` |
* | **Nullability** | Optional |
*/
export interface insights {
kind: "InputField",
name: "insights",
inlineType: [0, ],
namedType: $Schema.JSONObject,
type: $Schema.JSONObject['codec']['_typeDecoded'] | null | undefined
}