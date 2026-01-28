import type * as $Fields from './fields.js'

export * as AttachmentEdge from './fields.js'

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
export interface AttachmentEdge {
kind: "Object",
name: "AttachmentEdge",
fields: {
__typename: $Fields.__typename,
node: $Fields.node,
cursor: $Fields.cursor
}
}