import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as InitiativeSortInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Initiative sorting options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 8 |
* | **All Fields Nullable** | Yes |
*/
export interface InitiativeSortInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Sort by initiative name.
*/
name?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeNameSort<_$Context> | null | undefined>,
/**
* Sort by manual order.
*/
manual?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeManualSort<_$Context> | null | undefined>,
/**
* Sort by initiative update date.
*/
updatedAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeUpdatedAtSort<_$Context> | null | undefined>,
/**
* Sort by initiative creation date.
*/
createdAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeCreatedAtSort<_$Context> | null | undefined>,
/**
* Sort by initiative target date.
*/
targetDate?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeTargetDateSort<_$Context> | null | undefined>,
/**
* Sort by initiative health status.
*/
health?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeHealthSort<_$Context> | null | undefined>,
/**
* Sort by initiative health update date.
*/
healthUpdatedAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeHealthUpdatedAtSort<_$Context> | null | undefined>,
/**
* Sort by initiative owner name.
*/
owner?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeOwnerSort<_$Context> | null | undefined>
}