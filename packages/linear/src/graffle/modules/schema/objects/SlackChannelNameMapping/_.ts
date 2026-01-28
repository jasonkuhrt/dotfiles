import type * as $Fields from './fields.js'

export * as SlackChannelNameMapping from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Object for mapping Slack channel IDs to names and other settings.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 14 |
*/
export interface SlackChannelNameMapping {
kind: "Object",
name: "SlackChannelNameMapping",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
name: $Fields.name,
isPrivate: $Fields.isPrivate,
isShared: $Fields.isShared,
botAdded: $Fields.botAdded,
teams: $Fields.teams,
autoCreateOnMessage: $Fields.autoCreateOnMessage,
autoCreateOnEmoji: $Fields.autoCreateOnEmoji,
autoCreateOnBotMention: $Fields.autoCreateOnBotMention,
autoCreateTemplateId: $Fields.autoCreateTemplateId,
postCancellationUpdates: $Fields.postCancellationUpdates,
postCompletionUpdates: $Fields.postCompletionUpdates,
postAcceptedFromTriageUpdates: $Fields.postAcceptedFromTriageUpdates,
aiTitles: $Fields.aiTitles
}
}