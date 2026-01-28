import type * as $Fields from './fields.js'

export * as RateLimitPayload from './fields.js'

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
export interface RateLimitPayload {
kind: "Object",
name: "RateLimitPayload",
fields: {
__typename: $Fields.__typename,
identifier: $Fields.identifier,
kind: $Fields.kind,
limits: $Fields.limits
}
}