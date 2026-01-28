import type * as $Members from './members.js'

export * as CustomerVisibilityMode from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* Mode that controls who can see and set Customers in Slack Asks.
*
* **Members:**
* - `LinearOnly`
* - `SlackMembers`
* - `SlackMembersAndGuests`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 3 |
*/
export interface CustomerVisibilityMode {
kind: "Enum",
name: "CustomerVisibilityMode",
members: $Members.LinearOnly
| $Members.SlackMembers
| $Members.SlackMembersAndGuests
}