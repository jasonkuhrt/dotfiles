import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as IssueUpdateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 30 |
* | **All Fields Nullable** | Yes |
*/
export interface IssueUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The issue title.
*/
title?: $Scalars.String<_$Context>,
/**
* The issue description in markdown format.
*/
description?: $Scalars.String<_$Context>,
/**
* [Internal] The issue description as a Prosemirror document.
*/
descriptionData?: $Scalars.JSON<_$Context>,
/**
* The identifier of the user to assign the issue to.
*/
assigneeId?: $Scalars.String<_$Context>,
/**
* The identifier of the agent user to delegate the issue to.
*/
delegateId?: $Scalars.String<_$Context>,
/**
* The identifier of the parent issue. Can be a UUID or issue identifier (e.g., 'LIN-123').
*/
parentId?: $Scalars.String<_$Context>,
/**
* The priority of the issue. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.
*/
priority?: $Scalars.Int<_$Context>,
/**
* The estimated complexity of the issue.
*/
estimate?: $Scalars.Int<_$Context>,
/**
* The identifiers of the users subscribing to this ticket.
*/
subscriberIds?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>,
/**
* The identifiers of the issue labels associated with this ticket.
*/
labelIds?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>,
/**
* The identifiers of the issue labels to be added to this issue.
*/
addedLabelIds?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>,
/**
* The identifiers of the issue labels to be removed from this issue.
*/
removedLabelIds?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>,
/**
* The identifier of the team associated with the issue.
*/
teamId?: $Scalars.String<_$Context>,
/**
* The cycle associated with the issue.
*/
cycleId?: $Scalars.String<_$Context>,
/**
* The project associated with the issue.
*/
projectId?: $Scalars.String<_$Context>,
/**
* The project milestone associated with the issue.
*/
projectMilestoneId?: $Scalars.String<_$Context>,
/**
* The ID of the last template applied to the issue.
*/
lastAppliedTemplateId?: $Scalars.String<_$Context>,
/**
* The team state of the issue.
*/
stateId?: $Scalars.String<_$Context>,
/**
* The position of the issue in its column on the board view.
*
* @deprecated Will be removed in near future, please use `sortOrder` instead
*/
boardOrder?: $Scalars.Float<_$Context>,
/**
* The position of the issue related to other issues.
*/
sortOrder?: $Scalars.Float<_$Context>,
/**
* The position of the issue related to other issues, when ordered by priority.
*/
prioritySortOrder?: $Scalars.Float<_$Context>,
/**
* The position of the issue in parent's sub-issue list.
*/
subIssueSortOrder?: $Scalars.Float<_$Context>,
/**
* The date at which the issue is due.
*/
dueDate?: $Scalars.TimelessDate<_$Context>,
/**
* Whether the issue has been trashed.
*/
trashed?: $Scalars.Boolean<_$Context>,
/**
* [Internal] The timestamp at which an issue will be considered in breach of SLA.
*/
slaBreachesAt?: $Scalars.DateTime<_$Context>,
/**
* [Internal] The timestamp at which the issue's SLA was started.
*/
slaStartedAt?: $Scalars.DateTime<_$Context>,
/**
* The time until an issue will be snoozed in Triage view.
*/
snoozedUntilAt?: $Scalars.DateTime<_$Context>,
/**
* The identifier of the user who snoozed the issue.
*/
snoozedById?: $Scalars.String<_$Context>,
/**
* The SLA day count type for the issue. Whether SLA should be business days only or calendar days (default).
*/
$slaType?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SLADayCountType | null | undefined>,
/**
* Whether the issue was automatically closed because its parent issue was closed.
*/
autoClosedByParentClosing?: $Scalars.Boolean<_$Context>
}