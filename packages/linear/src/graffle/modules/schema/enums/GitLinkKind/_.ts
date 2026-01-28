import type * as $Members from './members.js'

export * as GitLinkKind from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* [Internal] The kind of link between an issue and a pull request.
*
* **Members:**
* - `closes`
* - `contributes`
* - `links`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 3 |
*/
export interface GitLinkKind {
kind: "Enum",
name: "GitLinkKind",
members: $Members.closes
| $Members.contributes
| $Members.links
}