import type * as $Fields from './fields.js'

export * as NotificationDeliveryPreferencesDay from './fields.js'

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
* | **Fields** | 2 |
*/
export interface NotificationDeliveryPreferencesDay {
kind: "Object",
name: "NotificationDeliveryPreferencesDay",
fields: {
__typename: $Fields.__typename,
start: $Fields.start,
end: $Fields.end
}
}