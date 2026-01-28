import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"NotificationDeliveryPreferencesChannel"`
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
value: "NotificationDeliveryPreferencesChannel"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesChannel}.
*
* [DEPRECATED] Whether notifications are enabled for this channel. Use notificationChannelPreferences instead.
*
* @deprecated This field has been replaced by notificationChannelPreferences
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesChannel} |
* | **Path** | `NotificationDeliveryPreferencesChannel.notificationsDisabled` |
* | **⚠ Deprecated** | This field has been replaced by notificationChannelPreferences |
* | **Nullability** | Optional |
*/
export interface notificationsDisabled {
kind: "OutputField",
name: "notificationsDisabled",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesChannel}.
*
* The schedule for notifications on this channel.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationDeliveryPreferencesSchedule} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesChannel} |
* | **Path** | `NotificationDeliveryPreferencesChannel.schedule` |
* | **Nullability** | Optional |
*/
export interface schedule {
kind: "OutputField",
name: "schedule",
arguments: {},
inlineType: [0, ],
namedType: $Schema.NotificationDeliveryPreferencesSchedule
}
