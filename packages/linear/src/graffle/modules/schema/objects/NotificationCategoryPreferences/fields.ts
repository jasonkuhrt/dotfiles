import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"NotificationCategoryPreferences"`
*
* {@link https://graphql.org/learn/queries/#meta-fields | GraphQL __typename documentation}
*/
export interface __typename {
kind: "OutputField",
name: "__typename",
arguments: {},
inlineType: [1],
namedType: {
kind: "__typename",
value: "NotificationCategoryPreferences"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationCategoryPreferences}.
*
* The preferences for notifications about assignments.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.assignments` |
* | **Nullability** | Required |
*/
export interface assignments {
kind: "OutputField",
name: "assignments",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationChannelPreferences
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationCategoryPreferences}.
*
* The preferences for notifications about status changes.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.statusChanges` |
* | **Nullability** | Required |
*/
export interface statusChanges {
kind: "OutputField",
name: "statusChanges",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationChannelPreferences
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationCategoryPreferences}.
*
* The preferences for notifications about comments and replies.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.commentsAndReplies` |
* | **Nullability** | Required |
*/
export interface commentsAndReplies {
kind: "OutputField",
name: "commentsAndReplies",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationChannelPreferences
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationCategoryPreferences}.
*
* The preferences for notifications about mentions.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.mentions` |
* | **Nullability** | Required |
*/
export interface mentions {
kind: "OutputField",
name: "mentions",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationChannelPreferences
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationCategoryPreferences}.
*
* The preferences for notifications about reactions.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.reactions` |
* | **Nullability** | Required |
*/
export interface reactions {
kind: "OutputField",
name: "reactions",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationChannelPreferences
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationCategoryPreferences}.
*
* The preferences for notifications about subscriptions.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.subscriptions` |
* | **Nullability** | Required |
*/
export interface subscriptions {
kind: "OutputField",
name: "subscriptions",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationChannelPreferences
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationCategoryPreferences}.
*
* The preferences for notifications about document changes.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.documentChanges` |
* | **Nullability** | Required |
*/
export interface documentChanges {
kind: "OutputField",
name: "documentChanges",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationChannelPreferences
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationCategoryPreferences}.
*
* The preferences for notifications about posts and updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.postsAndUpdates` |
* | **Nullability** | Required |
*/
export interface postsAndUpdates {
kind: "OutputField",
name: "postsAndUpdates",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationChannelPreferences
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationCategoryPreferences}.
*
* The preferences for notifications about reminders.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.reminders` |
* | **Nullability** | Required |
*/
export interface reminders {
kind: "OutputField",
name: "reminders",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationChannelPreferences
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationCategoryPreferences}.
*
* The preferences for notifications about reviews.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.reviews` |
* | **Nullability** | Required |
*/
export interface reviews {
kind: "OutputField",
name: "reviews",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationChannelPreferences
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationCategoryPreferences}.
*
* The preferences for notifications about apps and integrations.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.appsAndIntegrations` |
* | **Nullability** | Required |
*/
export interface appsAndIntegrations {
kind: "OutputField",
name: "appsAndIntegrations",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationChannelPreferences
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationCategoryPreferences}.
*
* The preferences for system notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.system` |
* | **Nullability** | Required |
*/
export interface system {
kind: "OutputField",
name: "system",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationChannelPreferences
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationCategoryPreferences}.
*
* The preferences for triage notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.triage` |
* | **Nullability** | Required |
*/
export interface triage {
kind: "OutputField",
name: "triage",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationChannelPreferences
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationCategoryPreferences}.
*
* The preferences for customer notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.customers` |
* | **Nullability** | Required |
*/
export interface customers {
kind: "OutputField",
name: "customers",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationChannelPreferences
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationCategoryPreferences}.
*
* The preferences for feed summary notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.feed` |
* | **Nullability** | Required |
*/
export interface feed {
kind: "OutputField",
name: "feed",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationChannelPreferences
}
