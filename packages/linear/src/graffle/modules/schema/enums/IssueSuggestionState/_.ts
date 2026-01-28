import type * as $Members from './members.js'

export * as IssueSuggestionState from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* **Members:**
* - `active`
* - `stale`
* - `accepted`
* - `dismissed`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 4 |
*/
export interface IssueSuggestionState {
kind: "Enum",
name: "IssueSuggestionState",
members: $Members.active
| $Members.stale
| $Members.accepted
| $Members.dismissed
}