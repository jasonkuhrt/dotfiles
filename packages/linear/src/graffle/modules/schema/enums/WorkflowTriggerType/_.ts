import type * as $Members from './members.js'

export * as WorkflowTriggerType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* **Members:**
* - `issue`
* - `project`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 2 |
*/
export interface WorkflowTriggerType {
kind: "Enum",
name: "WorkflowTriggerType",
members: $Members.issue
| $Members.project
}