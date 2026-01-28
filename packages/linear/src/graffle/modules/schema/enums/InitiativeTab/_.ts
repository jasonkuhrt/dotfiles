import type * as $Members from './members.js'

export * as InitiativeTab from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* Different tabs available inside an initiative.
*
* **Members:**
* - `overview`
* - `projects`
* - `updates`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 3 |
*/
export interface InitiativeTab {
kind: "Enum",
name: "InitiativeTab",
members: $Members.overview
| $Members.projects
| $Members.updates
}