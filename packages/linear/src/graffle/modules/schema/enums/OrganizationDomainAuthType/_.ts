import type * as $Members from './members.js'

export * as OrganizationDomainAuthType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* What type of auth is the domain used for.
*
* **Members:**
* - `saml`
* - `general`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 2 |
*/
export interface OrganizationDomainAuthType {
kind: "Enum",
name: "OrganizationDomainAuthType",
members: $Members.saml
| $Members.general
}