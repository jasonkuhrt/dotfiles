import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.PartialNotificationChannelPreferencesInput}.
*
* Whether notifications are currently enabled for mobile.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PartialNotificationChannelPreferencesInput} |
* | **Path** | `PartialNotificationChannelPreferencesInput.mobile` |
* | **Nullability** | Optional |
*/
export interface mobile {
kind: "InputField",
name: "mobile",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.PartialNotificationChannelPreferencesInput}.
*
* Whether notifications are currently enabled for desktop.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PartialNotificationChannelPreferencesInput} |
* | **Path** | `PartialNotificationChannelPreferencesInput.desktop` |
* | **Nullability** | Optional |
*/
export interface desktop {
kind: "InputField",
name: "desktop",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.PartialNotificationChannelPreferencesInput}.
*
* Whether notifications are currently enabled for email.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PartialNotificationChannelPreferencesInput} |
* | **Path** | `PartialNotificationChannelPreferencesInput.email` |
* | **Nullability** | Optional |
*/
export interface email {
kind: "InputField",
name: "email",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.PartialNotificationChannelPreferencesInput}.
*
* Whether notifications are currently enabled for Slack.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PartialNotificationChannelPreferencesInput} |
* | **Path** | `PartialNotificationChannelPreferencesInput.slack` |
* | **Nullability** | Optional |
*/
export interface slack {
kind: "InputField",
name: "slack",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}