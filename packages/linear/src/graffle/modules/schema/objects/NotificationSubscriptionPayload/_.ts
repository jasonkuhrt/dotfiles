import type * as $Fields from './fields.js'

export * as NotificationSubscriptionPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 3 |
*/
export interface NotificationSubscriptionPayload {
kind: "Object",
name: "NotificationSubscriptionPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
notificationSubscription: $Fields.notificationSubscription,
success: $Fields.success
}
}