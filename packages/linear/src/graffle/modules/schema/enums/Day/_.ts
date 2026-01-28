import type * as $Members from './members.js'

export * as Day from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The day of the week.
*
* **Members:**
* - `Sunday`
* - `Monday`
* - `Tuesday`
* - `Wednesday`
* - `Thursday`
* - `Friday`
* - `Saturday`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 7 |
*/
export interface Day {
kind: "Enum",
name: "Day",
members: $Members.Sunday
| $Members.Monday
| $Members.Tuesday
| $Members.Wednesday
| $Members.Thursday
| $Members.Friday
| $Members.Saturday
}