import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesDayInput}.
*
* The time notifications start.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesDayInput} |
* | **Path** | `NotificationDeliveryPreferencesDayInput.start` |
* | **Nullability** | Optional |
*/
export interface start {
kind: "InputField",
name: "start",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesDayInput}.
*
* The time notifications end.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesDayInput} |
* | **Path** | `NotificationDeliveryPreferencesDayInput.end` |
* | **Nullability** | Optional |
*/
export interface end {
kind: "InputField",
name: "end",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}