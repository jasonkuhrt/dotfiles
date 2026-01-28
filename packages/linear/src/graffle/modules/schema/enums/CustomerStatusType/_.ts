import type * as $Members from './members.js'

export * as CustomerStatusType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* [DEPRECATED] A type of customer status.
*
* **Members:**
* - `active`
* - `inactive`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 2 |
*/
export interface CustomerStatusType {
kind: "Enum",
name: "CustomerStatusType",
members: $Members.active
| $Members.inactive
}