import type * as $Fields from './fields.js'

export * as NotificationDeliveryPreferencesInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 1 |
* | **All Fields Nullable** | Yes |
*/
export interface NotificationDeliveryPreferencesInput {
kind: "InputObject",
name: "NotificationDeliveryPreferencesInput",
isAllFieldsNullable: true,
fields: {
mobile: $Fields.mobile
},
type: {
mobile?: $Fields.mobile['type']
}
}