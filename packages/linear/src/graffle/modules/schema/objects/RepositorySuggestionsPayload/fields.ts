import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"RepositorySuggestionsPayload"`
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
value: "RepositorySuggestionsPayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.RepositorySuggestionsPayload}.
*
* The suggested repositories.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RepositorySuggestion}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.RepositorySuggestionsPayload} |
* | **Path** | `RepositorySuggestionsPayload.suggestions` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface suggestions {
kind: "OutputField",
name: "suggestions",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.RepositorySuggestion
}
