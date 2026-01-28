import type * as $Fields from './fields.js'

export * as IntegrationTemplatePayload from './fields.js'

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
export interface IntegrationTemplatePayload {
kind: "Object",
name: "IntegrationTemplatePayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
integrationTemplate: $Fields.integrationTemplate,
success: $Fields.success
}
}