import type * as $Members from './members.js'

export * as OAuthClientApprovalStatus from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The different requests statuses possible for an OAuth client approval request.
*
* **Members:**
* - `requested`
* - `approved`
* - `denied`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 3 |
*/
export interface OAuthClientApprovalStatus {
kind: "Enum",
name: "OAuthClientApprovalStatus",
members: $Members.requested
| $Members.approved
| $Members.denied
}