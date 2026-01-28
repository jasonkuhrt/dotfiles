import type * as $Fields from './fields.js'

export * as GitLabTestConnectionPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 6 |
*/
export interface GitLabTestConnectionPayload {
kind: "Object",
name: "GitLabTestConnectionPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
integration: $Fields.integration,
success: $Fields.success,
error: $Fields.error,
errorResponseBody: $Fields.errorResponseBody,
errorResponseHeaders: $Fields.errorResponseHeaders
}
}