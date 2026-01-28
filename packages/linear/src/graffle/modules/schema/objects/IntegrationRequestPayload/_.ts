import type * as $Fields from './fields.js'

export * as IntegrationRequestPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 1 |
*/
export interface IntegrationRequestPayload {
kind: "Object",
name: "IntegrationRequestPayload",
fields: {
__typename: $Fields.__typename,
success: $Fields.success
}
}