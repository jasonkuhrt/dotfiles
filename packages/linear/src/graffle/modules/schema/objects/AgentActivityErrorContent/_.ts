import type * as $Fields from './fields.js'

export * as AgentActivityErrorContent from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Content for an error activity.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 2 |
*/
export interface AgentActivityErrorContent {
kind: "Object",
name: "AgentActivityErrorContent",
fields: {
__typename: $Fields.__typename,
type: $Fields.type,
body: $Fields.body
}
}