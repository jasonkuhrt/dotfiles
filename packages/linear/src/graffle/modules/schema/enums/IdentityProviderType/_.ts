import type * as $Members from './members.js'

export * as IdentityProviderType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The type of identity provider.
*
* **Members:**
* - `general`
* - `webForms`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 2 |
*/
export interface IdentityProviderType {
kind: "Enum",
name: "IdentityProviderType",
members: $Members.general
| $Members.webForms
}