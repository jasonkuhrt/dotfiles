import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationDeliveryPreferencesInput}.
*
* The delivery preferences for the mobile channel.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationDeliveryPreferencesChannelInput} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NotificationDeliveryPreferencesInput} |
* | **Path** | `NotificationDeliveryPreferencesInput.mobile` |
* | **Nullability** | Optional |
*/
export interface mobile {
kind: "InputField",
name: "mobile",
inlineType: [0, ],
namedType: $Schema.NotificationDeliveryPreferencesChannelInput,
type: $Schema.NotificationDeliveryPreferencesChannelInput['type'] | null | undefined
}