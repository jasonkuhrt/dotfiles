import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as ProjectFilter from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Project filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 41 |
* | **All Fields Nullable** | Yes |
*/
export interface ProjectFilter<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Comparator for the identifier.
*/
id?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IDComparator<_$Context> | null | undefined>,
/**
* Comparator for the created at date.
*/
createdAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DateComparator<_$Context> | null | undefined>,
/**
* Comparator for the updated at date.
*/
updatedAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DateComparator<_$Context> | null | undefined>,
/**
* Comparator for the project name.
*/
name?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* Comparator for the project slug ID.
*/
slugId?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* [DEPRECATED] Comparator for the project state.
*/
state?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* Filters that the project's status must satisfy.
*/
status?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectStatusFilter<_$Context> | null | undefined>,
/**
* Comparator for the projects priority.
*/
priority?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableNumberComparator<_$Context> | null | undefined>,
/**
* Filters that project labels must satisfy.
*/
labels?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectLabelCollectionFilter<_$Context> | null | undefined>,
/**
* [Internal] Comparator for the project's content.
*/
searchableContent?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ContentComparator<_$Context> | null | undefined>,
/**
* Comparator for the project started date (when it was moved to an "In Progress" status).
*/
startedAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableDateComparator<_$Context> | null | undefined>,
/**
* Comparator for the project completion date.
*/
completedAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableDateComparator<_$Context> | null | undefined>,
/**
* Comparator for the project cancelation date.
*/
canceledAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableDateComparator<_$Context> | null | undefined>,
/**
* Comparator for the project start date.
*/
startDate?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableDateComparator<_$Context> | null | undefined>,
/**
* Comparator for the project target date.
*/
targetDate?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableDateComparator<_$Context> | null | undefined>,
/**
* Comparator for the project health: onTrack, atRisk, offTrack
*/
health?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* Comparator for the project health (with age): onTrack, atRisk, offTrack, outdated, noUpdate
*/
healthWithAge?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* [ALPHA] Comparator for the project activity type: buzzin, active, some, none
*/
activityType?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* Comparator for filtering projects with relations.
*/
hasRelatedRelations?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RelationExistsComparator<_$Context> | null | undefined>,
/**
* [Deprecated] Comparator for filtering projects which this is depended on by.
*/
hasDependedOnByRelations?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RelationExistsComparator<_$Context> | null | undefined>,
/**
* [Deprecated]Comparator for filtering projects which this depends on.
*/
hasDependsOnRelations?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RelationExistsComparator<_$Context> | null | undefined>,
/**
* Comparator for filtering projects which are blocked.
*/
hasBlockedByRelations?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RelationExistsComparator<_$Context> | null | undefined>,
/**
* Comparator for filtering projects which are blocking.
*/
hasBlockingRelations?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RelationExistsComparator<_$Context> | null | undefined>,
/**
* Comparator for filtering projects with violated dependencies.
*/
hasViolatedRelations?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RelationExistsComparator<_$Context> | null | undefined>,
/**
* Comparator for the project updates.
*/
projectUpdates?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectUpdatesCollectionFilter<_$Context> | null | undefined>,
/**
* Filters that the projects creator must satisfy.
*/
creator?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserFilter<_$Context> | null | undefined>,
/**
* Filters that the projects lead must satisfy.
*/
lead?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableUserFilter<_$Context> | null | undefined>,
/**
* Filters that the projects members must satisfy.
*/
members?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserCollectionFilter<_$Context> | null | undefined>,
/**
* Filters that the projects issues must satisfy.
*/
issues?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueCollectionFilter<_$Context> | null | undefined>,
/**
* Filters that the projects roadmaps must satisfy.
*/
roadmaps?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RoadmapCollectionFilter<_$Context> | null | undefined>,
/**
* Filters that the projects initiatives must satisfy.
*/
initiatives?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeCollectionFilter<_$Context> | null | undefined>,
/**
* Filters that the project's milestones must satisfy.
*/
projectMilestones?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectMilestoneCollectionFilter<_$Context> | null | undefined>,
/**
* Filters that the project's completed milestones must satisfy.
*/
completedProjectMilestones?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectMilestoneCollectionFilter<_$Context> | null | undefined>,
/**
* Filters that the project's next milestone must satisfy.
*/
nextProjectMilestone?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectMilestoneFilter<_$Context> | null | undefined>,
/**
* Filters that the project's team must satisfy.
*/
accessibleTeams?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TeamCollectionFilter<_$Context> | null | undefined>,
/**
* Filters that the last applied template must satisfy.
*/
lastAppliedTemplate?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableTemplateFilter<_$Context> | null | undefined>,
/**
* Filters that the project's customer needs must satisfy.
*/
needs?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerNeedCollectionFilter<_$Context> | null | undefined>,
/**
* Count of customers
*/
customerCount?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NumberComparator<_$Context> | null | undefined>,
/**
* Count of important customers
*/
customerImportantCount?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NumberComparator<_$Context> | null | undefined>,
/**
* Compound filters, all of which need to be matched by the project.
*/
and?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectFilter<_$Context> | null | undefined>> | null | undefined>,
/**
* Compound filters, one of which need to be matched by the project.
*/
or?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectFilter<_$Context> | null | undefined>> | null | undefined>
}