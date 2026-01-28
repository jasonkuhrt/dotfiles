import type * as $Fields from './fields.js'

export * as RepositorySuggestion from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 3 |
*/
export interface RepositorySuggestion {
kind: "Object",
name: "RepositorySuggestion",
fields: {
__typename: $Fields.__typename,
repositoryFullName: $Fields.repositoryFullName,
hostname: $Fields.hostname,
confidence: $Fields.confidence
}
}