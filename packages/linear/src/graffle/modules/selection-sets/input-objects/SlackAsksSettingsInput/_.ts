import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as SlackAsksSettingsInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 12 |
* | **All Fields Nullable** | Yes |
*/
export interface SlackAsksSettingsInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Slack workspace name
*/
teamName?: $Scalars.String<_$Context>,
/**
* Slack workspace id
*/
teamId?: $Scalars.String<_$Context>,
/**
* Enterprise name of the connected Slack enterprise
*/
enterpriseName?: $Scalars.String<_$Context>,
/**
* Enterprise id of the connected Slack enterprise
*/
enterpriseId?: $Scalars.String<_$Context>,
/**
* Whether to show unfurl previews in Slack
*/
shouldUnfurl?: $Scalars.Boolean<_$Context>,
/**
* Whether to show unfurls in the default style instead of Work Objects in Slack
*/
shouldUseDefaultUnfurl?: $Scalars.Boolean<_$Context>,
/**
* Whether to allow external users to perform actions on unfurls
*/
externalUserActions?: $Scalars.Boolean<_$Context>,
/**
* The mapping of Slack channel ID => Slack channel name for connected channels.
*/
slackChannelMapping?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SlackChannelNameMappingInput<_$Context> | null | undefined>> | null | undefined>,
/**
* The user role type that is allowed to manage Asks settings.
*/
$canAdministrate: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserRoleType>,
/**
* Controls who can see and set Customers when creating Asks in Slack.
*/
$customerVisibility?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerVisibilityMode | null | undefined>,
/**
* Whether Linear Agent should be enabled for this Slack Asks integration.
*/
enableAgent?: $Scalars.Boolean<_$Context>,
/**
* Whether Linear Agent should be given Org-wide access within Slack workflows.
*/
enableLinearAgentWorkflowAccess?: $Scalars.Boolean<_$Context>
}