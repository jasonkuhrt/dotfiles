import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type name<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserNameSort<_$Context> | null | undefined>

export type displayName<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserDisplayNameSort<_$Context> | null | undefined>
