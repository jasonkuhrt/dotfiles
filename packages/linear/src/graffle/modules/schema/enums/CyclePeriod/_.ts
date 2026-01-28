import type * as $Members from './members.js'

export * as CyclePeriod from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* **Members:**
* - `before`
* - `during`
* - `after`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 3 |
*/
export interface CyclePeriod {
kind: "Enum",
name: "CyclePeriod",
members: $Members.before
| $Members.during
| $Members.after
}