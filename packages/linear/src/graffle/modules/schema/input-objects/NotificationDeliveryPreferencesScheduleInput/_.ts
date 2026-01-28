import type * as $Fields from './fields.js'

export * as NotificationDeliveryPreferencesScheduleInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 8 |
* | **All Fields Nullable** | Yes |
*/
export interface NotificationDeliveryPreferencesScheduleInput {
kind: "InputObject",
name: "NotificationDeliveryPreferencesScheduleInput",
isAllFieldsNullable: true,
fields: {
disabled: $Fields.disabled,
sunday: $Fields.sunday,
monday: $Fields.monday,
tuesday: $Fields.tuesday,
wednesday: $Fields.wednesday,
thursday: $Fields.thursday,
friday: $Fields.friday,
saturday: $Fields.saturday
},
type: {
disabled?: $Fields.disabled['type'],
sunday: $Fields.sunday['type'],
monday: $Fields.monday['type'],
tuesday: $Fields.tuesday['type'],
wednesday: $Fields.wednesday['type'],
thursday: $Fields.thursday['type'],
friday: $Fields.friday['type'],
saturday: $Fields.saturday['type']
}
}