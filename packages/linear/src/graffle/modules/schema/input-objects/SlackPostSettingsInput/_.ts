import type * as $Fields from './fields.js'

export * as SlackPostSettingsInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 5 |
* | **All Fields Nullable** | Yes |
*/
export interface SlackPostSettingsInput {
kind: "InputObject",
name: "SlackPostSettingsInput",
isAllFieldsNullable: true,
fields: {
channel: $Fields.channel,
channelId: $Fields.channelId,
configurationUrl: $Fields.configurationUrl,
teamId: $Fields.teamId,
channelType: $Fields.channelType
},
type: {
channel: $Fields.channel['type'],
channelId: $Fields.channelId['type'],
configurationUrl: $Fields.configurationUrl['type'],
teamId?: $Fields.teamId['type'],
channelType?: $Fields.channelType['type']
}
}