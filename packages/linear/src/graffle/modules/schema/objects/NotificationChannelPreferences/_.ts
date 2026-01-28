import type * as $Fields from './fields.js'

export * as NotificationChannelPreferences from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A user's notification channel preferences, indicating if a channel is enabled or not
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 4 |
*/
export interface NotificationChannelPreferences {
kind: "Object",
name: "NotificationChannelPreferences",
fields: {
__typename: $Fields.__typename,
mobile: $Fields.mobile,
desktop: $Fields.desktop,
email: $Fields.email,
slack: $Fields.slack
}
}