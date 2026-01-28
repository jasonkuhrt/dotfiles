import type * as $Fields from './fields.js'

export * as NotificationBatchActionPayload from './fields.js'

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
export interface NotificationBatchActionPayload {
kind: "Object",
name: "NotificationBatchActionPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
notifications: $Fields.notifications,
success: $Fields.success
}
}