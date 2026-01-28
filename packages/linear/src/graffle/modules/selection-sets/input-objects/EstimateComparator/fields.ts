import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type eq<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Float<_$Context>

export type neq<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Float<_$Context>

type $in<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.Float<_$Context>> | null | undefined>
export { type $in as in }

export type nin<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.Float<_$Context>> | null | undefined>

type $null<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Boolean<_$Context>
export { type $null as null }

export type lt<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Float<_$Context>

export type lte<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Float<_$Context>

export type gt<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Float<_$Context>

export type gte<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Float<_$Context>

export type or<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableNumberComparator<_$Context> | null | undefined>> | null | undefined>

export type and<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableNumberComparator<_$Context> | null | undefined>> | null | undefined>
