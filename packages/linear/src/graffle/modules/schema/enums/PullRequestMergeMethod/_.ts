import type * as $Members from './members.js'

export * as PullRequestMergeMethod from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The method used to merge a pull request.
*
* **Members:**
* - `MERGE`
* - `REBASE`
* - `SQUASH`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 3 |
*/
export interface PullRequestMergeMethod {
kind: "Enum",
name: "PullRequestMergeMethod",
members: $Members.MERGE
| $Members.REBASE
| $Members.SQUASH
}