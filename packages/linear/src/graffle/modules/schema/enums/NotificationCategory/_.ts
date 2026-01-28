import type * as $Members from './members.js'

export * as NotificationCategory from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The categories of notifications a user can subscribe to.
*
* **Members:**
* - `assignments`
* - `statusChanges`
* - `commentsAndReplies`
* - `mentions`
* - `reactions`
* - `subscriptions`
* - `documentChanges`
* - `postsAndUpdates`
* - `reminders`
* - `reviews`
* - `appsAndIntegrations`
* - `triage`
* - `customers`
* - `feed`
* - `system`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 15 |
*/
export interface NotificationCategory {
kind: "Enum",
name: "NotificationCategory",
members: $Members.assignments
| $Members.statusChanges
| $Members.commentsAndReplies
| $Members.mentions
| $Members.reactions
| $Members.subscriptions
| $Members.documentChanges
| $Members.postsAndUpdates
| $Members.reminders
| $Members.reviews
| $Members.appsAndIntegrations
| $Members.triage
| $Members.customers
| $Members.feed
| $Members.system
}