import type * as $Fields from './fields.js'

export * as ProjectFilterSuggestionPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 2 |
*/
export interface ProjectFilterSuggestionPayload {
kind: "Object",
name: "ProjectFilterSuggestionPayload",
fields: {
__typename: $Fields.__typename,
filter: $Fields.filter,
logId: $Fields.logId
}
}