import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"NotificationDeliveryPreferencesDay"`
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
value: "NotificationDeliveryPreferencesDay"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesDay}.
*
* The time notifications start.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesDay} |
* | **Path** | `NotificationDeliveryPreferencesDay.start` |
* | **Nullability** | Optional |
*/
export interface start {
kind: "OutputField",
name: "start",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesDay}.
*
* The time notifications end.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesDay} |
* | **Path** | `NotificationDeliveryPreferencesDay.end` |
* | **Nullability** | Optional |
*/
export interface end {
kind: "OutputField",
name: "end",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}
