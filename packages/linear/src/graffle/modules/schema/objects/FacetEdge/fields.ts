import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"FacetEdge"`
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
value: "FacetEdge"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.FacetEdge}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Facet}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.FacetEdge} |
* | **Path** | `FacetEdge.node` |
* | **Nullability** | Required |
*/
export interface node {
kind: "OutputField",
name: "node",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Facet
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.FacetEdge}.
*
* Used in `before` and `after` args
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FacetEdge} |
* | **Path** | `FacetEdge.cursor` |
* | **Nullability** | Required |
*/
export interface cursor {
kind: "OutputField",
name: "cursor",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}
