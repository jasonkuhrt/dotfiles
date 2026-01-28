import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type * as $Fields from './fields.js'
import type { $DefaultSelectionContext } from '../../_context.js'
import type { $FragmentInline } from './fragment.js'

export type * as IssueHistory from './__.js'

/**
* Selection set for {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A record of changes to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 68 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface IssueHistory<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.ObjectLike {

      /**
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.id` |
* | **Nullability** | Required |
*/
id?: $Fields.id.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.id<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.createdAt` |
* | **Nullability** | Required |
*/
createdAt?: $Fields.createdAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.createdAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
* been updated after creation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.updatedAt` |
* | **Nullability** | Required |
*/
updatedAt?: $Fields.updatedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.updatedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.archivedAt` |
* | **Nullability** | Optional |
*/
archivedAt?: $Fields.archivedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.archivedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The issue that was changed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Issue}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.issue` |
* | **Nullability** | Required |
*/
issue?: $Fields.issue.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issue<_$Context>>
/**
* The id of user who made these changes. If null, possibly means that the change made by an integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.actorId` |
* | **Nullability** | Optional |
*/
actorId?: $Fields.actorId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.actorId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether the issue's description was updated.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.updatedDescription` |
* | **Nullability** | Optional |
*/
updatedDescription?: $Fields.updatedDescription.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.updatedDescription<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* What the title was changed from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.fromTitle` |
* | **Nullability** | Optional |
*/
fromTitle?: $Fields.fromTitle.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.fromTitle<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* What the title was changed to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.toTitle` |
* | **Nullability** | Optional |
*/
toTitle?: $Fields.toTitle.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.toTitle<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The id of user from whom the issue was re-assigned from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.fromAssigneeId` |
* | **Nullability** | Optional |
*/
fromAssigneeId?: $Fields.fromAssigneeId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.fromAssigneeId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The id of user to whom the issue was assigned to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.toAssigneeId` |
* | **Nullability** | Optional |
*/
toAssigneeId?: $Fields.toAssigneeId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.toAssigneeId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* What the priority was changed from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.fromPriority` |
* | **Nullability** | Optional |
*/
fromPriority?: $Fields.fromPriority.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.fromPriority<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* What the priority was changed to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.toPriority` |
* | **Nullability** | Optional |
*/
toPriority?: $Fields.toPriority.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.toPriority<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The id of team from which the issue was moved from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.fromTeamId` |
* | **Nullability** | Optional |
*/
fromTeamId?: $Fields.fromTeamId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.fromTeamId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The id of team to which the issue was moved to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.toTeamId` |
* | **Nullability** | Optional |
*/
toTeamId?: $Fields.toTeamId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.toTeamId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The id of previous parent of the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.fromParentId` |
* | **Nullability** | Optional |
*/
fromParentId?: $Fields.fromParentId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.fromParentId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The id of new parent of the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.toParentId` |
* | **Nullability** | Optional |
*/
toParentId?: $Fields.toParentId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.toParentId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The id of previous workflow state of the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.fromStateId` |
* | **Nullability** | Optional |
*/
fromStateId?: $Fields.fromStateId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.fromStateId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The id of new workflow state of the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.toStateId` |
* | **Nullability** | Optional |
*/
toStateId?: $Fields.toStateId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.toStateId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The id of previous cycle of the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.fromCycleId` |
* | **Nullability** | Optional |
*/
fromCycleId?: $Fields.fromCycleId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.fromCycleId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The id of new cycle of the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.toCycleId` |
* | **Nullability** | Optional |
*/
toCycleId?: $Fields.toCycleId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.toCycleId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The id of new project created from the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.toConvertedProjectId` |
* | **Nullability** | Optional |
*/
toConvertedProjectId?: $Fields.toConvertedProjectId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.toConvertedProjectId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The id of previous project of the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.fromProjectId` |
* | **Nullability** | Optional |
*/
fromProjectId?: $Fields.fromProjectId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.fromProjectId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The id of new project of the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.toProjectId` |
* | **Nullability** | Optional |
*/
toProjectId?: $Fields.toProjectId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.toProjectId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* What the estimate was changed from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.fromEstimate` |
* | **Nullability** | Optional |
*/
fromEstimate?: $Fields.fromEstimate.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.fromEstimate<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* What the estimate was changed to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.toEstimate` |
* | **Nullability** | Optional |
*/
toEstimate?: $Fields.toEstimate.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.toEstimate<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether the issue is archived at the time of this history entry.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.archived` |
* | **Nullability** | Optional |
*/
archived?: $Fields.archived.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.archived<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether the issue was trashed or un-trashed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.trashed` |
* | **Nullability** | Optional |
*/
trashed?: $Fields.trashed.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.trashed<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The id of linked attachment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.attachmentId` |
* | **Nullability** | Optional |
*/
attachmentId?: $Fields.attachmentId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.attachmentId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* ID's of labels that were added.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.addedLabelIds` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
addedLabelIds?: $Fields.addedLabelIds.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.addedLabelIds<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* ID's of labels that were removed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.removedLabelIds` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
removedLabelIds?: $Fields.removedLabelIds.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.removedLabelIds<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [ALPHA] ID's of releases that the issue was added to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.addedToReleaseIds` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
addedToReleaseIds?: $Fields.addedToReleaseIds.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.addedToReleaseIds<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [ALPHA] ID's of releases that the issue was removed from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.removedFromReleaseIds` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
removedFromReleaseIds?: $Fields.removedFromReleaseIds.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.removedFromReleaseIds<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Changed issue relationships.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueRelationHistoryPayload}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.relationChanges` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
relationChanges?: $Fields.relationChanges.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.relationChanges<_$Context>>
/**
* Whether the issue was auto-closed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.autoClosed` |
* | **Nullability** | Optional |
*/
autoClosed?: $Fields.autoClosed.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.autoClosed<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether the issue was auto-archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.autoArchived` |
* | **Nullability** | Optional |
*/
autoArchived?: $Fields.autoArchived.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.autoArchived<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* What the due date was changed from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TimelessDate} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.fromDueDate` |
* | **Nullability** | Optional |
*/
fromDueDate?: $Fields.fromDueDate.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.fromDueDate<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* What the due date was changed to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TimelessDate} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.toDueDate` |
* | **Nullability** | Optional |
*/
toDueDate?: $Fields.toDueDate.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.toDueDate<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The id of linked customer need.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.customerNeedId` |
* | **Nullability** | Optional |
*/
customerNeedId?: $Fields.customerNeedId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerNeedId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] Serialized JSON representing changes for certain non-relational properties.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.changes` |
* | **Nullability** | Optional |
*/
changes?: $Fields.changes.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.changes<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The actor that performed the actions. This field may be empty in the case of integrations or automations.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.actor` |
* | **Nullability** | Optional |
*/
actor?: $Fields.actor.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.actor<_$Context>>
/**
* The actors that performed the actions. This field may be empty in the case of integrations or automations.
*
* @deprecated Use `actor` and `descriptionUpdatedBy` instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$User}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.actors` |
* | **⚠ Deprecated** | Use `actor` and `descriptionUpdatedBy` instead. |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
actors?: $Fields.actors.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.actors<_$Context>>
/**
* The actors that edited the description of the issue, if any.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$User}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.descriptionUpdatedBy` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
descriptionUpdatedBy?: $Fields.descriptionUpdatedBy.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.descriptionUpdatedBy<_$Context>>
/**
* The user that was unassigned from the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.fromAssignee` |
* | **Nullability** | Optional |
*/
fromAssignee?: $Fields.fromAssignee.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.fromAssignee<_$Context>>
/**
* The user that was assigned to the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.toAssignee` |
* | **Nullability** | Optional |
*/
toAssignee?: $Fields.toAssignee.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.toAssignee<_$Context>>
/**
* The cycle that the issue was moved from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Cycle} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.fromCycle` |
* | **Nullability** | Optional |
*/
fromCycle?: $Fields.fromCycle.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.fromCycle<_$Context>>
/**
* The cycle that the issue was moved to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Cycle} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.toCycle` |
* | **Nullability** | Optional |
*/
toCycle?: $Fields.toCycle.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.toCycle<_$Context>>
/**
* The new project created from the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Project} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.toConvertedProject` |
* | **Nullability** | Optional |
*/
toConvertedProject?: $Fields.toConvertedProject.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.toConvertedProject<_$Context>>
/**
* The app user from whom the issue delegation was transferred.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.fromDelegate` |
* | **Nullability** | Optional |
*/
fromDelegate?: $Fields.fromDelegate.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.fromDelegate<_$Context>>
/**
* The app user to whom the issue delegation was transferred.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.toDelegate` |
* | **Nullability** | Optional |
*/
toDelegate?: $Fields.toDelegate.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.toDelegate<_$Context>>
/**
* The project that the issue was moved from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Project} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.fromProject` |
* | **Nullability** | Optional |
*/
fromProject?: $Fields.fromProject.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.fromProject<_$Context>>
/**
* The project that the issue was moved to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Project} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.toProject` |
* | **Nullability** | Optional |
*/
toProject?: $Fields.toProject.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.toProject<_$Context>>
/**
* The state that the issue was moved from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$WorkflowState} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.fromState` |
* | **Nullability** | Optional |
*/
fromState?: $Fields.fromState.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.fromState<_$Context>>
/**
* The state that the issue was moved to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$WorkflowState} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.toState` |
* | **Nullability** | Optional |
*/
toState?: $Fields.toState.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.toState<_$Context>>
/**
* The team that the issue was moved from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Team} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.fromTeam` |
* | **Nullability** | Optional |
*/
fromTeam?: $Fields.fromTeam.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.fromTeam<_$Context>>
/**
* The team that the issue was moved to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Team} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.toTeam` |
* | **Nullability** | Optional |
*/
toTeam?: $Fields.toTeam.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.toTeam<_$Context>>
/**
* The parent issue that the issue was moved from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Issue} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.fromParent` |
* | **Nullability** | Optional |
*/
fromParent?: $Fields.fromParent.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.fromParent<_$Context>>
/**
* The parent issue that the issue was moved to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Issue} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.toParent` |
* | **Nullability** | Optional |
*/
toParent?: $Fields.toParent.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.toParent<_$Context>>
/**
* The linked attachment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Attachment} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.attachment` |
* | **Nullability** | Optional |
*/
attachment?: $Fields.attachment.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.attachment<_$Context>>
/**
* The import record.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueImport} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.issueImport` |
* | **Nullability** | Optional |
*/
issueImport?: $Fields.issueImport.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueImport<_$Context>>
/**
* The users that were notified of the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$User}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.triageResponsibilityNotifiedUsers` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
triageResponsibilityNotifiedUsers?: $Fields.triageResponsibilityNotifiedUsers.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.triageResponsibilityNotifiedUsers<_$Context>>
/**
* Boolean indicating if the issue was auto-assigned using the triage responsibility feature.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.triageResponsibilityAutoAssigned` |
* | **Nullability** | Optional |
*/
triageResponsibilityAutoAssigned?: $Fields.triageResponsibilityAutoAssigned.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.triageResponsibilityAutoAssigned<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The bot that performed the action.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ActorBot} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.botActor` |
* | **Nullability** | Optional |
*/
botActor?: $Fields.botActor.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.botActor<_$Context>>
/**
* The labels that were added to the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueLabel}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.addedLabels` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
addedLabels?: $Fields.addedLabels.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.addedLabels<_$Context>>
/**
* The labels that were removed from the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueLabel}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.removedLabels` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
removedLabels?: $Fields.removedLabels.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.removedLabels<_$Context>>
/**
* The releases that the issue was added to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Release}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.addedToReleases` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
addedToReleases?: $Fields.addedToReleases.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.addedToReleases<_$Context>>
/**
* The releases that the issue was removed from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Release}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.removedFromReleases` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
removedFromReleases?: $Fields.removedFromReleases.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.removedFromReleases<_$Context>>
/**
* [INTERNAL] Metadata about the triage rule that made changes to the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueHistoryTriageRuleMetadata} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistory} |
* | **Path** | `IssueHistory.triageRuleMetadata` |
* | **Nullability** | Optional |
*/
triageRuleMetadata?: $Fields.triageRuleMetadata.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.triageRuleMetadata<_$Context>>
      
      /**
* Inline fragments for field groups.
*
* Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
* selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments}
*/
___?: $FragmentInline<_$Context> | $FragmentInline<_$Context>[]
      /**
* A meta field. Is the name of the type being selected.
*
* @see {@link https://graphql.org/learn/queries/#meta-fields | Meta Fields}
*/
__typename?: GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
    
}