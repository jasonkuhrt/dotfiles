import type * as $Members from './members.js'

export * as ProjectMilestoneStatus from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The status of a project milestone.
*
* **Members:**
* - `unstarted`
* - `next`
* - `overdue`
* - `done`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 4 |
*/
export interface ProjectMilestoneStatus {
kind: "Enum",
name: "ProjectMilestoneStatus",
members: $Members.unstarted
| $Members.next
| $Members.overdue
| $Members.done
}