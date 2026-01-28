import type * as $Members from './members.js'

export * as PaginationNulls from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* How to treat NULL values, whether they should appear first or last
*
* **Members:**
* - `first`
* - `last`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 2 |
*/
export interface PaginationNulls {
kind: "Enum",
name: "PaginationNulls",
members: $Members.first
| $Members.last
}