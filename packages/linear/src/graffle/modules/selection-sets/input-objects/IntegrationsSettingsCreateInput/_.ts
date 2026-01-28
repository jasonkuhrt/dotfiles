import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as IntegrationsSettingsCreateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 18 |
* | **All Fields Nullable** | Yes |
*/
export interface IntegrationsSettingsCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Whether to send a Slack message when a new issue is created for the project or the team.
*/
slackIssueCreated?: $Scalars.Boolean<_$Context>,
/**
* Whether to send a Slack message when an issue is added to a view.
*/
slackIssueAddedToView?: $Scalars.Boolean<_$Context>,
/**
* Whether to send a Slack message when a comment is created on any of the project or team's issues.
*/
slackIssueNewComment?: $Scalars.Boolean<_$Context>,
/**
* Whether to send a Slack message when any of the project or team's issues change to completed or cancelled.
*/
slackIssueStatusChangedDone?: $Scalars.Boolean<_$Context>,
/**
* Whether to send a Slack message when any of the project or team's issues has a change in status.
*/
slackIssueStatusChangedAll?: $Scalars.Boolean<_$Context>,
/**
* Whether to send a Slack message when a project update is created.
*/
slackProjectUpdateCreated?: $Scalars.Boolean<_$Context>,
/**
* Whether to send a Slack message when a project update is created to team channels.
*/
slackProjectUpdateCreatedToTeam?: $Scalars.Boolean<_$Context>,
/**
* Whether to send a Slack message when a project update is created to workspace channel.
*/
slackProjectUpdateCreatedToWorkspace?: $Scalars.Boolean<_$Context>,
/**
* Whether to send a Slack message when an initiative update is created.
*/
slackInitiativeUpdateCreated?: $Scalars.Boolean<_$Context>,
/**
* Whether to send a Slack message when a new issue is added to triage.
*/
slackIssueAddedToTriage?: $Scalars.Boolean<_$Context>,
/**
* Whether to send a Slack message when an SLA is at high risk.
*/
slackIssueSlaHighRisk?: $Scalars.Boolean<_$Context>,
/**
* Whether to receive notification when an SLA has breached on Slack.
*/
slackIssueSlaBreached?: $Scalars.Boolean<_$Context>,
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The identifier of the team to create settings for.
*/
teamId?: $Scalars.String<_$Context>,
/**
* The identifier of the project to create settings for.
*/
projectId?: $Scalars.String<_$Context>,
/**
* The identifier of the initiative to create settings for.
*/
initiativeId?: $Scalars.String<_$Context>,
/**
* The identifier of the custom view to create settings for.
*/
customViewId?: $Scalars.String<_$Context>,
/**
* The type of view to which the integration settings context is associated with.
*/
$contextViewType?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ContextViewType | null | undefined>
}