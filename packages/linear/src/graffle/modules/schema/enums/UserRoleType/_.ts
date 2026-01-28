import type * as $Members from './members.js'

export * as UserRoleType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The different permission roles available to users on an organization.
*
* **Members:**
* - `owner`
* - `admin`
* - `guest`
* - `user`
* - `app`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 5 |
*/
export interface UserRoleType {
kind: "Enum",
name: "UserRoleType",
members: $Members.owner
| $Members.admin
| $Members.guest
| $Members.user
| $Members.app
}