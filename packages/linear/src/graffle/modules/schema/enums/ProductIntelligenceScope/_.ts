import type * as $Members from './members.js'

export * as ProductIntelligenceScope from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* [Internal] The scope of product intelligence suggestion data for a team.
*
* **Members:**
* - `workspace`
* - `teamHierarchy`
* - `team`
* - `none`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 4 |
*/
export interface ProductIntelligenceScope {
kind: "Enum",
name: "ProductIntelligenceScope",
members: $Members.workspace
| $Members.teamHierarchy
| $Members.team
| $Members.none
}