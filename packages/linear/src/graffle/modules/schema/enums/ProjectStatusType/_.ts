import type * as $Members from './members.js'

export * as ProjectStatusType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* A type of project status.
*
* **Members:**
* - `backlog`
* - `planned`
* - `started`
* - `paused`
* - `completed`
* - `canceled`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 6 |
*/
export interface ProjectStatusType {
kind: "Enum",
name: "ProjectStatusType",
members: $Members.backlog
| $Members.planned
| $Members.started
| $Members.paused
| $Members.completed
| $Members.canceled
}