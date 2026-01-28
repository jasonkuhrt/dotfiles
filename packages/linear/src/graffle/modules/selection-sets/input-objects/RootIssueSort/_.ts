import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as RootIssueSort from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Issue root-issue sorting options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | Yes |
*/
export interface RootIssueSort<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Whether nulls should be sorted first or last
*/
$nulls?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationNulls | null | undefined>,
/**
* The order for the individual sort
*/
$order?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationSortOrder | null | undefined>,
/**
* The sort to apply to the root issues
*/
sort: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueSortInput<_$Context>>
}