import type * as $Fields from './fields.js'

export * as CustomViewPayload from './fields.js'

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
export interface CustomViewPayload {
kind: "Object",
name: "CustomViewPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
customView: $Fields.customView,
success: $Fields.success
}
}