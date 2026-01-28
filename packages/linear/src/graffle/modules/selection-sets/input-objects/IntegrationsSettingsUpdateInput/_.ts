import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as IntegrationsSettingsUpdateInput from './fields.js'

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
export interface IntegrationsSettingsUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
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
slackIssueSlaBreached?: $Scalars.Boolean<_$Context>
}