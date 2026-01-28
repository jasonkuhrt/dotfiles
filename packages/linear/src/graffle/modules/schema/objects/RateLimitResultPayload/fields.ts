import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"RateLimitResultPayload"`
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
value: "RateLimitResultPayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.RateLimitResultPayload}.
*
* What is being rate limited.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.RateLimitResultPayload} |
* | **Path** | `RateLimitResultPayload.type` |
* | **Nullability** | Required |
*/
export interface type {
kind: "OutputField",
name: "type",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.RateLimitResultPayload}.
*
* The requested quantity for this type of limit.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.RateLimitResultPayload} |
* | **Path** | `RateLimitResultPayload.requestedAmount` |
* | **Nullability** | Required |
*/
export interface requestedAmount {
kind: "OutputField",
name: "requestedAmount",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.RateLimitResultPayload}.
*
* The total allowed quantity for this type of limit.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.RateLimitResultPayload} |
* | **Path** | `RateLimitResultPayload.allowedAmount` |
* | **Nullability** | Required |
*/
export interface allowedAmount {
kind: "OutputField",
name: "allowedAmount",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.RateLimitResultPayload}.
*
* The period in which the rate limit is fully replenished in ms.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.RateLimitResultPayload} |
* | **Path** | `RateLimitResultPayload.period` |
* | **Nullability** | Required |
*/
export interface period {
kind: "OutputField",
name: "period",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.RateLimitResultPayload}.
*
* The remaining quantity for this type of limit after this request.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.RateLimitResultPayload} |
* | **Path** | `RateLimitResultPayload.remainingAmount` |
* | **Nullability** | Required |
*/
export interface remainingAmount {
kind: "OutputField",
name: "remainingAmount",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.RateLimitResultPayload}.
*
* The timestamp after the rate limit is fully replenished as a UNIX timestamp.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.RateLimitResultPayload} |
* | **Path** | `RateLimitResultPayload.reset` |
* | **Nullability** | Required |
*/
export interface reset {
kind: "OutputField",
name: "reset",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}
