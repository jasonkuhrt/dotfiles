import type * as $Members from './members.js'

export * as AgentActivitySignal from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* A modifier that provides additional instructions on how the activity should be interpreted.
*
* **Members:**
* - `stop`
* - `continue`
* - `auth`
* - `select`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 4 |
*/
export interface AgentActivitySignal {
kind: "Enum",
name: "AgentActivitySignal",
members: $Members.stop
| $Members.continue
| $Members.auth
| $Members.select
}