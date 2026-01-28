import type * as $Fields from './fields.js'

export * as DocumentPayload from './fields.js'

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
export interface DocumentPayload {
kind: "Object",
name: "DocumentPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
document: $Fields.document,
success: $Fields.success
}
}