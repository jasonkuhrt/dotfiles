import type * as $Members from './members.js'

export * as ReleaseStageType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* A type of release stage.
*
* **Members:**
* - `planned`
* - `started`
* - `completed`
* - `canceled`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 4 |
*/
export interface ReleaseStageType {
kind: "Enum",
name: "ReleaseStageType",
members: $Members.planned
| $Members.started
| $Members.completed
| $Members.canceled
}