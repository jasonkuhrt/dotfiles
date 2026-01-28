import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackPostSettingsInput}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackPostSettingsInput} |
* | **Path** | `SlackPostSettingsInput.channel` |
* | **Nullability** | Required |
*/
export interface channel {
kind: "InputField",
name: "channel",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackPostSettingsInput}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackPostSettingsInput} |
* | **Path** | `SlackPostSettingsInput.channelId` |
* | **Nullability** | Required |
*/
export interface channelId {
kind: "InputField",
name: "channelId",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackPostSettingsInput}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackPostSettingsInput} |
* | **Path** | `SlackPostSettingsInput.configurationUrl` |
* | **Nullability** | Required |
*/
export interface configurationUrl {
kind: "InputField",
name: "configurationUrl",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackPostSettingsInput}.
*
* Slack workspace id
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackPostSettingsInput} |
* | **Path** | `SlackPostSettingsInput.teamId` |
* | **Nullability** | Optional |
*/
export interface teamId {
kind: "InputField",
name: "teamId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackPostSettingsInput}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SlackChannelType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.SlackPostSettingsInput} |
* | **Path** | `SlackPostSettingsInput.channelType` |
* | **Nullability** | Optional |
*/
export interface channelType {
kind: "InputField",
name: "channelType",
inlineType: [0, ],
namedType: $Schema.SlackChannelType,
type: $Schema.SlackChannelType['members'] | null | undefined
}