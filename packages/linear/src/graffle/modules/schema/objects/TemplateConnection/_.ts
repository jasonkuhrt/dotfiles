import type * as $Fields from './fields.js'

export * as TemplateConnection from './fields.js'

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
export interface TemplateConnection {
kind: "Object",
name: "TemplateConnection",
fields: {
__typename: $Fields.__typename,
edges: $Fields.edges,
nodes: $Fields.nodes,
pageInfo: $Fields.pageInfo
}
}