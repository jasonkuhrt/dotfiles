import type * as $Members from './members.js'

export * as PushSubscriptionType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The different push subscription types.
*
* **Members:**
* - `web`
* - `apple`
* - `appleDevelopment`
* - `firebase`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 4 |
*/
export interface PushSubscriptionType {
kind: "Enum",
name: "PushSubscriptionType",
members: $Members.web
| $Members.apple
| $Members.appleDevelopment
| $Members.firebase
}