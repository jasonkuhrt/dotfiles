import type * as $Members from './members.js'

export * as ExternalSyncService from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The service that syncs an external entity to Linear.
*
* **Members:**
* - `jira`
* - `github`
* - `slack`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 3 |
*/
export interface ExternalSyncService {
kind: "Enum",
name: "ExternalSyncService",
members: $Members.jira
| $Members.github
| $Members.slack
}