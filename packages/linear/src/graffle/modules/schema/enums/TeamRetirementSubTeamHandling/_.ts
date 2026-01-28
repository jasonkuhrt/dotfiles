import type * as $Members from './members.js'

export * as TeamRetirementSubTeamHandling from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* [Internal] How to handle sub-teams when retiring a parent team.
*
* **Members:**
* - `unnest`
* - `retire`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 2 |
*/
export interface TeamRetirementSubTeamHandling {
kind: "Enum",
name: "TeamRetirementSubTeamHandling",
members: $Members.unnest
| $Members.retire
}