import type * as $Members from './members.js'

export * as PaginationOrderBy from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* By which field should the pagination order by
*
* **Members:**
* - `createdAt`
* - `updatedAt`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 2 |
*/
export interface PaginationOrderBy {
kind: "Enum",
name: "PaginationOrderBy",
members: $Members.createdAt
| $Members.updatedAt
}