import type * as $Fields from './fields.js'

export * as PasskeyLoginStartResponse from './fields.js'

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
export interface PasskeyLoginStartResponse {
kind: "Object",
name: "PasskeyLoginStartResponse",
fields: {
__typename: $Fields.__typename,
success: $Fields.success,
options: $Fields.options
}
}