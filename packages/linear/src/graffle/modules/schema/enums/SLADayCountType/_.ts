import type * as $Members from './members.js'

export * as SLADayCountType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* **Members:**
* - `all`
* - `onlyBusinessDays`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 2 |
*/
export interface SLADayCountType {
kind: "Enum",
name: "SLADayCountType",
members: $Members.all
| $Members.onlyBusinessDays
}