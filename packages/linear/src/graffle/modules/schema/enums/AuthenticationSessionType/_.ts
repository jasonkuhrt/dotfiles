import type * as $Members from './members.js'

export * as AuthenticationSessionType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* **Members:**
* - `web`
* - `desktop`
* - `ios`
* - `android`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 4 |
*/
export interface AuthenticationSessionType {
kind: "Enum",
name: "AuthenticationSessionType",
members: $Members.web
| $Members.desktop
| $Members.ios
| $Members.android
}