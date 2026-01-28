import type * as $Fields from './fields.js'

export * as LabelNotificationSubscription from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A label notification subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 17 |
* | **Implements** | {@link $Schema.NotificationSubscription}, {@link $Schema.Entity}, {@link $Schema.Node} |
*/
export interface LabelNotificationSubscription {
kind: "Object",
name: "LabelNotificationSubscription",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
subscriber: $Fields.subscriber,
customer: $Fields.customer,
customView: $Fields.customView,
cycle: $Fields.cycle,
label: $Fields.label,
project: $Fields.project,
initiative: $Fields.initiative,
team: $Fields.team,
user: $Fields.user,
contextViewType: $Fields.contextViewType,
userContextViewType: $Fields.userContextViewType,
active: $Fields.active,
notificationSubscriptionTypes: $Fields.notificationSubscriptionTypes
}
}