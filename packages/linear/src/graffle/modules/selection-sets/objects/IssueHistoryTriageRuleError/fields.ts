import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type type<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator
| GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort
| GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
| type.$SelectionSet<_$Context>

export namespace type {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base {
}

/**
* This is the "expanded" version of the `type` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator
| GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort
| GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
| $SelectionSet<_$Context>>
}


export type property<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator
| GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort
| GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
| property.$SelectionSet<_$Context>

export namespace property {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base {
}

/**
* This is the "expanded" version of the `property` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator
| GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort
| GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
| $SelectionSet<_$Context>>
}


export type conflictForSameChildLabel<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator
| GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort
| GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
| conflictForSameChildLabel.$SelectionSet<_$Context>

export namespace conflictForSameChildLabel {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base {
}

/**
* This is the "expanded" version of the `conflictForSameChildLabel` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator
| GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort
| GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
| $SelectionSet<_$Context>>
}


export type fromTeam<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = fromTeam.$SelectionSet<_$Context>

export namespace fromTeam {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Team<_$Context> {
}

/**
* This is the "expanded" version of the `fromTeam` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type toTeam<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = toTeam.$SelectionSet<_$Context>

export namespace toTeam {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Team<_$Context> {
}

/**
* This is the "expanded" version of the `toTeam` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type conflictingLabels<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = conflictingLabels.$SelectionSet<_$Context>

export namespace conflictingLabels {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueLabel<_$Context> {
}

/**
* This is the "expanded" version of the `conflictingLabels` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}

