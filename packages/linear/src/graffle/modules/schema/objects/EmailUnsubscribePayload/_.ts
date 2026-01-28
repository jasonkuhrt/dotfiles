import type * as $Fields from './fields.js'

export * as EmailUnsubscribePayload from './fields.js'

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
export interface EmailUnsubscribePayload {
kind: "Object",
name: "EmailUnsubscribePayload",
fields: {
__typename: $Fields.__typename,
success: $Fields.success
}
}