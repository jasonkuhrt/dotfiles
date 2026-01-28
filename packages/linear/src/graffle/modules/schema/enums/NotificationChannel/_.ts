import type * as $Members from './members.js'

export * as NotificationChannel from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The delivery channels a user can receive notifications in.
*
* **Members:**
* - `desktop`
* - `mobile`
* - `email`
* - `slack`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 4 |
*/
export interface NotificationChannel {
kind: "Enum",
name: "NotificationChannel",
members: $Members.desktop
| $Members.mobile
| $Members.email
| $Members.slack
}