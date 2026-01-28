import type * as $Members from './members.js'

export * as DateResolutionType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* By which resolution is a date defined.
*
* **Members:**
* - `month`
* - `quarter`
* - `halfYear`
* - `year`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 4 |
*/
export interface DateResolutionType {
kind: "Enum",
name: "DateResolutionType",
members: $Members.month
| $Members.quarter
| $Members.halfYear
| $Members.year
}