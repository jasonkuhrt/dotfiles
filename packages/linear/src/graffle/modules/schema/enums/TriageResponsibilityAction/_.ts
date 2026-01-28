import type * as $Members from './members.js'

export * as TriageResponsibilityAction from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* Which action should be taken after an issue is added to triage.
*
* **Members:**
* - `assign`
* - `notify`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 2 |
*/
export interface TriageResponsibilityAction {
kind: "Enum",
name: "TriageResponsibilityAction",
members: $Members.assign
| $Members.notify
}