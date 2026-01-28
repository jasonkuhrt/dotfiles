import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type * as $Fields from './fields.js'
import type { $DefaultSelectionContext } from '../../_context.js'
import type { $FragmentInline } from './fragment.js'

export type * as ProjectMilestoneMovePayload from './__.js'

/**
* Selection set for {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 5 |
*/
export interface ProjectMilestoneMovePayload<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.ObjectLike {

      /**
* The identifier of the last sync operation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectMilestoneMovePayload} |
* | **Path** | `ProjectMilestoneMovePayload.lastSyncId` |
* | **Nullability** | Required |
*/
lastSyncId?: $Fields.lastSyncId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.lastSyncId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The project milestone that was created or updated.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectMilestone}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectMilestoneMovePayload} |
* | **Path** | `ProjectMilestoneMovePayload.projectMilestone` |
* | **Nullability** | Required |
*/
projectMilestone?: $Fields.projectMilestone.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectMilestone<_$Context>>
/**
* Whether the operation was successful.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectMilestoneMovePayload} |
* | **Path** | `ProjectMilestoneMovePayload.success` |
* | **Nullability** | Required |
*/
success?: $Fields.success.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.success<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* A snapshot of the issues that were moved to new teams, if the user selected to do it, containing an array of mappings between an issue and its previous team. Store on the client to use for undoing a previous milestone move.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectMilestoneMoveIssueToTeam}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectMilestoneMovePayload} |
* | **Path** | `ProjectMilestoneMovePayload.previousIssueTeamIds` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
previousIssueTeamIds?: $Fields.previousIssueTeamIds.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.previousIssueTeamIds<_$Context>>
/**
* A snapshot of the project that had new teams added to it, if the user selected to do it, containing an array of mappings between a project and its previous teams. Store on the client to use for undoing a previous milestone move.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectMilestoneMoveProjectTeams} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectMilestoneMovePayload} |
* | **Path** | `ProjectMilestoneMovePayload.previousProjectTeamIds` |
* | **Nullability** | Optional |
*/
previousProjectTeamIds?: $Fields.previousProjectTeamIds.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.previousProjectTeamIds<_$Context>>
      
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