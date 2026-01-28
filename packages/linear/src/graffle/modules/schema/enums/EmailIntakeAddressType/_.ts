import type * as $Members from './members.js'

export * as EmailIntakeAddressType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The type of the email address.
*
* **Members:**
* - `team`
* - `template`
* - `asks`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 3 |
*/
export interface EmailIntakeAddressType {
kind: "Enum",
name: "EmailIntakeAddressType",
members: $Members.team
| $Members.template
| $Members.asks
}