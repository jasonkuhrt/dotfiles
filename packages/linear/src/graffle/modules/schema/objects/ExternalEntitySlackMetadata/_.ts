import type * as $Fields from './fields.js'

export * as ExternalEntitySlackMetadata from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Metadata about the external Slack entity.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 4 |
*/
export interface ExternalEntitySlackMetadata {
kind: "Object",
name: "ExternalEntitySlackMetadata",
fields: {
__typename: $Fields.__typename,
isFromSlack: $Fields.isFromSlack,
channelId: $Fields.channelId,
channelName: $Fields.channelName,
messageUrl: $Fields.messageUrl
}
}