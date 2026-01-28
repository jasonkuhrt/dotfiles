import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as CustomerSortInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Customer sorting options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 8 |
* | **All Fields Nullable** | Yes |
*/
export interface CustomerSortInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Sort by name
*/
name?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NameSort<_$Context> | null | undefined>,
/**
* Sort by customer creation date
*/
createdAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerCreatedAtSort<_$Context> | null | undefined>,
/**
* Sort by owner name
*/
owner?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.OwnerSort<_$Context> | null | undefined>,
/**
* Sort by customer status
*/
status?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerStatusSort<_$Context> | null | undefined>,
/**
* Sort by customer generated revenue
*/
revenue?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RevenueSort<_$Context> | null | undefined>,
/**
* Sort by customer size
*/
size?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SizeSort<_$Context> | null | undefined>,
/**
* Sort by customer tier
*/
tier?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TierSort<_$Context> | null | undefined>,
/**
* Sort by approximate customer need count
*/
approximateNeedCount?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ApproximateNeedCountSort<_$Context> | null | undefined>
}