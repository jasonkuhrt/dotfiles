import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as IssueFilter from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Issue filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 64 |
* | **All Fields Nullable** | Yes |
*/
export interface IssueFilter<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Comparator for the identifier.
*/
id?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueIDComparator<_$Context> | null | undefined>,
/**
* Comparator for the created at date.
*/
createdAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DateComparator<_$Context> | null | undefined>,
/**
* Comparator for the updated at date.
*/
updatedAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DateComparator<_$Context> | null | undefined>,
/**
* Comparator for the issues number.
*/
number?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NumberComparator<_$Context> | null | undefined>,
/**
* Comparator for the issues title.
*/
title?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* Comparator for the issues description.
*/
description?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableStringComparator<_$Context> | null | undefined>,
/**
* Comparator for the issues priority. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.
*/
priority?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableNumberComparator<_$Context> | null | undefined>,
/**
* Comparator for the issues estimate.
*/
estimate?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.EstimateComparator<_$Context> | null | undefined>,
/**
* Comparator for the issues started at date.
*/
startedAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableDateComparator<_$Context> | null | undefined>,
/**
* Comparator for the issues triaged at date.
*/
triagedAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableDateComparator<_$Context> | null | undefined>,
/**
* Comparator for the issues completed at date.
*/
completedAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableDateComparator<_$Context> | null | undefined>,
/**
* Comparator for the issues canceled at date.
*/
canceledAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableDateComparator<_$Context> | null | undefined>,
/**
* Comparator for the issues archived at date.
*/
archivedAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableDateComparator<_$Context> | null | undefined>,
/**
* Comparator for the issues auto closed at date.
*/
autoClosedAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableDateComparator<_$Context> | null | undefined>,
/**
* Comparator for the issues auto archived at date.
*/
autoArchivedAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableDateComparator<_$Context> | null | undefined>,
/**
* Comparator for the issues added to cycle at date.
*/
addedToCycleAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableDateComparator<_$Context> | null | undefined>,
/**
* Comparator for the period when issue was added to a cycle.
*/
addedToCyclePeriod?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CyclePeriodComparator<_$Context> | null | undefined>,
/**
* Comparator for the issues due date.
*/
dueDate?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableTimelessDateComparator<_$Context> | null | undefined>,
/**
* [Internal] Comparator for the issue's accumulatedStateUpdatedAt date.
*/
accumulatedStateUpdatedAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableDateComparator<_$Context> | null | undefined>,
/**
* Comparator for the issues snoozed until date.
*/
snoozedUntilAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableDateComparator<_$Context> | null | undefined>,
/**
* Filters that the issues assignee must satisfy.
*/
assignee?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableUserFilter<_$Context> | null | undefined>,
/**
* Filters that the issue's delegated agent must satisfy.
*/
delegate?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableUserFilter<_$Context> | null | undefined>,
/**
* Filters that the last applied template must satisfy.
*/
lastAppliedTemplate?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableTemplateFilter<_$Context> | null | undefined>,
/**
* [ALPHA] Filters that the recurring issue template must satisfy.
*/
recurringIssueTemplate?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableTemplateFilter<_$Context> | null | undefined>,
/**
* Filters that the source must satisfy.
*/
sourceMetadata?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SourceMetadataComparator<_$Context> | null | undefined>,
/**
* Filters that the issues creator must satisfy.
*/
creator?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableUserFilter<_$Context> | null | undefined>,
/**
* Filters that the issue parent must satisfy.
*/
parent?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableIssueFilter<_$Context> | null | undefined>,
/**
* Filters that the issues snoozer must satisfy.
*/
snoozedBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableUserFilter<_$Context> | null | undefined>,
/**
* Filters that issue labels must satisfy.
*/
labels?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueLabelCollectionFilter<_$Context> | null | undefined>,
/**
* Filters that issue subscribers must satisfy.
*/
subscribers?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserCollectionFilter<_$Context> | null | undefined>,
/**
* Comparator for filtering issues which have been shared with users outside of the team.
*/
hasSharedUsers?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RelationExistsComparator<_$Context> | null | undefined>,
/**
* Filters that users the issue has been shared with must satisfy.
*/
sharedWith?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserCollectionFilter<_$Context> | null | undefined>,
/**
* Filters that the issues team must satisfy.
*/
team?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TeamFilter<_$Context> | null | undefined>,
/**
* Filters that the issues project milestone must satisfy.
*/
projectMilestone?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableProjectMilestoneFilter<_$Context> | null | undefined>,
/**
* Filters that the issues comments must satisfy.
*/
comments?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CommentCollectionFilter<_$Context> | null | undefined>,
/**
* [Internal] Filters that the issue's suggestions must satisfy.
*/
suggestions?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueSuggestionCollectionFilter<_$Context> | null | undefined>,
/**
* Filters that the issues cycle must satisfy.
*/
cycle?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableCycleFilter<_$Context> | null | undefined>,
/**
* Filters that the issues project must satisfy.
*/
project?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableProjectFilter<_$Context> | null | undefined>,
/**
* Filters that the issues state must satisfy.
*/
state?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.WorkflowStateFilter<_$Context> | null | undefined>,
/**
* Filters that the child issues must satisfy.
*/
children?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueCollectionFilter<_$Context> | null | undefined>,
/**
* Filters that the issues attachments must satisfy.
*/
attachments?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AttachmentCollectionFilter<_$Context> | null | undefined>,
/**
* [Internal] Comparator for the issues content.
*/
searchableContent?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ContentComparator<_$Context> | null | undefined>,
/**
* Comparator for filtering issues with relations.
*/
hasRelatedRelations?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RelationExistsComparator<_$Context> | null | undefined>,
/**
* Comparator for filtering issues which are duplicates.
*/
hasDuplicateRelations?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RelationExistsComparator<_$Context> | null | undefined>,
/**
* Comparator for filtering issues which are blocked.
*/
hasBlockedByRelations?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RelationExistsComparator<_$Context> | null | undefined>,
/**
* Comparator for filtering issues which are blocking.
*/
hasBlockingRelations?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RelationExistsComparator<_$Context> | null | undefined>,
/**
* [Internal] Comparator for filtering issues which have suggested related issues.
*/
hasSuggestedRelatedIssues?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RelationExistsComparator<_$Context> | null | undefined>,
/**
* [Internal] Comparator for filtering issues which have suggested similar issues.
*/
hasSuggestedSimilarIssues?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RelationExistsComparator<_$Context> | null | undefined>,
/**
* [Internal] Comparator for filtering issues which have suggested assignees.
*/
hasSuggestedAssignees?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RelationExistsComparator<_$Context> | null | undefined>,
/**
* [Internal] Comparator for filtering issues which have suggested projects.
*/
hasSuggestedProjects?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RelationExistsComparator<_$Context> | null | undefined>,
/**
* [Internal] Comparator for filtering issues which have suggested labels.
*/
hasSuggestedLabels?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RelationExistsComparator<_$Context> | null | undefined>,
/**
* [Internal] Comparator for filtering issues which have suggested teams.
*/
hasSuggestedTeams?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RelationExistsComparator<_$Context> | null | undefined>,
/**
* Comparator for the issues sla status.
*/
slaStatus?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SlaStatusComparator<_$Context> | null | undefined>,
/**
* Filters that the issues reactions must satisfy.
*/
reactions?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ReactionCollectionFilter<_$Context> | null | undefined>,
/**
* Filters that the issue's customer needs must satisfy.
*/
needs?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerNeedCollectionFilter<_$Context> | null | undefined>,
/**
* [ALPHA] Filters that the issue's releases must satisfy.
*/
releases?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ReleaseCollectionFilter<_$Context> | null | undefined>,
/**
* Count of customers
*/
customerCount?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NumberComparator<_$Context> | null | undefined>,
/**
* Count of important customers
*/
customerImportantCount?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NumberComparator<_$Context> | null | undefined>,
/**
* [Internal] Lead time (created -> completed) comparator.
*/
leadTime?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableDurationComparator<_$Context> | null | undefined>,
/**
* [Internal] Cycle time (started -> completed) comparator.
*/
cycleTime?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableDurationComparator<_$Context> | null | undefined>,
/**
* [Internal] Age (created -> now) comparator, defined if the issue is still open.
*/
ageTime?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableDurationComparator<_$Context> | null | undefined>,
/**
* [Internal] Triage time (entered triaged -> triaged) comparator.
*/
triageTime?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableDurationComparator<_$Context> | null | undefined>,
/**
* Compound filters, all of which need to be matched by the issue.
*/
and?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueFilter<_$Context> | null | undefined>> | null | undefined>,
/**
* Compound filters, one of which need to be matched by the issue.
*/
or?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueFilter<_$Context> | null | undefined>> | null | undefined>
}