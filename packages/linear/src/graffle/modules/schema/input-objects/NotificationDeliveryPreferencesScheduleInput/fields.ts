import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesScheduleInput}.
*
* Whether the schedule is disabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesScheduleInput} |
* | **Path** | `NotificationDeliveryPreferencesScheduleInput.disabled` |
* | **Nullability** | Optional |
*/
export interface disabled {
kind: "InputField",
name: "disabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesScheduleInput}.
*
* Delivery preferences for Sunday.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationDeliveryPreferencesDayInput}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesScheduleInput} |
* | **Path** | `NotificationDeliveryPreferencesScheduleInput.sunday` |
* | **Nullability** | Required |
*/
export interface sunday {
kind: "InputField",
name: "sunday",
inlineType: [1, ],
namedType: $Schema.NotificationDeliveryPreferencesDayInput,
type: $Schema.NotificationDeliveryPreferencesDayInput['type']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesScheduleInput}.
*
* Delivery preferences for Monday.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationDeliveryPreferencesDayInput}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesScheduleInput} |
* | **Path** | `NotificationDeliveryPreferencesScheduleInput.monday` |
* | **Nullability** | Required |
*/
export interface monday {
kind: "InputField",
name: "monday",
inlineType: [1, ],
namedType: $Schema.NotificationDeliveryPreferencesDayInput,
type: $Schema.NotificationDeliveryPreferencesDayInput['type']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesScheduleInput}.
*
* Delivery preferences for Tuesday.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationDeliveryPreferencesDayInput}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesScheduleInput} |
* | **Path** | `NotificationDeliveryPreferencesScheduleInput.tuesday` |
* | **Nullability** | Required |
*/
export interface tuesday {
kind: "InputField",
name: "tuesday",
inlineType: [1, ],
namedType: $Schema.NotificationDeliveryPreferencesDayInput,
type: $Schema.NotificationDeliveryPreferencesDayInput['type']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesScheduleInput}.
*
* Delivery preferences for Wednesday.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationDeliveryPreferencesDayInput}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesScheduleInput} |
* | **Path** | `NotificationDeliveryPreferencesScheduleInput.wednesday` |
* | **Nullability** | Required |
*/
export interface wednesday {
kind: "InputField",
name: "wednesday",
inlineType: [1, ],
namedType: $Schema.NotificationDeliveryPreferencesDayInput,
type: $Schema.NotificationDeliveryPreferencesDayInput['type']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesScheduleInput}.
*
* Delivery preferences for Thursday.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationDeliveryPreferencesDayInput}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesScheduleInput} |
* | **Path** | `NotificationDeliveryPreferencesScheduleInput.thursday` |
* | **Nullability** | Required |
*/
export interface thursday {
kind: "InputField",
name: "thursday",
inlineType: [1, ],
namedType: $Schema.NotificationDeliveryPreferencesDayInput,
type: $Schema.NotificationDeliveryPreferencesDayInput['type']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesScheduleInput}.
*
* Delivery preferences for Friday.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationDeliveryPreferencesDayInput}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesScheduleInput} |
* | **Path** | `NotificationDeliveryPreferencesScheduleInput.friday` |
* | **Nullability** | Required |
*/
export interface friday {
kind: "InputField",
name: "friday",
inlineType: [1, ],
namedType: $Schema.NotificationDeliveryPreferencesDayInput,
type: $Schema.NotificationDeliveryPreferencesDayInput['type']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesScheduleInput}.
*
* Delivery preferences for Saturday.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationDeliveryPreferencesDayInput}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesScheduleInput} |
* | **Path** | `NotificationDeliveryPreferencesScheduleInput.saturday` |
* | **Nullability** | Required |
*/
export interface saturday {
kind: "InputField",
name: "saturday",
inlineType: [1, ],
namedType: $Schema.NotificationDeliveryPreferencesDayInput,
type: $Schema.NotificationDeliveryPreferencesDayInput['type']
}