import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as EmailUnsubscribeInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | No |
*/
export interface EmailUnsubscribeInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Email type to unsubscribe from.
*/
type: $Scalars.String$NonNull<_$Context>,
/**
* The user's email validation token.
*/
token: $Scalars.String$NonNull<_$Context>,
/**
* The identifier of the user.
*/
userId: $Scalars.String$NonNull<_$Context>
}