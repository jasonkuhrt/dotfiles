import type * as $Fields from './fields.js'

export * as SlackChannelNameMappingInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 14 |
* | **All Fields Nullable** | Yes |
*/
export interface SlackChannelNameMappingInput {
kind: "InputObject",
name: "SlackChannelNameMappingInput",
isAllFieldsNullable: true,
fields: {
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
},
type: {
id: $Fields.id['type'],
name: $Fields.name['type'],
isPrivate?: $Fields.isPrivate['type'],
isShared?: $Fields.isShared['type'],
botAdded?: $Fields.botAdded['type'],
teams: $Fields.teams['type'],
autoCreateOnMessage?: $Fields.autoCreateOnMessage['type'],
autoCreateOnEmoji?: $Fields.autoCreateOnEmoji['type'],
autoCreateOnBotMention?: $Fields.autoCreateOnBotMention['type'],
autoCreateTemplateId?: $Fields.autoCreateTemplateId['type'],
postCancellationUpdates?: $Fields.postCancellationUpdates['type'],
postCompletionUpdates?: $Fields.postCompletionUpdates['type'],
postAcceptedFromTriageUpdates?: $Fields.postAcceptedFromTriageUpdates['type'],
aiTitles?: $Fields.aiTitles['type']
}
}