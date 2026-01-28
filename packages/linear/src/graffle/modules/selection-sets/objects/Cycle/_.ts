import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type * as $Fields from './fields.js'
import type { $DefaultSelectionContext } from '../../_context.js'
import type { $FragmentInline } from './fragment.js'

export type * as Cycle from './__.js'

/**
* Selection set for {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A set of issues to be resolved in a specified amount of time.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 30 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface Cycle<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.ObjectLike {

      /**
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.id` |
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
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.createdAt` |
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
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.updatedAt` |
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
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.archivedAt` |
* | **Nullability** | Optional |
*/
archivedAt?: $Fields.archivedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.archivedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The number of the cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.number` |
* | **Nullability** | Required |
*/
number?: $Fields.number.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.number<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The custom name of the cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.name` |
* | **Nullability** | Optional |
*/
name?: $Fields.name.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.name<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The cycle's description.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.description` |
* | **Nullability** | Optional |
*/
description?: $Fields.description.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.description<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The start time of the cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.startsAt` |
* | **Nullability** | Required |
*/
startsAt?: $Fields.startsAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.startsAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The end time of the cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.endsAt` |
* | **Nullability** | Required |
*/
endsAt?: $Fields.endsAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.endsAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The completion time of the cycle. If null, the cycle hasn't been completed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.completedAt` |
* | **Nullability** | Optional |
*/
completedAt?: $Fields.completedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.completedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The time at which the cycle was automatically archived by the auto pruning process.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.autoArchivedAt` |
* | **Nullability** | Optional |
*/
autoArchivedAt?: $Fields.autoArchivedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.autoArchivedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The total number of issues in the cycle after each day.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.issueCountHistory` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
issueCountHistory?: $Fields.issueCountHistory.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueCountHistory<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The number of completed issues in the cycle after each day.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.completedIssueCountHistory` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
completedIssueCountHistory?: $Fields.completedIssueCountHistory.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.completedIssueCountHistory<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The total number of estimation points after each day.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.scopeHistory` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
scopeHistory?: $Fields.scopeHistory.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.scopeHistory<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The number of completed estimation points after each day.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.completedScopeHistory` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
completedScopeHistory?: $Fields.completedScopeHistory.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.completedScopeHistory<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The number of in progress estimation points after each day.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.inProgressScopeHistory` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
inProgressScopeHistory?: $Fields.inProgressScopeHistory.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.inProgressScopeHistory<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The team that the cycle is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Team}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.team` |
* | **Nullability** | Required |
*/
team?: $Fields.team.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.team<_$Context>>
/**
* [Internal] The progress history of the cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.progressHistory` |
* | **Nullability** | Required |
*/
progressHistory?: $Fields.progressHistory.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.progressHistory<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] The current progress of the cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.currentProgress` |
* | **Nullability** | Required |
*/
currentProgress?: $Fields.currentProgress.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.currentProgress<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The cycle inherited from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Cycle} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.inheritedFrom` |
* | **Nullability** | Optional |
*/
inheritedFrom?: $Fields.inheritedFrom.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.inheritedFrom<_$Context>>
/**
* Whether the cycle is currently active.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.isActive` |
* | **Nullability** | Required |
*/
isActive?: $Fields.isActive.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.isActive<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether the cycle is in the future.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.isFuture` |
* | **Nullability** | Required |
*/
isFuture?: $Fields.isFuture.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.isFuture<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether the cycle is in the past.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.isPast` |
* | **Nullability** | Required |
*/
isPast?: $Fields.isPast.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.isPast<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Issues associated with the cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.issues` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
issues?: $Fields.issues.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issues<_$Context>>
/**
* Issues that weren't completed when the cycle was closed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.uncompletedIssuesUponClose` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
uncompletedIssuesUponClose?: $Fields.uncompletedIssuesUponClose.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.uncompletedIssuesUponClose<_$Context>>
/**
* The overall progress of the cycle. This is the (completed estimate points + 0.25 * in progress estimate points) / total estimate points.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.progress` |
* | **Nullability** | Required |
*/
progress?: $Fields.progress.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.progress<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether the cycle is the next cycle for the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.isNext` |
* | **Nullability** | Required |
*/
isNext?: $Fields.isNext.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.isNext<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether the cycle is the previous cycle for the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.isPrevious` |
* | **Nullability** | Required |
*/
isPrevious?: $Fields.isPrevious.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.isPrevious<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] Documents associated with the cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DocumentConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.documents` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
documents?: $Fields.documents.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.documents<_$Context>>
/**
* [Internal] Links associated with the cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$EntityExternalLinkConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Cycle} |
* | **Path** | `Cycle.links` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
links?: $Fields.links.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.links<_$Context>>
      
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