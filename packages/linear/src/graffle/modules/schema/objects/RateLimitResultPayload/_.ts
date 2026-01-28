import type * as $Fields from './fields.js'

export * as RateLimitResultPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 6 |
*/
export interface RateLimitResultPayload {
kind: "Object",
name: "RateLimitResultPayload",
fields: {
__typename: $Fields.__typename,
type: $Fields.type,
requestedAmount: $Fields.requestedAmount,
allowedAmount: $Fields.allowedAmount,
period: $Fields.period,
remainingAmount: $Fields.remainingAmount,
reset: $Fields.reset
}
}