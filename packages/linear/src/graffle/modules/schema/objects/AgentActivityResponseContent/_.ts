import type * as $Fields from './fields.js'

export * as AgentActivityResponseContent from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Content for a response activity.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 2 |
*/
export interface AgentActivityResponseContent {
kind: "Object",
name: "AgentActivityResponseContent",
fields: {
__typename: $Fields.__typename,
type: $Fields.type,
body: $Fields.body
}
}