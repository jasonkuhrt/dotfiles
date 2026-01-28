import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"NotificationChannelPreferences"`
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
value: "NotificationChannelPreferences"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationChannelPreferences}.
*
* Whether notifications are currently enabled for mobile.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationChannelPreferences} |
* | **Path** | `NotificationChannelPreferences.mobile` |
* | **Nullability** | Required |
*/
export interface mobile {
kind: "OutputField",
name: "mobile",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationChannelPreferences}.
*
* Whether notifications are currently enabled for desktop.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationChannelPreferences} |
* | **Path** | `NotificationChannelPreferences.desktop` |
* | **Nullability** | Required |
*/
export interface desktop {
kind: "OutputField",
name: "desktop",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationChannelPreferences}.
*
* Whether notifications are currently enabled for email.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationChannelPreferences} |
* | **Path** | `NotificationChannelPreferences.email` |
* | **Nullability** | Required |
*/
export interface email {
kind: "OutputField",
name: "email",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationChannelPreferences}.
*
* Whether notifications are currently enabled for Slack.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationChannelPreferences} |
* | **Path** | `NotificationChannelPreferences.slack` |
* | **Nullability** | Required |
*/
export interface slack {
kind: "OutputField",
name: "slack",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}
