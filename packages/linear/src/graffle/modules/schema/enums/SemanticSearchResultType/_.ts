import type * as $Members from './members.js'

export * as SemanticSearchResultType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The type of the semantic search result.
*
* **Members:**
* - `issue`
* - `project`
* - `initiative`
* - `document`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 4 |
*/
export interface SemanticSearchResultType {
kind: "Enum",
name: "SemanticSearchResultType",
members: $Members.issue
| $Members.project
| $Members.initiative
| $Members.document
}