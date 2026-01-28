import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"SemanticSearchPayload"`
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
value: "SemanticSearchPayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SemanticSearchPayload}.
*
* Whether the semantic search is enabled.
*
* @deprecated Always true.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SemanticSearchPayload} |
* | **Path** | `SemanticSearchPayload.enabled` |
* | **⚠ Deprecated** | Always true. |
* | **Nullability** | Required |
*/
export interface enabled {
kind: "OutputField",
name: "enabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SemanticSearchPayload}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SemanticSearchResult}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.SemanticSearchPayload} |
* | **Path** | `SemanticSearchPayload.results` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface results {
kind: "OutputField",
name: "results",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.SemanticSearchResult
}
