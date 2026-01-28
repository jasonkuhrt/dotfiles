import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as UserSortInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* User sorting options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | Yes |
*/
export interface UserSortInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Sort by user name
*/
name?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserNameSort<_$Context> | null | undefined>,
/**
* Sort by user display name
*/
displayName?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserDisplayNameSort<_$Context> | null | undefined>
}