import type * as $Fields from './fields.js'

export * as NotificationDeliveryPreferencesSchedule from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A user's notification delivery schedule for a particular day.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 8 |
*/
export interface NotificationDeliveryPreferencesSchedule {
kind: "Object",
name: "NotificationDeliveryPreferencesSchedule",
fields: {
__typename: $Fields.__typename,
disabled: $Fields.disabled,
sunday: $Fields.sunday,
monday: $Fields.monday,
tuesday: $Fields.tuesday,
wednesday: $Fields.wednesday,
thursday: $Fields.thursday,
friday: $Fields.friday,
saturday: $Fields.saturday
}
}