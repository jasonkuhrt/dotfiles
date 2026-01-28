import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationSubscriptionCreateInput}.
*
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationSubscriptionCreateInput} |
* | **Path** | `NotificationSubscriptionCreateInput.id` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationSubscriptionCreateInput}.
*
* The identifier of the customer to subscribe to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationSubscriptionCreateInput} |
* | **Path** | `NotificationSubscriptionCreateInput.customerId` |
* | **Nullability** | Optional |
*/
export interface customerId {
kind: "InputField",
name: "customerId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationSubscriptionCreateInput}.
*
* The identifier of the custom view to subscribe to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationSubscriptionCreateInput} |
* | **Path** | `NotificationSubscriptionCreateInput.customViewId` |
* | **Nullability** | Optional |
*/
export interface customViewId {
kind: "InputField",
name: "customViewId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationSubscriptionCreateInput}.
*
* The identifier of the cycle to subscribe to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationSubscriptionCreateInput} |
* | **Path** | `NotificationSubscriptionCreateInput.cycleId` |
* | **Nullability** | Optional |
*/
export interface cycleId {
kind: "InputField",
name: "cycleId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationSubscriptionCreateInput}.
*
* The identifier of the initiative to subscribe to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationSubscriptionCreateInput} |
* | **Path** | `NotificationSubscriptionCreateInput.initiativeId` |
* | **Nullability** | Optional |
*/
export interface initiativeId {
kind: "InputField",
name: "initiativeId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationSubscriptionCreateInput}.
*
* The identifier of the label to subscribe to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationSubscriptionCreateInput} |
* | **Path** | `NotificationSubscriptionCreateInput.labelId` |
* | **Nullability** | Optional |
*/
export interface labelId {
kind: "InputField",
name: "labelId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationSubscriptionCreateInput}.
*
* The identifier of the project to subscribe to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationSubscriptionCreateInput} |
* | **Path** | `NotificationSubscriptionCreateInput.projectId` |
* | **Nullability** | Optional |
*/
export interface projectId {
kind: "InputField",
name: "projectId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationSubscriptionCreateInput}.
*
* The identifier of the team to subscribe to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationSubscriptionCreateInput} |
* | **Path** | `NotificationSubscriptionCreateInput.teamId` |
* | **Nullability** | Optional |
*/
export interface teamId {
kind: "InputField",
name: "teamId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationSubscriptionCreateInput}.
*
* The identifier of the user to subscribe to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationSubscriptionCreateInput} |
* | **Path** | `NotificationSubscriptionCreateInput.userId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationSubscriptionCreateInput}.
*
* The type of view to which the notification subscription context is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ContextViewType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.NotificationSubscriptionCreateInput} |
* | **Path** | `NotificationSubscriptionCreateInput.contextViewType` |
* | **Nullability** | Optional |
*/
export interface contextViewType {
kind: "InputField",
name: "contextViewType",
inlineType: [0, ],
namedType: $Schema.ContextViewType,
type: $Schema.ContextViewType['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationSubscriptionCreateInput}.
*
* The type of user view to which the notification subscription context is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserContextViewType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.NotificationSubscriptionCreateInput} |
* | **Path** | `NotificationSubscriptionCreateInput.userContextViewType` |
* | **Nullability** | Optional |
*/
export interface userContextViewType {
kind: "InputField",
name: "userContextViewType",
inlineType: [0, ],
namedType: $Schema.UserContextViewType,
type: $Schema.UserContextViewType['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationSubscriptionCreateInput}.
*
* The types of notifications of the subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationSubscriptionCreateInput} |
* | **Path** | `NotificationSubscriptionCreateInput.notificationSubscriptionTypes` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationSubscriptionCreateInput}.
*
* Whether the subscription is active.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationSubscriptionCreateInput} |
* | **Path** | `NotificationSubscriptionCreateInput.active` |
* | **Nullability** | Optional |
*/
export interface active {
kind: "InputField",
name: "active",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}