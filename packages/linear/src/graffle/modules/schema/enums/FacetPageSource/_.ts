import type * as $Members from './members.js'

export * as FacetPageSource from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* **Members:**
* - `projects`
* - `teamIssues`
* - `feed`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 3 |
*/
export interface FacetPageSource {
kind: "Enum",
name: "FacetPageSource",
members: $Members.projects
| $Members.teamIssues
| $Members.feed
}