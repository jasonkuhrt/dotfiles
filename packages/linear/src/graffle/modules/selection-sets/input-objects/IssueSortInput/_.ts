import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as IssueSortInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Issue sorting options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 25 |
* | **All Fields Nullable** | Yes |
*/
export interface IssueSortInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Sort by priority
*/
priority?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PrioritySort<_$Context> | null | undefined>,
/**
* Sort by estimate
*/
estimate?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.EstimateSort<_$Context> | null | undefined>,
/**
* Sort by issue title
*/
title?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TitleSort<_$Context> | null | undefined>,
/**
* Sort by label
*/
label?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.LabelSort<_$Context> | null | undefined>,
/**
* Sort by label group
*/
labelGroup?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.LabelGroupSort<_$Context> | null | undefined>,
/**
* Sort by SLA status
*/
slaStatus?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SlaStatusSort<_$Context> | null | undefined>,
/**
* Sort by issue creation date
*/
createdAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CreatedAtSort<_$Context> | null | undefined>,
/**
* Sort by issue update date
*/
updatedAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UpdatedAtSort<_$Context> | null | undefined>,
/**
* Sort by issue completion date
*/
completedAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CompletedAtSort<_$Context> | null | undefined>,
/**
* Sort by issue due date
*/
dueDate?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DueDateSort<_$Context> | null | undefined>,
/**
* [Internal] Sort by the accumulated time in the current workflow state
*/
accumulatedStateUpdatedAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TimeInStatusSort<_$Context> | null | undefined>,
/**
* Sort by Cycle start date
*/
cycle?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CycleSort<_$Context> | null | undefined>,
/**
* Sort by Project Milestone target date
*/
milestone?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.MilestoneSort<_$Context> | null | undefined>,
/**
* Sort by assignee name
*/
assignee?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AssigneeSort<_$Context> | null | undefined>,
/**
* Sort by delegate name
*/
delegate?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DelegateSort<_$Context> | null | undefined>,
/**
* Sort by Project name
*/
project?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectSort<_$Context> | null | undefined>,
/**
* Sort by Team name
*/
team?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TeamSort<_$Context> | null | undefined>,
/**
* Sort by manual order
*/
manual?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ManualSort<_$Context> | null | undefined>,
/**
* Sort by workflow state type
*/
workflowState?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.WorkflowStateSort<_$Context> | null | undefined>,
/**
* Sort by customer name
*/
customer?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerSort<_$Context> | null | undefined>,
/**
* Sort by customer revenue
*/
customerRevenue?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerRevenueSort<_$Context> | null | undefined>,
/**
* Sort by number of customers associated with the issue
*/
customerCount?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerCountSort<_$Context> | null | undefined>,
/**
* Sort by number of important customers associated with the issue
*/
customerImportantCount?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerImportantCountSort<_$Context> | null | undefined>,
/**
* Sort by the root issue
*/
rootIssue?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RootIssueSort<_$Context> | null | undefined>,
/**
* [ALPHA] Sort by number of links associated with the issue
*/
linkCount?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.LinkCountSort<_$Context> | null | undefined>
}