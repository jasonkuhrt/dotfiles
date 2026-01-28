import type * as $Members from './members.js'

export * as UserFlagUpdateOperation from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* Operations that can be applied to UserFlagType.
*
* **Members:**
* - `incr`
* - `decr`
* - `clear`
* - `lock`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 4 |
*/
export interface UserFlagUpdateOperation {
kind: "Enum",
name: "UserFlagUpdateOperation",
members: $Members.incr
| $Members.decr
| $Members.clear
| $Members.lock
}