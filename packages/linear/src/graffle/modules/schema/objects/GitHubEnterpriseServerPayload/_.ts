import type * as $Fields from './fields.js'

export * as GitHubEnterpriseServerPayload from './fields.js'

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
export interface GitHubEnterpriseServerPayload {
kind: "Object",
name: "GitHubEnterpriseServerPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
integration: $Fields.integration,
success: $Fields.success,
setupUrl: $Fields.setupUrl,
installUrl: $Fields.installUrl,
webhookSecret: $Fields.webhookSecret
}
}