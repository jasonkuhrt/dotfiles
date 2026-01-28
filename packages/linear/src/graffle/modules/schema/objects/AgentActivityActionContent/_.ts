import type * as $Fields from './fields.js'

export * as AgentActivityActionContent from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Content for an action activity (tool call or action).
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 4 |
*/
export interface AgentActivityActionContent {
kind: "Object",
name: "AgentActivityActionContent",
fields: {
__typename: $Fields.__typename,
type: $Fields.type,
action: $Fields.action,
parameter: $Fields.parameter,
result: $Fields.result
}
}