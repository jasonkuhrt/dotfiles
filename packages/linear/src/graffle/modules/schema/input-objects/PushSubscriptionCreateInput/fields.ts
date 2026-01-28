import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.PushSubscriptionCreateInput}.
*
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PushSubscriptionCreateInput} |
* | **Path** | `PushSubscriptionCreateInput.id` |
* | **Nullability** | Optional |
*/
export interface id {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.PushSubscriptionCreateInput}.
*
* The user identifier of the subscription.
*
* @deprecated Not needed anymore.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PushSubscriptionCreateInput} |
* | **Path** | `PushSubscriptionCreateInput.userId` |
* | **⚠ Deprecated** | Not needed anymore. |
* | **Nullability** | Optional |
*/
export interface userId {
kind: "InputField",
name: "userId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.PushSubscriptionCreateInput}.
*
* The data of the subscription in stringified JSON format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PushSubscriptionCreateInput} |
* | **Path** | `PushSubscriptionCreateInput.data` |
* | **Nullability** | Required |
*/
export interface data {
kind: "InputField",
name: "data",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.PushSubscriptionCreateInput}.
*
* Whether this is a subscription payload for Google Cloud Messaging or Apple Push Notification service.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PushSubscriptionType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.PushSubscriptionCreateInput} |
* | **Path** | `PushSubscriptionCreateInput.type` |
* | **Default** | `"web"` |
* | **Nullability** | Optional |
*/
export interface type {
kind: "InputField",
name: "type",
inlineType: [0, ],
namedType: $Schema.PushSubscriptionType,
type: $Schema.PushSubscriptionType['members'] | null | undefined
}