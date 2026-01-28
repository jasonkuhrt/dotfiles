import type * as $Fields from './fields.js'

export * as EmailIntakeAddressPayload from './fields.js'

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
export interface EmailIntakeAddressPayload {
kind: "Object",
name: "EmailIntakeAddressPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
emailIntakeAddress: $Fields.emailIntakeAddress,
success: $Fields.success
}
}