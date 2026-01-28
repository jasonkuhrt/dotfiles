import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as IssueCreateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 35 |
* | **All Fields Nullable** | Yes |
*/
export interface IssueCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The title of the issue.
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
* The identifier of the team associated with the issue.
*/
teamId: $Scalars.String$NonNull<_$Context>,
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
* The comment the issue is referencing.
*/
referenceCommentId?: $Scalars.String<_$Context>,
/**
* The comment the issue is created from.
*/
sourceCommentId?: $Scalars.String<_$Context>,
/**
* [Internal] The pull request comment the issue is created from.
*/
sourcePullRequestCommentId?: $Scalars.String<_$Context>,
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
* Create issue as a user with the provided name. This option is only available to OAuth applications creating issues in `actor=app` mode.
*/
createAsUser?: $Scalars.String<_$Context>,
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*/
displayIconUrl?: $Scalars.String<_$Context>,
/**
* Whether the passed sort order should be preserved.
*/
preserveSortOrderOnCreate?: $Scalars.Boolean<_$Context>,
/**
* The date when the issue was created (e.g. if importing from another system). Must be a date in the past. If none is provided, the backend will generate the time as now.
*/
createdAt?: $Scalars.DateTime<_$Context>,
/**
* [Internal] The timestamp at which an issue will be considered in breach of SLA.
*/
slaBreachesAt?: $Scalars.DateTime<_$Context>,
/**
* [Internal] The timestamp at which the issue's SLA was started.
*/
slaStartedAt?: $Scalars.DateTime<_$Context>,
/**
* The identifier of a template the issue should be created from. If other values are provided in the input, they will override template values.
*/
templateId?: $Scalars.String<_$Context>,
/**
* The date when the issue was completed (e.g. if importing from another system). Must be a date in the past and after createdAt date. Cannot be provided with an incompatible workflow state.
*/
completedAt?: $Scalars.DateTime<_$Context>,
/**
* The SLA day count type for the issue. Whether SLA should be business days only or calendar days (default).
*/
$slaType?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SLADayCountType | null | undefined>,
/**
* Whether to use the default template for the team. When set to true, the default template of this team based on user's membership will be applied.
*/
useDefaultTemplate?: $Scalars.Boolean<_$Context>
}