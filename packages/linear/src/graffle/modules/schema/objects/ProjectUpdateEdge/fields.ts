import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"ProjectUpdateEdge"`
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
value: "ProjectUpdateEdge"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ProjectUpdateEdge}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdate}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateEdge} |
* | **Path** | `ProjectUpdateEdge.node` |
* | **Nullability** | Required |
*/
export interface node {
kind: "OutputField",
name: "node",
arguments: {},
inlineType: [1, ],
namedType: $Schema.ProjectUpdate
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ProjectUpdateEdge}.
*
* Used in `before` and `after` args
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateEdge} |
* | **Path** | `ProjectUpdateEdge.cursor` |
* | **Nullability** | Required |
*/
export interface cursor {
kind: "OutputField",
name: "cursor",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}
