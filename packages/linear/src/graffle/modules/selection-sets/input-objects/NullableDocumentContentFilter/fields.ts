import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type id<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IDComparator<_$Context> | null | undefined>

export type createdAt<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DateComparator<_$Context> | null | undefined>

export type updatedAt<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DateComparator<_$Context> | null | undefined>

export type content<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableStringComparator<_$Context> | null | undefined>

export type project<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectFilter<_$Context> | null | undefined>

export type document<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DocumentFilter<_$Context> | null | undefined>

type $null<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Boolean<_$Context>
export { type $null as null }

export type and<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableDocumentContentFilter<_$Context> | null | undefined>> | null | undefined>

export type or<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableDocumentContentFilter<_$Context> | null | undefined>> | null | undefined>
