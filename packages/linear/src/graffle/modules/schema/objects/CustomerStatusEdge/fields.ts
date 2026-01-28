import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"CustomerStatusEdge"`
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
value: "CustomerStatusEdge"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerStatusEdge}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerStatus}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomerStatusEdge} |
* | **Path** | `CustomerStatusEdge.node` |
* | **Nullability** | Required |
*/
export interface node {
kind: "OutputField",
name: "node",
arguments: {},
inlineType: [1, ],
namedType: $Schema.CustomerStatus
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerStatusEdge}.
*
* Used in `before` and `after` args
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerStatusEdge} |
* | **Path** | `CustomerStatusEdge.cursor` |
* | **Nullability** | Required |
*/
export interface cursor {
kind: "OutputField",
name: "cursor",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}
