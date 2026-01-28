import type * as $Fields from './fields.js'

export * as SemanticSearchPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Payload returned by semantic search.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 2 |
*/
export interface SemanticSearchPayload {
kind: "Object",
name: "SemanticSearchPayload",
fields: {
__typename: $Fields.__typename,
enabled: $Fields.enabled,
results: $Fields.results
}
}