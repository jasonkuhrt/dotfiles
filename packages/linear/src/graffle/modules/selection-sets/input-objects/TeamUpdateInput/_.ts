import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as TeamUpdateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 51 |
* | **All Fields Nullable** | Yes |
*/
export interface TeamUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The name of the team.
*/
name?: $Scalars.String<_$Context>,
/**
* The description of the team.
*/
description?: $Scalars.String<_$Context>,
/**
* The key of the team.
*/
key?: $Scalars.String<_$Context>,
/**
* The icon of the team.
*/
icon?: $Scalars.String<_$Context>,
/**
* The color of the team.
*/
color?: $Scalars.String<_$Context>,
/**
* Whether the team uses cycles.
*/
cyclesEnabled?: $Scalars.Boolean<_$Context>,
/**
* The day of the week that a new cycle starts.
*/
cycleStartDay?: $Scalars.Float<_$Context>,
/**
* The duration of each cycle in weeks.
*/
cycleDuration?: $Scalars.Int<_$Context>,
/**
* The cooldown time after each cycle in weeks.
*/
cycleCooldownTime?: $Scalars.Int<_$Context>,
/**
* Auto assign started issues to current active cycle setting.
*/
cycleIssueAutoAssignStarted?: $Scalars.Boolean<_$Context>,
/**
* Auto assign completed issues to current active cycle setting.
*/
cycleIssueAutoAssignCompleted?: $Scalars.Boolean<_$Context>,
/**
* Only allow issues with cycles in Active Issues.
*/
cycleLockToActive?: $Scalars.Boolean<_$Context>,
/**
* The date to begin cycles on.
*/
cycleEnabledStartDate?: $Scalars.DateTime<_$Context>,
/**
* How many upcoming cycles to create.
*/
upcomingCycleCount?: $Scalars.Float<_$Context>,
/**
* The timezone of the team.
*/
timezone?: $Scalars.String<_$Context>,
/**
* [DEPRECATED] Whether issues without priority should be sorted first.
*
* @deprecated This setting is no longer in use.
*/
issueOrderingNoPriorityFirst?: $Scalars.Boolean<_$Context>,
/**
* Whether the team should inherit estimation settings from its parent. Only applies to sub-teams.
*/
inheritIssueEstimation?: $Scalars.Boolean<_$Context>,
/**
* The issue estimation type to use. Must be one of "notUsed", "exponential", "fibonacci", "linear", "tShirt".
*/
issueEstimationType?: $Scalars.String<_$Context>,
/**
* Whether to allow zeros in issues estimates.
*/
issueEstimationAllowZero?: $Scalars.Boolean<_$Context>,
/**
* Whether to move issues to bottom of the column when changing state.
*/
setIssueSortOrderOnStateChange?: $Scalars.String<_$Context>,
/**
* Whether to add additional points to the estimate scale.
*/
issueEstimationExtended?: $Scalars.Boolean<_$Context>,
/**
* What to use as an default estimate for unestimated issues.
*/
defaultIssueEstimate?: $Scalars.Float<_$Context>,
/**
* Whether to send new issue notifications to Slack.
*/
slackNewIssue?: $Scalars.Boolean<_$Context>,
/**
* Whether to send new issue comment notifications to Slack.
*/
slackIssueComments?: $Scalars.Boolean<_$Context>,
/**
* Whether to send issue status update notifications to Slack.
*/
slackIssueStatuses?: $Scalars.Boolean<_$Context>,
/**
* Whether to group recent issue history entries.
*/
groupIssueHistory?: $Scalars.Boolean<_$Context>,
/**
* Whether to enable resolved thread AI summaries.
*/
aiThreadSummariesEnabled?: $Scalars.Boolean<_$Context>,
/**
* Whether to enable AI discussion summaries for issues.
*/
aiDiscussionSummariesEnabled?: $Scalars.Boolean<_$Context>,
/**
* The identifier of the default template for members of this team.
*/
defaultTemplateForMembersId?: $Scalars.String<_$Context>,
/**
* The identifier of the default template for non-members of this team.
*/
defaultTemplateForNonMembersId?: $Scalars.String<_$Context>,
/**
* The identifier of the default project template of this team.
*/
defaultProjectTemplateId?: $Scalars.String<_$Context>,
/**
* Whether the team is private or not.
*/
private?: $Scalars.Boolean<_$Context>,
/**
* Whether triage mode is enabled for the team.
*/
triageEnabled?: $Scalars.Boolean<_$Context>,
/**
* Whether an issue needs to have a priority set before leaving triage.
*/
requirePriorityToLeaveTriage?: $Scalars.Boolean<_$Context>,
/**
* Default status for newly created issues.
*/
defaultIssueStateId?: $Scalars.String<_$Context>,
/**
* Period after which issues are automatically closed, in months.
*/
autoClosePeriod?: $Scalars.Float<_$Context>,
/**
* The canceled workflow state which auto closed issues will be set to.
*/
autoCloseStateId?: $Scalars.String<_$Context>,
/**
* Whether to automatically close a parent issue in this team if all its sub-issues are closed.
*/
autoCloseParentIssues?: $Scalars.Boolean<_$Context>,
/**
* Whether to automatically close all sub-issues when a parent issue in this team is closed.
*/
autoCloseChildIssues?: $Scalars.Boolean<_$Context>,
/**
* Period after which closed and completed issues are automatically archived, in months.
*/
autoArchivePeriod?: $Scalars.Float<_$Context>,
/**
* The workflow state into which issues are moved when they are marked as a duplicate of another issue.
*/
markedAsDuplicateWorkflowStateId?: $Scalars.String<_$Context>,
/**
* Whether new users should join this team by default. Mutation restricted to workspace admins or owners!
*/
joinByDefault?: $Scalars.Boolean<_$Context>,
/**
* Whether the team is managed by SCIM integration. Mutation restricted to workspace admins or owners and only unsetting is allowed!
*/
scimManaged?: $Scalars.Boolean<_$Context>,
/**
* The parent team ID.
*/
parentId?: $Scalars.String<_$Context>,
/**
* [Internal] Whether the team should inherit workflow statuses from its parent.
*/
inheritWorkflowStatuses?: $Scalars.Boolean<_$Context>,
/**
* [Internal] Whether the team should inherit its product intelligence scope from its parent. Only applies to sub-teams.
*/
inheritProductIntelligenceScope?: $Scalars.Boolean<_$Context>,
/**
* [Internal] The scope of product intelligence suggestion data for the team.
*/
$productIntelligenceScope?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProductIntelligenceScope | null | undefined>,
/**
* The security settings for the team.
*/
securitySettings?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TeamSecuritySettingsInput<_$Context> | null | undefined>,
/**
* Whether all members in the workspace can join the team. Only used for public teams.
*/
allMembersCanJoin?: $Scalars.Boolean<_$Context>,
/**
* [Internal] When the team was retired.
*/
retiredAt?: $Scalars.DateTime<_$Context>,
/**
* [Internal] How to handle sub-teams when retiring. Required if the team has active sub-teams.
*/
$handleSubTeamsOnRetirement?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TeamRetirementSubTeamHandling | null | undefined>
}