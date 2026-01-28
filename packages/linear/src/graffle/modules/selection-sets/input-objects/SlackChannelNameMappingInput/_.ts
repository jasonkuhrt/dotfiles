import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as SlackChannelNameMappingInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 14 |
* | **All Fields Nullable** | Yes |
*/
export interface SlackChannelNameMappingInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Slack channel ID.
*/
id: $Scalars.String$NonNull<_$Context>,
/**
* The Slack channel name.
*/
name: $Scalars.String$NonNull<_$Context>,
/**
* Whether or not the Slack channel is private.
*/
isPrivate?: $Scalars.Boolean<_$Context>,
/**
* Whether or not the Slack channel is shared with an external org.
*/
isShared?: $Scalars.Boolean<_$Context>,
/**
* Whether or not the Linear Asks bot has been added to this Slack channel.
*/
botAdded?: $Scalars.Boolean<_$Context>,
/**
* Which teams are connected to the channel and settings for those teams.
*/
teams: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SlackAsksTeamSettingsInput<_$Context> | null | undefined>>>,
/**
* Whether or not top-level messages in this channel should automatically create Asks.
*/
autoCreateOnMessage?: $Scalars.Boolean<_$Context>,
/**
* Whether or not using the :ticket: emoji in this channel should automatically create Asks.
*/
autoCreateOnEmoji?: $Scalars.Boolean<_$Context>,
/**
* Whether or not @-mentioning the bot should automatically create an Ask with the message.
*/
autoCreateOnBotMention?: $Scalars.Boolean<_$Context>,
/**
* The optional template ID to use for Asks auto-created in this channel. If not set, auto-created Asks won't use any template.
*/
autoCreateTemplateId?: $Scalars.String<_$Context>,
/**
* Whether or not synced Slack threads should be updated with a message and emoji when their Ask is canceled.
*/
postCancellationUpdates?: $Scalars.Boolean<_$Context>,
/**
* Whether or not synced Slack threads should be updated with a message and emoji when their Ask is completed.
*/
postCompletionUpdates?: $Scalars.Boolean<_$Context>,
/**
* Whether or not synced Slack threads should be updated with a message when their Ask is accepted from triage.
*/
postAcceptedFromTriageUpdates?: $Scalars.Boolean<_$Context>,
/**
* Whether or not to use AI to generate titles for Asks created in this channel.
*/
aiTitles?: $Scalars.Boolean<_$Context>
}