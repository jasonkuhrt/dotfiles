import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackChannelNameMappingInput}.
*
* The Slack channel ID.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMappingInput} |
* | **Path** | `SlackChannelNameMappingInput.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackChannelNameMappingInput}.
*
* The Slack channel name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMappingInput} |
* | **Path** | `SlackChannelNameMappingInput.name` |
* | **Nullability** | Required |
*/
export interface name {
kind: "InputField",
name: "name",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackChannelNameMappingInput}.
*
* Whether or not the Slack channel is private.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMappingInput} |
* | **Path** | `SlackChannelNameMappingInput.isPrivate` |
* | **Nullability** | Optional |
*/
export interface isPrivate {
kind: "InputField",
name: "isPrivate",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackChannelNameMappingInput}.
*
* Whether or not the Slack channel is shared with an external org.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMappingInput} |
* | **Path** | `SlackChannelNameMappingInput.isShared` |
* | **Nullability** | Optional |
*/
export interface isShared {
kind: "InputField",
name: "isShared",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackChannelNameMappingInput}.
*
* Whether or not the Linear Asks bot has been added to this Slack channel.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMappingInput} |
* | **Path** | `SlackChannelNameMappingInput.botAdded` |
* | **Nullability** | Optional |
*/
export interface botAdded {
kind: "InputField",
name: "botAdded",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackChannelNameMappingInput}.
*
* Which teams are connected to the channel and settings for those teams.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SlackAsksTeamSettingsInput}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMappingInput} |
* | **Path** | `SlackChannelNameMappingInput.teams` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface teams {
kind: "InputField",
name: "teams",
inlineType: [1, [1, ]],
namedType: $Schema.SlackAsksTeamSettingsInput,
type: readonly ($Schema.SlackAsksTeamSettingsInput['type'])[]
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackChannelNameMappingInput}.
*
* Whether or not top-level messages in this channel should automatically create Asks.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMappingInput} |
* | **Path** | `SlackChannelNameMappingInput.autoCreateOnMessage` |
* | **Nullability** | Optional |
*/
export interface autoCreateOnMessage {
kind: "InputField",
name: "autoCreateOnMessage",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackChannelNameMappingInput}.
*
* Whether or not using the :ticket: emoji in this channel should automatically create Asks.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMappingInput} |
* | **Path** | `SlackChannelNameMappingInput.autoCreateOnEmoji` |
* | **Nullability** | Optional |
*/
export interface autoCreateOnEmoji {
kind: "InputField",
name: "autoCreateOnEmoji",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackChannelNameMappingInput}.
*
* Whether or not @-mentioning the bot should automatically create an Ask with the message.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMappingInput} |
* | **Path** | `SlackChannelNameMappingInput.autoCreateOnBotMention` |
* | **Nullability** | Optional |
*/
export interface autoCreateOnBotMention {
kind: "InputField",
name: "autoCreateOnBotMention",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackChannelNameMappingInput}.
*
* The optional template ID to use for Asks auto-created in this channel. If not set, auto-created Asks won't use any template.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMappingInput} |
* | **Path** | `SlackChannelNameMappingInput.autoCreateTemplateId` |
* | **Nullability** | Optional |
*/
export interface autoCreateTemplateId {
kind: "InputField",
name: "autoCreateTemplateId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackChannelNameMappingInput}.
*
* Whether or not synced Slack threads should be updated with a message and emoji when their Ask is canceled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMappingInput} |
* | **Path** | `SlackChannelNameMappingInput.postCancellationUpdates` |
* | **Nullability** | Optional |
*/
export interface postCancellationUpdates {
kind: "InputField",
name: "postCancellationUpdates",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackChannelNameMappingInput}.
*
* Whether or not synced Slack threads should be updated with a message and emoji when their Ask is completed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMappingInput} |
* | **Path** | `SlackChannelNameMappingInput.postCompletionUpdates` |
* | **Nullability** | Optional |
*/
export interface postCompletionUpdates {
kind: "InputField",
name: "postCompletionUpdates",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackChannelNameMappingInput}.
*
* Whether or not synced Slack threads should be updated with a message when their Ask is accepted from triage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMappingInput} |
* | **Path** | `SlackChannelNameMappingInput.postAcceptedFromTriageUpdates` |
* | **Nullability** | Optional |
*/
export interface postAcceptedFromTriageUpdates {
kind: "InputField",
name: "postAcceptedFromTriageUpdates",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackChannelNameMappingInput}.
*
* Whether or not to use AI to generate titles for Asks created in this channel.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMappingInput} |
* | **Path** | `SlackChannelNameMappingInput.aiTitles` |
* | **Nullability** | Optional |
*/
export interface aiTitles {
kind: "InputField",
name: "aiTitles",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}