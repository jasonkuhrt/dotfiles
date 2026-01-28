import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type triageRuleError<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = triageRuleError.$SelectionSet<_$Context>

export namespace triageRuleError {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueHistoryTriageRuleError<_$Context> {
}

/**
* This is the "expanded" version of the `triageRuleError` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type updatedByTriageRule<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = updatedByTriageRule.$SelectionSet<_$Context>

export namespace updatedByTriageRule {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.WorkflowDefinition<_$Context> {
}

/**
* This is the "expanded" version of the `updatedByTriageRule` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}

