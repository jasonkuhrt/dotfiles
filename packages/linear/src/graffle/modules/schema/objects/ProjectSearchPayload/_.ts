import type * as $Fields from './fields.js'

export * as ProjectSearchPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 5 |
*/
export interface ProjectSearchPayload {
kind: "Object",
name: "ProjectSearchPayload",
fields: {
__typename: $Fields.__typename,
edges: $Fields.edges,
nodes: $Fields.nodes,
pageInfo: $Fields.pageInfo,
archivePayload: $Fields.archivePayload,
totalCount: $Fields.totalCount
}
}