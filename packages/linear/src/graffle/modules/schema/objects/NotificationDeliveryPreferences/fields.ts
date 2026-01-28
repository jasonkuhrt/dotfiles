import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"NotificationDeliveryPreferences"`
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
value: "NotificationDeliveryPreferences"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationDeliveryPreferences}.
*
* The delivery preferences for the mobile channel.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationDeliveryPreferencesChannel} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferences} |
* | **Path** | `NotificationDeliveryPreferences.mobile` |
* | **Nullability** | Optional |
*/
export interface mobile {
kind: "OutputField",
name: "mobile",
arguments: {},
inlineType: [0, ],
namedType: $Schema.NotificationDeliveryPreferencesChannel
}
