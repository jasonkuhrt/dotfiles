import type * as $Fields from './fields.js'

export * as NotificationDeliveryPreferences from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A user's notification delivery preferences.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 1 |
*/
export interface NotificationDeliveryPreferences {
kind: "Object",
name: "NotificationDeliveryPreferences",
fields: {
__typename: $Fields.__typename,
mobile: $Fields.mobile
}
}