import type * as $Fields from './fields.js'

export * as AttachmentPayload from './fields.js'

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
export interface AttachmentPayload {
kind: "Object",
name: "AttachmentPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
attachment: $Fields.attachment,
success: $Fields.success
}
}