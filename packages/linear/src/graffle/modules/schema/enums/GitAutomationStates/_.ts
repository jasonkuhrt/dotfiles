import type * as $Members from './members.js'

export * as GitAutomationStates from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The various states of a pull/merge request.
*
* **Members:**
* - `draft`
* - `start`
* - `review`
* - `mergeable`
* - `merge`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 5 |
*/
export interface GitAutomationStates {
kind: "Enum",
name: "GitAutomationStates",
members: $Members.draft
| $Members.start
| $Members.review
| $Members.mergeable
| $Members.merge
}