import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as CycleSort from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Issue cycle sorting options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | Yes |
*/
export interface CycleSort<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Whether nulls should be sorted first or last
*/
$nulls?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationNulls | null | undefined>,
/**
* The order for the individual sort
*/
$order?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationSortOrder | null | undefined>,
/**
* When set to true, cycles will be ordered with a custom order. Current cycle comes first, followed by upcoming cycles in ASC order, followed by previous cycles in DESC order.
*/
currentCycleFirst?: $Scalars.Boolean<_$Context>
}