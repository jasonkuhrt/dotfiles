import type * as $Fields from './fields.js'

export * as NotificationPayload from './fields.js'

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
export interface NotificationPayload {
kind: "Object",
name: "NotificationPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
notification: $Fields.notification,
success: $Fields.success
}
}