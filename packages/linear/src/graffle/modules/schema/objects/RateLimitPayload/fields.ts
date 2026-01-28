import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"RateLimitPayload"`
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
value: "RateLimitPayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.RateLimitPayload}.
*
* The identifier we rate limit on.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.RateLimitPayload} |
* | **Path** | `RateLimitPayload.identifier` |
* | **Nullability** | Optional |
*/
export interface identifier {
kind: "OutputField",
name: "identifier",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.RateLimitPayload}.
*
* The kind of rate limit selected for this request.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.RateLimitPayload} |
* | **Path** | `RateLimitPayload.kind` |
* | **Nullability** | Required |
*/
export interface kind {
kind: "OutputField",
name: "kind",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.RateLimitPayload}.
*
* The state of the rate limit.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RateLimitResultPayload}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.RateLimitPayload} |
* | **Path** | `RateLimitPayload.limits` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface limits {
kind: "OutputField",
name: "limits",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.RateLimitResultPayload
}
