import type * as $Fields from './fields.js'

export * as ReleasePayload from './fields.js'

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
export interface ReleasePayload {
kind: "Object",
name: "ReleasePayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
release: $Fields.release,
success: $Fields.success
}
}