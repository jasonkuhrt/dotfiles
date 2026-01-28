import type * as $Fields from './fields.js'

export * as AgentActivityThoughtContent from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Content for a thought activity.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 2 |
*/
export interface AgentActivityThoughtContent {
kind: "Object",
name: "AgentActivityThoughtContent",
fields: {
__typename: $Fields.__typename,
type: $Fields.type,
body: $Fields.body
}
}