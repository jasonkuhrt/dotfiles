import type * as $Members from './members.js'

export * as PostType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* Type of Post
*
* **Members:**
* - `summary`
* - `update`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 2 |
*/
export interface PostType {
kind: "Enum",
name: "PostType",
members: $Members.summary
| $Members.update
}