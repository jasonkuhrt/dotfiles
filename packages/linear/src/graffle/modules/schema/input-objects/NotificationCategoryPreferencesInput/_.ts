import type * as $Fields from './fields.js'

export * as NotificationCategoryPreferencesInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 14 |
* | **All Fields Nullable** | Yes |
*/
export interface NotificationCategoryPreferencesInput {
kind: "InputObject",
name: "NotificationCategoryPreferencesInput",
isAllFieldsNullable: true,
fields: {
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
triage: $Fields.triage,
customers: $Fields.customers,
feed: $Fields.feed
},
type: {
assignments?: $Fields.assignments['type'],
statusChanges?: $Fields.statusChanges['type'],
commentsAndReplies?: $Fields.commentsAndReplies['type'],
mentions?: $Fields.mentions['type'],
reactions?: $Fields.reactions['type'],
subscriptions?: $Fields.subscriptions['type'],
documentChanges?: $Fields.documentChanges['type'],
postsAndUpdates?: $Fields.postsAndUpdates['type'],
reminders?: $Fields.reminders['type'],
reviews?: $Fields.reviews['type'],
appsAndIntegrations?: $Fields.appsAndIntegrations['type'],
triage?: $Fields.triage['type'],
customers?: $Fields.customers['type'],
feed?: $Fields.feed['type']
}
}