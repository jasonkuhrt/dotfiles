import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as ProjectUpdateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 32 |
* | **All Fields Nullable** | Yes |
*/
export interface ProjectUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* [DEPRECATED] The state of the project.
*
* @deprecated Use statusId instead
*/
state?: $Scalars.String<_$Context>,
/**
* The ID of the project status.
*/
statusId?: $Scalars.String<_$Context>,
/**
* The name of the project.
*/
name?: $Scalars.String<_$Context>,
/**
* The description for the project.
*/
description?: $Scalars.String<_$Context>,
/**
* The project content as markdown.
*/
content?: $Scalars.String<_$Context>,
/**
* The ID of the issue from which that project is created.
*/
convertedFromIssueId?: $Scalars.String<_$Context>,
/**
* The ID of the last template applied to the project.
*/
lastAppliedTemplateId?: $Scalars.String<_$Context>,
/**
* The icon of the project.
*/
icon?: $Scalars.String<_$Context>,
/**
* The color of the project.
*/
color?: $Scalars.String<_$Context>,
/**
* The identifiers of the teams this project is associated with.
*/
teamIds?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>,
/**
* The time until which project update reminders are paused.
*/
projectUpdateRemindersPausedUntilAt?: $Scalars.DateTime<_$Context>,
/**
* The n-weekly frequency at which to prompt for updates. When not set, reminders are inherited from workspace.
*/
updateReminderFrequencyInWeeks?: $Scalars.Float<_$Context>,
/**
* The frequency at which to prompt for updates. When not set, reminders are inherited from workspace.
*/
updateReminderFrequency?: $Scalars.Float<_$Context>,
/**
* The frequency resolution.
*/
$frequencyResolution?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.FrequencyResolutionType | null | undefined>,
/**
* The day at which to prompt for updates.
*/
$updateRemindersDay?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.Day | null | undefined>,
/**
* The hour at which to prompt for updates.
*/
updateRemindersHour?: $Scalars.Int<_$Context>,
/**
* The identifier of the project lead.
*/
leadId?: $Scalars.String<_$Context>,
/**
* The identifiers of the members of this project.
*/
memberIds?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>,
/**
* The planned start date of the project.
*/
startDate?: $Scalars.TimelessDate<_$Context>,
/**
* The resolution of the project's start date.
*/
$startDateResolution?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DateResolutionType | null | undefined>,
/**
* The planned target date of the project.
*/
targetDate?: $Scalars.TimelessDate<_$Context>,
/**
* The resolution of the project's estimated completion date.
*/
$targetDateResolution?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DateResolutionType | null | undefined>,
/**
* The date when the project was completed.
*/
completedAt?: $Scalars.DateTime<_$Context>,
/**
* The date when the project was canceled.
*/
canceledAt?: $Scalars.DateTime<_$Context>,
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
* The sort order for the project in shared views.
*/
sortOrder?: $Scalars.Float<_$Context>,
/**
* The sort order for the project within shared views, when ordered by priority.
*/
prioritySortOrder?: $Scalars.Float<_$Context>,
/**
* Whether the project has been trashed.
*/
trashed?: $Scalars.Boolean<_$Context>,
/**
* The priority of the project. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.
*/
priority?: $Scalars.Int<_$Context>,
/**
* The identifiers of the project labels associated with this project.
*/
labelIds?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>
}