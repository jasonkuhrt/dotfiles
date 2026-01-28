import type * as $Fields from './fields.js'

export * as RepositorySuggestionsPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 1 |
*/
export interface RepositorySuggestionsPayload {
kind: "Object",
name: "RepositorySuggestionsPayload",
fields: {
__typename: $Fields.__typename,
suggestions: $Fields.suggestions
}
}