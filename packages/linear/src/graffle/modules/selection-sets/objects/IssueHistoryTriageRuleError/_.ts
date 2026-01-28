import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type * as $Fields from './fields.js'
import type { $DefaultSelectionContext } from '../../_context.js'
import type { $FragmentInline } from './fragment.js'

export type * as IssueHistoryTriageRuleError from './__.js'

/**
* Selection set for {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* An error that occurred during triage rule execution.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 6 |
*/
export interface IssueHistoryTriageRuleError<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.ObjectLike {

      /**
* The type of error that occurred.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TriageRuleErrorType}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistoryTriageRuleError} |
* | **Path** | `IssueHistoryTriageRuleError.type` |
* | **Nullability** | Required |
*/
type?: $Fields.type.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.type<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The property that caused the error.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistoryTriageRuleError} |
* | **Path** | `IssueHistoryTriageRuleError.property` |
* | **Nullability** | Optional |
*/
property?: $Fields.property.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.property<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether the conflict was for the same child label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistoryTriageRuleError} |
* | **Path** | `IssueHistoryTriageRuleError.conflictForSameChildLabel` |
* | **Nullability** | Optional |
*/
conflictForSameChildLabel?: $Fields.conflictForSameChildLabel.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.conflictForSameChildLabel<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The team the issue was being moved from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Team} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistoryTriageRuleError} |
* | **Path** | `IssueHistoryTriageRuleError.fromTeam` |
* | **Nullability** | Optional |
*/
fromTeam?: $Fields.fromTeam.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.fromTeam<_$Context>>
/**
* The team the issue was being moved to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Team} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistoryTriageRuleError} |
* | **Path** | `IssueHistoryTriageRuleError.toTeam` |
* | **Nullability** | Optional |
*/
toTeam?: $Fields.toTeam.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.toTeam<_$Context>>
/**
* The conflicting labels.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueLabel}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueHistoryTriageRuleError} |
* | **Path** | `IssueHistoryTriageRuleError.conflictingLabels` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
conflictingLabels?: $Fields.conflictingLabels.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.conflictingLabels<_$Context>>
      
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