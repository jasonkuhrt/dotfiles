import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserSettingsUpdateInput}.
*
* The user's settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.UserSettingsUpdateInput} |
* | **Path** | `UserSettingsUpdateInput.settings` |
* | **Nullability** | Optional |
*/
export interface settings {
kind: "InputField",
name: "settings",
inlineType: [0, ],
namedType: $Schema.JSONObject,
type: $Schema.JSONObject['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserSettingsUpdateInput}.
*
* The types of emails the user has unsubscribed from.
*
* @deprecated Use individual subscription fields instead. This field is now ignored.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UserSettingsUpdateInput} |
* | **Path** | `UserSettingsUpdateInput.unsubscribedFrom` |
* | **⚠ Deprecated** | Use individual subscription fields instead. This field is now ignored. |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface unsubscribedFrom {
kind: "InputField",
name: "unsubscribedFrom",
inlineType: [0, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserSettingsUpdateInput}.
*
* Whether this user is subscribed to changelog email or not.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UserSettingsUpdateInput} |
* | **Path** | `UserSettingsUpdateInput.subscribedToChangelog` |
* | **Nullability** | Optional |
*/
export interface subscribedToChangelog {
kind: "InputField",
name: "subscribedToChangelog",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserSettingsUpdateInput}.
*
* Whether this user is subscribed to DPA emails or not.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UserSettingsUpdateInput} |
* | **Path** | `UserSettingsUpdateInput.subscribedToDPA` |
* | **Nullability** | Optional |
*/
export interface subscribedToDPA {
kind: "InputField",
name: "subscribedToDPA",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserSettingsUpdateInput}.
*
* Whether this user is subscribed to invite accepted emails or not.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UserSettingsUpdateInput} |
* | **Path** | `UserSettingsUpdateInput.subscribedToInviteAccepted` |
* | **Nullability** | Optional |
*/
export interface subscribedToInviteAccepted {
kind: "InputField",
name: "subscribedToInviteAccepted",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserSettingsUpdateInput}.
*
* Whether this user is subscribed to privacy and legal update emails or not.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UserSettingsUpdateInput} |
* | **Path** | `UserSettingsUpdateInput.subscribedToPrivacyLegalUpdates` |
* | **Nullability** | Optional |
*/
export interface subscribedToPrivacyLegalUpdates {
kind: "InputField",
name: "subscribedToPrivacyLegalUpdates",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserSettingsUpdateInput}.
*
* Whether this user is subscribed to general marketing communications or not.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UserSettingsUpdateInput} |
* | **Path** | `UserSettingsUpdateInput.subscribedToGeneralMarketingCommunications` |
* | **Nullability** | Optional |
*/
export interface subscribedToGeneralMarketingCommunications {
kind: "InputField",
name: "subscribedToGeneralMarketingCommunications",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserSettingsUpdateInput}.
*
* The user's notification category preferences.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationCategoryPreferencesInput} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.UserSettingsUpdateInput} |
* | **Path** | `UserSettingsUpdateInput.notificationCategoryPreferences` |
* | **Nullability** | Optional |
*/
export interface notificationCategoryPreferences {
kind: "InputField",
name: "notificationCategoryPreferences",
inlineType: [0, ],
namedType: $Schema.NotificationCategoryPreferencesInput,
type: $Schema.NotificationCategoryPreferencesInput['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserSettingsUpdateInput}.
*
* The user's notification channel preferences.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PartialNotificationChannelPreferencesInput} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.UserSettingsUpdateInput} |
* | **Path** | `UserSettingsUpdateInput.notificationChannelPreferences` |
* | **Nullability** | Optional |
*/
export interface notificationChannelPreferences {
kind: "InputField",
name: "notificationChannelPreferences",
inlineType: [0, ],
namedType: $Schema.PartialNotificationChannelPreferencesInput,
type: $Schema.PartialNotificationChannelPreferencesInput['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserSettingsUpdateInput}.
*
* The user's notification delivery preferences.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationDeliveryPreferencesInput} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.UserSettingsUpdateInput} |
* | **Path** | `UserSettingsUpdateInput.notificationDeliveryPreferences` |
* | **Nullability** | Optional |
*/
export interface notificationDeliveryPreferences {
kind: "InputField",
name: "notificationDeliveryPreferences",
inlineType: [0, ],
namedType: $Schema.NotificationDeliveryPreferencesInput,
type: $Schema.NotificationDeliveryPreferencesInput['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserSettingsUpdateInput}.
*
* [Internal] The user's usage warning history.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.UserSettingsUpdateInput} |
* | **Path** | `UserSettingsUpdateInput.usageWarningHistory` |
* | **Nullability** | Optional |
*/
export interface usageWarningHistory {
kind: "InputField",
name: "usageWarningHistory",
inlineType: [0, ],
namedType: $Schema.JSONObject,
type: $Schema.JSONObject['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserSettingsUpdateInput}.
*
* [Internal] How often to generate a feed summary.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FeedSummarySchedule} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.UserSettingsUpdateInput} |
* | **Path** | `UserSettingsUpdateInput.feedSummarySchedule` |
* | **Nullability** | Optional |
*/
export interface feedSummarySchedule {
kind: "InputField",
name: "feedSummarySchedule",
inlineType: [0, ],
namedType: $Schema.FeedSummarySchedule,
type: $Schema.FeedSummarySchedule['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserSettingsUpdateInput}.
*
* [Internal] The user's last seen time for the pulse feed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.UserSettingsUpdateInput} |
* | **Path** | `UserSettingsUpdateInput.feedLastSeenTime` |
* | **Nullability** | Optional |
*/
export interface feedLastSeenTime {
kind: "InputField",
name: "feedLastSeenTime",
inlineType: [0, ],
namedType: $Schema.DateTime,
type: $Schema.DateTime['codec']['_typeDecoded'] | null | undefined
}