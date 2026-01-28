import type * as $Fields from './fields.js'

export * as SlackChannelConnectPayload from './fields.js'

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
export interface SlackChannelConnectPayload {
kind: "Object",
name: "SlackChannelConnectPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
integration: $Fields.integration,
success: $Fields.success,
addBot: $Fields.addBot,
nudgeToConnectMainSlackIntegration: $Fields.nudgeToConnectMainSlackIntegration,
nudgeToUpdateMainSlackIntegration: $Fields.nudgeToUpdateMainSlackIntegration
}
}