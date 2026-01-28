import type * as $Members from './members.js'

export * as FrequencyResolutionType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* By which resolution is frequency defined.
*
* **Members:**
* - `daily`
* - `weekly`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 2 |
*/
export interface FrequencyResolutionType {
kind: "Enum",
name: "FrequencyResolutionType",
members: $Members.daily
| $Members.weekly
}