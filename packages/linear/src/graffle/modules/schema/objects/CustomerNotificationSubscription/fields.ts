import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"CustomerNotificationSubscription"`
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
value: "CustomerNotificationSubscription"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerNotificationSubscription}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNotificationSubscription} |
* | **Path** | `CustomerNotificationSubscription.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "OutputField",
name: "id",
arguments: {},
inlineType: [1, ],
namedType: $Schema.ID
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerNotificationSubscription}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.CustomerNotificationSubscription} |
* | **Path** | `CustomerNotificationSubscription.createdAt` |
* | **Nullability** | Required |
*/
export interface createdAt {
kind: "OutputField",
name: "createdAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerNotificationSubscription}.
*
* The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
* been updated after creation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.CustomerNotificationSubscription} |
* | **Path** | `CustomerNotificationSubscription.updatedAt` |
* | **Nullability** | Required |
*/
export interface updatedAt {
kind: "OutputField",
name: "updatedAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerNotificationSubscription}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.CustomerNotificationSubscription} |
* | **Path** | `CustomerNotificationSubscription.archivedAt` |
* | **Nullability** | Optional |
*/
export interface archivedAt {
kind: "OutputField",
name: "archivedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerNotificationSubscription}.
*
* The user that subscribed to receive notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomerNotificationSubscription} |
* | **Path** | `CustomerNotificationSubscription.subscriber` |
* | **Nullability** | Required |
*/
export interface subscriber {
kind: "OutputField",
name: "subscriber",
arguments: {},
inlineType: [1, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerNotificationSubscription}.
*
* The customer subscribed to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Customer}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomerNotificationSubscription} |
* | **Path** | `CustomerNotificationSubscription.customer` |
* | **Nullability** | Required |
*/
export interface customer {
kind: "OutputField",
name: "customer",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Customer
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerNotificationSubscription}.
*
* The contextual custom view associated with the notification subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomView} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomerNotificationSubscription} |
* | **Path** | `CustomerNotificationSubscription.customView` |
* | **Nullability** | Optional |
*/
export interface customView {
kind: "OutputField",
name: "customView",
arguments: {},
inlineType: [0, ],
namedType: $Schema.CustomView
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerNotificationSubscription}.
*
* The contextual cycle view associated with the notification subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Cycle} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomerNotificationSubscription} |
* | **Path** | `CustomerNotificationSubscription.cycle` |
* | **Nullability** | Optional |
*/
export interface cycle {
kind: "OutputField",
name: "cycle",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Cycle
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerNotificationSubscription}.
*
* The contextual label view associated with the notification subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabel} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomerNotificationSubscription} |
* | **Path** | `CustomerNotificationSubscription.label` |
* | **Nullability** | Optional |
*/
export interface label {
kind: "OutputField",
name: "label",
arguments: {},
inlineType: [0, ],
namedType: $Schema.IssueLabel
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerNotificationSubscription}.
*
* The contextual project view associated with the notification subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Project} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomerNotificationSubscription} |
* | **Path** | `CustomerNotificationSubscription.project` |
* | **Nullability** | Optional |
*/
export interface project {
kind: "OutputField",
name: "project",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Project
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerNotificationSubscription}.
*
* The contextual initiative view associated with the notification subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Initiative} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomerNotificationSubscription} |
* | **Path** | `CustomerNotificationSubscription.initiative` |
* | **Nullability** | Optional |
*/
export interface initiative {
kind: "OutputField",
name: "initiative",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Initiative
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerNotificationSubscription}.
*
* The team associated with the notification subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Team} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomerNotificationSubscription} |
* | **Path** | `CustomerNotificationSubscription.team` |
* | **Nullability** | Optional |
*/
export interface team {
kind: "OutputField",
name: "team",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Team
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerNotificationSubscription}.
*
* The user view associated with the notification subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomerNotificationSubscription} |
* | **Path** | `CustomerNotificationSubscription.user` |
* | **Nullability** | Optional |
*/
export interface user {
kind: "OutputField",
name: "user",
arguments: {},
inlineType: [0, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerNotificationSubscription}.
*
* The type of view to which the notification subscription context is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ContextViewType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.CustomerNotificationSubscription} |
* | **Path** | `CustomerNotificationSubscription.contextViewType` |
* | **Nullability** | Optional |
*/
export interface contextViewType {
kind: "OutputField",
name: "contextViewType",
arguments: {},
inlineType: [0, ],
namedType: $Schema.ContextViewType
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerNotificationSubscription}.
*
* The type of user view to which the notification subscription context is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserContextViewType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.CustomerNotificationSubscription} |
* | **Path** | `CustomerNotificationSubscription.userContextViewType` |
* | **Nullability** | Optional |
*/
export interface userContextViewType {
kind: "OutputField",
name: "userContextViewType",
arguments: {},
inlineType: [0, ],
namedType: $Schema.UserContextViewType
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerNotificationSubscription}.
*
* Whether the subscription is active or not.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNotificationSubscription} |
* | **Path** | `CustomerNotificationSubscription.active` |
* | **Nullability** | Required |
*/
export interface active {
kind: "OutputField",
name: "active",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerNotificationSubscription}.
*
* The type of subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNotificationSubscription} |
* | **Path** | `CustomerNotificationSubscription.notificationSubscriptionTypes` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface notificationSubscriptionTypes {
kind: "OutputField",
name: "notificationSubscriptionTypes",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.String
}
