import type * as $Fields from './fields.js'

export * as NotificationDeliveryPreferencesChannelInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | Yes |
*/
export interface NotificationDeliveryPreferencesChannelInput {
kind: "InputObject",
name: "NotificationDeliveryPreferencesChannelInput",
isAllFieldsNullable: true,
fields: {
notificationsDisabled: $Fields.notificationsDisabled,
schedule: $Fields.schedule
},
type: {
notificationsDisabled?: $Fields.notificationsDisabled['type'],
schedule?: $Fields.schedule['type']
}
}