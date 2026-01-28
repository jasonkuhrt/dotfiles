import type * as $Members from './members.js'

export * as PullRequestStatus from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The status of a pull request.
*
* **Members:**
* - `draft`
* - `open`
* - `inReview`
* - `approved`
* - `merged`
* - `closed`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 6 |
*/
export interface PullRequestStatus {
kind: "Enum",
name: "PullRequestStatus",
members: $Members.draft
| $Members.open
| $Members.inReview
| $Members.approved
| $Members.merged
| $Members.closed
}