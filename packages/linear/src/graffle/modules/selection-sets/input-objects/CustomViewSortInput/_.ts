import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as CustomViewSortInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface CustomViewSortInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Sort by custom view name.
*/
name?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomViewNameSort<_$Context> | null | undefined>,
/**
* Sort by custom view creation date.
*/
createdAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomViewCreatedAtSort<_$Context> | null | undefined>,
/**
* Sort by custom view shared status.
*/
shared?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomViewSharedSort<_$Context> | null | undefined>,
/**
* Sort by custom view update date.
*/
updatedAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomViewUpdatedAtSort<_$Context> | null | undefined>
}