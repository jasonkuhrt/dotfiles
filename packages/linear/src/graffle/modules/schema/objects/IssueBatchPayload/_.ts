import type * as $Fields from './fields.js'

export * as IssueBatchPayload from './fields.js'

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
export interface IssueBatchPayload {
kind: "Object",
name: "IssueBatchPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
issues: $Fields.issues,
success: $Fields.success
}
}