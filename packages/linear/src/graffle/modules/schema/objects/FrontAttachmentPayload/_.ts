import type * as $Fields from './fields.js'

export * as FrontAttachmentPayload from './fields.js'

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
export interface FrontAttachmentPayload {
kind: "Object",
name: "FrontAttachmentPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
attachment: $Fields.attachment,
success: $Fields.success
}
}