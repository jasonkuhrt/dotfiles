import type * as $Fields from './fields.js'

export * as IntegrationTemplateEdge from './fields.js'

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
export interface IntegrationTemplateEdge {
kind: "Object",
name: "IntegrationTemplateEdge",
fields: {
__typename: $Fields.__typename,
node: $Fields.node,
cursor: $Fields.cursor
}
}