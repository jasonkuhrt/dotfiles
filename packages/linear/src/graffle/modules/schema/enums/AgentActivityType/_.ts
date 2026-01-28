import type * as $Members from './members.js'

export * as AgentActivityType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The type of an agent activity.
*
* **Members:**
* - `thought`
* - `action`
* - `response`
* - `elicitation`
* - `error`
* - `prompt`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 6 |
*/
export interface AgentActivityType {
kind: "Enum",
name: "AgentActivityType",
members: $Members.thought
| $Members.action
| $Members.response
| $Members.elicitation
| $Members.error
| $Members.prompt
}