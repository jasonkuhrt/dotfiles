import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"UserSettings"`
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
value: "UserSettings"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettings}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UserSettings} |
* | **Path** | `UserSettings.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "OutputField",
name: "id",
arguments: {},
inlineType: [1, ],
namedType: $Schema.ID
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettings}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.UserSettings} |
* | **Path** | `UserSettings.createdAt` |
* | **Nullability** | Required |
*/
export interface createdAt {
kind: "OutputField",
name: "createdAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettings}.
*
* The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
* been updated after creation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.UserSettings} |
* | **Path** | `UserSettings.updatedAt` |
* | **Nullability** | Required |
*/
export interface updatedAt {
kind: "OutputField",
name: "updatedAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettings}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.UserSettings} |
* | **Path** | `UserSettings.archivedAt` |
* | **Nullability** | Optional |
*/
export interface archivedAt {
kind: "OutputField",
name: "archivedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettings}.
*
* The notification delivery preferences for the user. Note: notificationDisabled field is deprecated in favor of notificationChannelPreferences.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationDeliveryPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.UserSettings} |
* | **Path** | `UserSettings.notificationDeliveryPreferences` |
* | **Nullability** | Required |
*/
export interface notificationDeliveryPreferences {
kind: "OutputField",
name: "notificationDeliveryPreferences",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationDeliveryPreferences
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettings}.
*
* The email types the user has unsubscribed from.
*
* @deprecated Use individual subscription fields instead. This field's value is now outdated.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UserSettings} |
* | **Path** | `UserSettings.unsubscribedFrom` |
* | **⚠ Deprecated** | Use individual subscription fields instead. This field's value is now outdated. |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface unsubscribedFrom {
kind: "OutputField",
name: "unsubscribedFrom",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettings}.
*
* The user associated with these settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.UserSettings} |
* | **Path** | `UserSettings.user` |
* | **Nullability** | Required |
*/
export interface user {
kind: "OutputField",
name: "user",
arguments: {},
inlineType: [1, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettings}.
*
* Hash for the user to be used in calendar URLs.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UserSettings} |
* | **Path** | `UserSettings.calendarHash` |
* | **Nullability** | Optional |
*/
export interface calendarHash {
kind: "OutputField",
name: "calendarHash",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettings}.
*
* Whether this user is subscribed to changelog email or not.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UserSettings} |
* | **Path** | `UserSettings.subscribedToChangelog` |
* | **Nullability** | Required |
*/
export interface subscribedToChangelog {
kind: "OutputField",
name: "subscribedToChangelog",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettings}.
*
* Whether this user is subscribed to DPA emails or not.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UserSettings} |
* | **Path** | `UserSettings.subscribedToDPA` |
* | **Nullability** | Required |
*/
export interface subscribedToDPA {
kind: "OutputField",
name: "subscribedToDPA",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettings}.
*
* Whether this user is subscribed to invite accepted emails or not.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UserSettings} |
* | **Path** | `UserSettings.subscribedToInviteAccepted` |
* | **Nullability** | Required |
*/
export interface subscribedToInviteAccepted {
kind: "OutputField",
name: "subscribedToInviteAccepted",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettings}.
*
* Whether this user is subscribed to privacy and legal update emails or not.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UserSettings} |
* | **Path** | `UserSettings.subscribedToPrivacyLegalUpdates` |
* | **Nullability** | Required |
*/
export interface subscribedToPrivacyLegalUpdates {
kind: "OutputField",
name: "subscribedToPrivacyLegalUpdates",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettings}.
*
* The user's feed summary schedule preference.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FeedSummarySchedule} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.UserSettings} |
* | **Path** | `UserSettings.feedSummarySchedule` |
* | **Nullability** | Optional |
*/
export interface feedSummarySchedule {
kind: "OutputField",
name: "feedSummarySchedule",
arguments: {},
inlineType: [0, ],
namedType: $Schema.FeedSummarySchedule
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettings}.
*
* Whether to show full user names instead of display names.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UserSettings} |
* | **Path** | `UserSettings.showFullUserNames` |
* | **Nullability** | Required |
*/
export interface showFullUserNames {
kind: "OutputField",
name: "showFullUserNames",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettings}.
*
* The user's last seen time for the pulse feed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.UserSettings} |
* | **Path** | `UserSettings.feedLastSeenTime` |
* | **Nullability** | Optional |
*/
export interface feedLastSeenTime {
kind: "OutputField",
name: "feedLastSeenTime",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettings}.
*
* Whether to auto-assign newly created issues to the current user by default.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UserSettings} |
* | **Path** | `UserSettings.autoAssignToSelf` |
* | **Nullability** | Required |
*/
export interface autoAssignToSelf {
kind: "OutputField",
name: "autoAssignToSelf",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettings}.
*
* The user's notification category preferences.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationCategoryPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.UserSettings} |
* | **Path** | `UserSettings.notificationCategoryPreferences` |
* | **Nullability** | Required |
*/
export interface notificationCategoryPreferences {
kind: "OutputField",
name: "notificationCategoryPreferences",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationCategoryPreferences
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettings}.
*
* The user's notification channel preferences.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.UserSettings} |
* | **Path** | `UserSettings.notificationChannelPreferences` |
* | **Nullability** | Required |
*/
export interface notificationChannelPreferences {
kind: "OutputField",
name: "notificationChannelPreferences",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationChannelPreferences
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettings}.
*
* The user's theme for a given mode and device type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserSettingsTheme} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.UserSettings} |
* | **Path** | `UserSettings.theme` |
* | **Nullability** | Optional |
* | **Arguments** | 2 |
*/
export interface theme {
kind: "OutputField",
name: "theme",
arguments: {
/**
* The device type.
*/
deviceType: {
kind: "InputField",
name: "deviceType",
inlineType: [0, ],
namedType: $Schema.UserSettingsThemeDeviceType
},
/**
* The theme color mode.
*/
mode: {
kind: "InputField",
name: "mode",
inlineType: [0, ],
namedType: $Schema.UserSettingsThemeMode
}
},
inlineType: [0, ],
namedType: $Schema.UserSettingsTheme
}
