import type * as $Members from './members.js'

export * as InitiativeStatus from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* **Members:**
* - `Planned`
* - `Active`
* - `Completed`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 3 |
*/
export interface InitiativeStatus {
kind: "Enum",
name: "InitiativeStatus",
members: $Members.Planned
| $Members.Active
| $Members.Completed
}