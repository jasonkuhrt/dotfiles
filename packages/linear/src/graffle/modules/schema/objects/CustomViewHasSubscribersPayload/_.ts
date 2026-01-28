import type * as $Fields from './fields.js'

export * as CustomViewHasSubscribersPayload from './fields.js'

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
export interface CustomViewHasSubscribersPayload {
kind: "Object",
name: "CustomViewHasSubscribersPayload",
fields: {
__typename: $Fields.__typename,
hasSubscribers: $Fields.hasSubscribers
}
}