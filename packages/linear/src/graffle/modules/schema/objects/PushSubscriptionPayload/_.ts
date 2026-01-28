import type * as $Fields from './fields.js'

export * as PushSubscriptionPayload from './fields.js'

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
export interface PushSubscriptionPayload {
kind: "Object",
name: "PushSubscriptionPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
entity: $Fields.entity,
success: $Fields.success
}
}