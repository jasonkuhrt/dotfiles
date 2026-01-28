import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationUpdateInput}.
*
* The time when notification was marked as read.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.NotificationUpdateInput} |
* | **Path** | `NotificationUpdateInput.readAt` |
* | **Nullability** | Optional |
*/
export interface readAt {
kind: "InputField",
name: "readAt",
inlineType: [0, ],
namedType: $Schema.DateTime,
type: $Schema.DateTime['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationUpdateInput}.
*
* The time until a notification will be snoozed. After that it will appear in the inbox again.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.NotificationUpdateInput} |
* | **Path** | `NotificationUpdateInput.snoozedUntilAt` |
* | **Nullability** | Optional |
*/
export interface snoozedUntilAt {
kind: "InputField",
name: "snoozedUntilAt",
inlineType: [0, ],
namedType: $Schema.DateTime,
type: $Schema.DateTime['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationUpdateInput}.
*
* The id of the project update related to the notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationUpdateInput} |
* | **Path** | `NotificationUpdateInput.projectUpdateId` |
* | **Nullability** | Optional |
*/
export interface projectUpdateId {
kind: "InputField",
name: "projectUpdateId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NotificationUpdateInput}.
*
* The id of the project update related to the notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NotificationUpdateInput} |
* | **Path** | `NotificationUpdateInput.initiativeUpdateId` |
* | **Nullability** | Optional |
*/
export interface initiativeUpdateId {
kind: "InputField",
name: "initiativeUpdateId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}