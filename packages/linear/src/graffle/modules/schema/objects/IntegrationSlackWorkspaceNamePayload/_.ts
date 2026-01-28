import type * as $Fields from './fields.js'

export * as IntegrationSlackWorkspaceNamePayload from './fields.js'

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
export interface IntegrationSlackWorkspaceNamePayload {
kind: "Object",
name: "IntegrationSlackWorkspaceNamePayload",
fields: {
__typename: $Fields.__typename,
name: $Fields.name,
success: $Fields.success
}
}