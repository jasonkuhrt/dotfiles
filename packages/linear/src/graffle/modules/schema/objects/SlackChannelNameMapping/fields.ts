import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"SlackChannelNameMapping"`
*
* {@link https://graphql.org/learn/queries/#meta-fields | GraphQL __typename documentation}
*/
export interface __typename {
kind: "OutputField",
name: "__typename",
arguments: {},
inlineType: [1],
namedType: {
kind: "__typename",
value: "SlackChannelNameMapping"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SlackChannelNameMapping}.
*
* The Slack channel ID.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMapping} |
* | **Path** | `SlackChannelNameMapping.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "OutputField",
name: "id",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SlackChannelNameMapping}.
*
* The Slack channel name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMapping} |
* | **Path** | `SlackChannelNameMapping.name` |
* | **Nullability** | Required |
*/
export interface name {
kind: "OutputField",
name: "name",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SlackChannelNameMapping}.
*
* Whether or not the Slack channel is private.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMapping} |
* | **Path** | `SlackChannelNameMapping.isPrivate` |
* | **Nullability** | Optional |
*/
export interface isPrivate {
kind: "OutputField",
name: "isPrivate",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SlackChannelNameMapping}.
*
* Whether or not the Slack channel is shared with an external org.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMapping} |
* | **Path** | `SlackChannelNameMapping.isShared` |
* | **Nullability** | Optional |
*/
export interface isShared {
kind: "OutputField",
name: "isShared",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SlackChannelNameMapping}.
*
* Whether or not the Linear Asks bot has been added to this Slack channel.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMapping} |
* | **Path** | `SlackChannelNameMapping.botAdded` |
* | **Nullability** | Optional |
*/
export interface botAdded {
kind: "OutputField",
name: "botAdded",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SlackChannelNameMapping}.
*
* Which teams are connected to the channel and settings for those teams.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SlackAsksTeamSettings}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMapping} |
* | **Path** | `SlackChannelNameMapping.teams` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface teams {
kind: "OutputField",
name: "teams",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.SlackAsksTeamSettings
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SlackChannelNameMapping}.
*
* Whether or not top-level messages in this channel should automatically create Asks.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMapping} |
* | **Path** | `SlackChannelNameMapping.autoCreateOnMessage` |
* | **Nullability** | Optional |
*/
export interface autoCreateOnMessage {
kind: "OutputField",
name: "autoCreateOnMessage",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SlackChannelNameMapping}.
*
* Whether or not using the :ticket: emoji in this channel should automatically create Asks.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMapping} |
* | **Path** | `SlackChannelNameMapping.autoCreateOnEmoji` |
* | **Nullability** | Optional |
*/
export interface autoCreateOnEmoji {
kind: "OutputField",
name: "autoCreateOnEmoji",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SlackChannelNameMapping}.
*
* Whether or not @-mentioning the bot should automatically create an Ask with the message.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMapping} |
* | **Path** | `SlackChannelNameMapping.autoCreateOnBotMention` |
* | **Nullability** | Optional |
*/
export interface autoCreateOnBotMention {
kind: "OutputField",
name: "autoCreateOnBotMention",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SlackChannelNameMapping}.
*
* The optional template ID to use for Asks auto-created in this channel. If not set, auto-created Asks won't use any template.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMapping} |
* | **Path** | `SlackChannelNameMapping.autoCreateTemplateId` |
* | **Nullability** | Optional |
*/
export interface autoCreateTemplateId {
kind: "OutputField",
name: "autoCreateTemplateId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SlackChannelNameMapping}.
*
* Whether or not synced Slack threads should be updated with a message and emoji when their Ask is canceled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMapping} |
* | **Path** | `SlackChannelNameMapping.postCancellationUpdates` |
* | **Nullability** | Optional |
*/
export interface postCancellationUpdates {
kind: "OutputField",
name: "postCancellationUpdates",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SlackChannelNameMapping}.
*
* Whether or not synced Slack threads should be updated with a message and emoji when their Ask is completed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMapping} |
* | **Path** | `SlackChannelNameMapping.postCompletionUpdates` |
* | **Nullability** | Optional |
*/
export interface postCompletionUpdates {
kind: "OutputField",
name: "postCompletionUpdates",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SlackChannelNameMapping}.
*
* Whether or not synced Slack threads should be updated with a message when their Ask is accepted from triage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMapping} |
* | **Path** | `SlackChannelNameMapping.postAcceptedFromTriageUpdates` |
* | **Nullability** | Optional |
*/
export interface postAcceptedFromTriageUpdates {
kind: "OutputField",
name: "postAcceptedFromTriageUpdates",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SlackChannelNameMapping}.
*
* Whether or not to use AI to generate titles for Asks created in this channel.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackChannelNameMapping} |
* | **Path** | `SlackChannelNameMapping.aiTitles` |
* | **Nullability** | Optional |
*/
export interface aiTitles {
kind: "OutputField",
name: "aiTitles",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}
