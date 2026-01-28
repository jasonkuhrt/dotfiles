import type * as $Members from './members.js'

export * as ProjectTab from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* Different tabs available inside a project.
*
* **Members:**
* - `customers`
* - `documents`
* - `issues`
* - `updates`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 4 |
*/
export interface ProjectTab {
kind: "Enum",
name: "ProjectTab",
members: $Members.customers
| $Members.documents
| $Members.issues
| $Members.updates
}