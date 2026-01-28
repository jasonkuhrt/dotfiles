import type * as $Fields from './fields.js'

export * as GitHubCommitIntegrationPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 4 |
*/
export interface GitHubCommitIntegrationPayload {
kind: "Object",
name: "GitHubCommitIntegrationPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
integration: $Fields.integration,
success: $Fields.success,
webhookSecret: $Fields.webhookSecret
}
}