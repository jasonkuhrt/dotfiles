import type * as $Members from './members.js'

export * as PaginationSortOrder from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* Whether to sort in ascending or descending order
*
* **Members:**
* - `Ascending`
* - `Descending`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 2 |
*/
export interface PaginationSortOrder {
kind: "Enum",
name: "PaginationSortOrder",
members: $Members.Ascending
| $Members.Descending
}