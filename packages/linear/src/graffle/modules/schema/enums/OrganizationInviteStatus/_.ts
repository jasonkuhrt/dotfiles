import type * as $Members from './members.js'

export * as OrganizationInviteStatus from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The different statuses possible for an organization invite.
*
* **Members:**
* - `pending`
* - `accepted`
* - `expired`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 3 |
*/
export interface OrganizationInviteStatus {
kind: "Enum",
name: "OrganizationInviteStatus",
members: $Members.pending
| $Members.accepted
| $Members.expired
}