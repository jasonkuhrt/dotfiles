import type * as $Fields from './fields.js'

export * as CustomerConnection from './fields.js'

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
export interface CustomerConnection {
kind: "Object",
name: "CustomerConnection",
fields: {
__typename: $Fields.__typename,
edges: $Fields.edges,
nodes: $Fields.nodes,
pageInfo: $Fields.pageInfo
}
}