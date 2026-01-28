import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationSubscriptionUpdateInput}.
*
* The types of notifications of the subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationSubscriptionUpdateInput} |
* | **Path** | `NotificationSubscriptionUpdateInput.notificationSubscriptionTypes` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface notificationSubscriptionTypes {
kind: "InputField",
name: "notificationSubscriptionTypes",
inlineType: [0, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationSubscriptionUpdateInput}.
*
* Whether the subscription is active.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationSubscriptionUpdateInput} |
* | **Path** | `NotificationSubscriptionUpdateInput.active` |
* | **Nullability** | Optional |
*/
export interface active {
kind: "InputField",
name: "active",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}