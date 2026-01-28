import type * as $Members from './members.js'

export * as PullRequestReviewTool from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* **Members:**
* - `source`
* - `graphite`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 2 |
*/
export interface PullRequestReviewTool {
kind: "Enum",
name: "PullRequestReviewTool",
members: $Members.source
| $Members.graphite
}