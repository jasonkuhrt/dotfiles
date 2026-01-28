import type * as $Fields from './fields.js'

export * as AsksChannelConnectPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 5 |
*/
export interface AsksChannelConnectPayload {
kind: "Object",
name: "AsksChannelConnectPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
integration: $Fields.integration,
success: $Fields.success,
mapping: $Fields.mapping,
addBot: $Fields.addBot
}
}