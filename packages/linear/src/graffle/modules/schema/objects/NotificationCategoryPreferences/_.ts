import type * as $Fields from './fields.js'

export * as NotificationCategoryPreferences from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A user's notification category preferences.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 15 |
*/
export interface NotificationCategoryPreferences {
kind: "Object",
name: "NotificationCategoryPreferences",
fields: {
__typename: $Fields.__typename,
assignments: $Fields.assignments,
statusChanges: $Fields.statusChanges,
commentsAndReplies: $Fields.commentsAndReplies,
mentions: $Fields.mentions,
reactions: $Fields.reactions,
subscriptions: $Fields.subscriptions,
documentChanges: $Fields.documentChanges,
postsAndUpdates: $Fields.postsAndUpdates,
reminders: $Fields.reminders,
reviews: $Fields.reviews,
appsAndIntegrations: $Fields.appsAndIntegrations,
system: $Fields.system,
triage: $Fields.triage,
customers: $Fields.customers,
feed: $Fields.feed
}
}