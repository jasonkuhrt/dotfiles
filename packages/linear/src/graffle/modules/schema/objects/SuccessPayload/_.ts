import type * as $Fields from './fields.js'

export * as SuccessPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 2 |
*/
export interface SuccessPayload {
kind: "Object",
name: "SuccessPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
success: $Fields.success
}
}