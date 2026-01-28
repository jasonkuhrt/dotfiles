import type * as $Members from './members.js'

export * as FeedSummarySchedule from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* Cadence to generate feed summary
*
* **Members:**
* - `daily`
* - `weekly`
* - `never`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 3 |
*/
export interface FeedSummarySchedule {
kind: "Enum",
name: "FeedSummarySchedule",
members: $Members.daily
| $Members.weekly
| $Members.never
}