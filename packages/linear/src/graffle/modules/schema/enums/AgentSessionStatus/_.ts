import type * as $Members from './members.js'

export * as AgentSessionStatus from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The status of an agent session.
*
* **Members:**
* - `pending`
* - `active`
* - `complete`
* - `awaitingInput`
* - `error`
* - `stale`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 6 |
*/
export interface AgentSessionStatus {
kind: "Enum",
name: "AgentSessionStatus",
members: $Members.pending
| $Members.active
| $Members.complete
| $Members.awaitingInput
| $Members.error
| $Members.stale
}