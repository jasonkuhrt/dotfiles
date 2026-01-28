import type * as $Fields from './fields.js'

export * as WebhookPayload from './fields.js'

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
export interface WebhookPayload {
kind: "Object",
name: "WebhookPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
webhook: $Fields.webhook,
success: $Fields.success
}
}