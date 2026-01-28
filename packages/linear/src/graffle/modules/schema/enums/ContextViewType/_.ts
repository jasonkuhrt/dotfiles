import type * as $Members from './members.js'

export * as ContextViewType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* **Members:**
* - `activeIssues`
* - `activeCycle`
* - `upcomingCycle`
* - `backlog`
* - `triage`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 5 |
*/
export interface ContextViewType {
kind: "Enum",
name: "ContextViewType",
members: $Members.activeIssues
| $Members.activeCycle
| $Members.upcomingCycle
| $Members.backlog
| $Members.triage
}