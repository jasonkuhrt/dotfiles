import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"EntityExternalLinkEdge"`
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
value: "EntityExternalLinkEdge"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EntityExternalLinkEdge}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EntityExternalLink}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.EntityExternalLinkEdge} |
* | **Path** | `EntityExternalLinkEdge.node` |
* | **Nullability** | Required |
*/
export interface node {
kind: "OutputField",
name: "node",
arguments: {},
inlineType: [1, ],
namedType: $Schema.EntityExternalLink
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EntityExternalLinkEdge}.
*
* Used in `before` and `after` args
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EntityExternalLinkEdge} |
* | **Path** | `EntityExternalLinkEdge.cursor` |
* | **Nullability** | Required |
*/
export interface cursor {
kind: "OutputField",
name: "cursor",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}
