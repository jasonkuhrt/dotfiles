import type * as $Fields from './fields.js'

export * as CommentEdge from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 2 |
*/
export interface CommentEdge {
kind: "Object",
name: "CommentEdge",
fields: {
__typename: $Fields.__typename,
node: $Fields.node,
cursor: $Fields.cursor
}
}