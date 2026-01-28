import type * as $Fields from './fields.js'

export * as CustomViewSuggestionPayload from './fields.js'

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
export interface CustomViewSuggestionPayload {
kind: "Object",
name: "CustomViewSuggestionPayload",
fields: {
__typename: $Fields.__typename,
name: $Fields.name,
description: $Fields.description,
icon: $Fields.icon
}
}