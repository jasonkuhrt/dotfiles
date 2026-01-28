import type * as $Members from './members.js'

export * as ViewPreferencesType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The type of view preferences (either user or organization level preferences).
*
* **Members:**
* - `organization`
* - `user`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 2 |
*/
export interface ViewPreferencesType {
kind: "Enum",
name: "ViewPreferencesType",
members: $Members.organization
| $Members.user
}