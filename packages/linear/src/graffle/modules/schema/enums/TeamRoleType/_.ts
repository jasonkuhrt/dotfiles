import type * as $Members from './members.js'

export * as TeamRoleType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* All possible roles within a team in terms of access to team settings and operations.
*
* **Members:**
* - `owner`
* - `member`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 2 |
*/
export interface TeamRoleType {
kind: "Enum",
name: "TeamRoleType",
members: $Members.owner
| $Members.member
}