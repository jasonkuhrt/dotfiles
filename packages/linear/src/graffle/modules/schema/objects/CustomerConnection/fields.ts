import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"CustomerConnection"`
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
value: "CustomerConnection"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerConnection}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerEdge}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomerConnection} |
* | **Path** | `CustomerConnection.edges` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface edges {
kind: "OutputField",
name: "edges",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.CustomerEdge
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerConnection}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Customer}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomerConnection} |
* | **Path** | `CustomerConnection.nodes` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface nodes {
kind: "OutputField",
name: "nodes",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.Customer
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerConnection}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PageInfo}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomerConnection} |
* | **Path** | `CustomerConnection.pageInfo` |
* | **Nullability** | Required |
*/
export interface pageInfo {
kind: "OutputField",
name: "pageInfo",
arguments: {},
inlineType: [1, ],
namedType: $Schema.PageInfo
}
