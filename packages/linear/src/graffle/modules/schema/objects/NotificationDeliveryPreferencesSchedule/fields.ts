import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"NotificationDeliveryPreferencesSchedule"`
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
value: "NotificationDeliveryPreferencesSchedule"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesSchedule}.
*
* Whether the schedule is disabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesSchedule} |
* | **Path** | `NotificationDeliveryPreferencesSchedule.disabled` |
* | **Nullability** | Optional |
*/
export interface disabled {
kind: "OutputField",
name: "disabled",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesSchedule}.
*
* Delivery preferences for Sunday.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationDeliveryPreferencesDay}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesSchedule} |
* | **Path** | `NotificationDeliveryPreferencesSchedule.sunday` |
* | **Nullability** | Required |
*/
export interface sunday {
kind: "OutputField",
name: "sunday",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationDeliveryPreferencesDay
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesSchedule}.
*
* Delivery preferences for Monday.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationDeliveryPreferencesDay}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesSchedule} |
* | **Path** | `NotificationDeliveryPreferencesSchedule.monday` |
* | **Nullability** | Required |
*/
export interface monday {
kind: "OutputField",
name: "monday",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationDeliveryPreferencesDay
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesSchedule}.
*
* Delivery preferences for Tuesday.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationDeliveryPreferencesDay}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesSchedule} |
* | **Path** | `NotificationDeliveryPreferencesSchedule.tuesday` |
* | **Nullability** | Required |
*/
export interface tuesday {
kind: "OutputField",
name: "tuesday",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationDeliveryPreferencesDay
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesSchedule}.
*
* Delivery preferences for Wednesday.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationDeliveryPreferencesDay}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesSchedule} |
* | **Path** | `NotificationDeliveryPreferencesSchedule.wednesday` |
* | **Nullability** | Required |
*/
export interface wednesday {
kind: "OutputField",
name: "wednesday",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationDeliveryPreferencesDay
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesSchedule}.
*
* Delivery preferences for Thursday.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationDeliveryPreferencesDay}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesSchedule} |
* | **Path** | `NotificationDeliveryPreferencesSchedule.thursday` |
* | **Nullability** | Required |
*/
export interface thursday {
kind: "OutputField",
name: "thursday",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationDeliveryPreferencesDay
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesSchedule}.
*
* Delivery preferences for Friday.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationDeliveryPreferencesDay}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesSchedule} |
* | **Path** | `NotificationDeliveryPreferencesSchedule.friday` |
* | **Nullability** | Required |
*/
export interface friday {
kind: "OutputField",
name: "friday",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationDeliveryPreferencesDay
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesSchedule}.
*
* Delivery preferences for Saturday.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationDeliveryPreferencesDay}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesSchedule} |
* | **Path** | `NotificationDeliveryPreferencesSchedule.saturday` |
* | **Nullability** | Required |
*/
export interface saturday {
kind: "OutputField",
name: "saturday",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationDeliveryPreferencesDay
}
