import type * as $Fields from './fields.js'

export * as SemanticSearchResult from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A semantic search result reference.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 6 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface SemanticSearchResult {
kind: "Object",
name: "SemanticSearchResult",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
type: $Fields.type,
issue: $Fields.issue,
project: $Fields.project,
initiative: $Fields.initiative,
document: $Fields.document
}
}