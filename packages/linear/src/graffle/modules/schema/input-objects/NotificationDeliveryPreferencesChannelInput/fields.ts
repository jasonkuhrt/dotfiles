import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesChannelInput}.
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
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesChannelInput} |
* | **Path** | `NotificationDeliveryPreferencesChannelInput.notificationsDisabled` |
* | **⚠ Deprecated** | This field has been replaced by notificationChannelPreferences |
* | **Nullability** | Optional |
*/
export interface notificationsDisabled {
kind: "InputField",
name: "notificationsDisabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesChannelInput}.
*
* The schedule for notifications on this channel.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationDeliveryPreferencesScheduleInput} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesChannelInput} |
* | **Path** | `NotificationDeliveryPreferencesChannelInput.schedule` |
* | **Nullability** | Optional |
*/
export interface schedule {
kind: "InputField",
name: "schedule",
inlineType: [0, ],
namedType: $Schema.NotificationDeliveryPreferencesScheduleInput,
type: $Schema.NotificationDeliveryPreferencesScheduleInput['type'] | null | undefined
}