import type * as $Members from './members.js'

export * as GithubOrgType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* **Members:**
* - `user`
* - `organization`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 2 |
*/
export interface GithubOrgType {
kind: "Enum",
name: "GithubOrgType",
members: $Members.user
| $Members.organization
}