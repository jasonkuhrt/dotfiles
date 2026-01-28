import type * as $Members from './members.js'

export * as WorkflowType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* **Members:**
* - `sla`
* - `custom`
* - `viewSubscription`
* - `triage`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 4 |
*/
export interface WorkflowType {
kind: "Enum",
name: "WorkflowType",
members: $Members.sla
| $Members.custom
| $Members.viewSubscription
| $Members.triage
}