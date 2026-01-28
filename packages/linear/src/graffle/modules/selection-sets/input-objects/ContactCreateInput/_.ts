import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as ContactCreateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 7 |
* | **All Fields Nullable** | Yes |
*/
export interface ContactCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The type of support contact.
*/
type: $Scalars.String$NonNull<_$Context>,
/**
* The message the user sent.
*/
message: $Scalars.String$NonNull<_$Context>,
/**
* User's operating system.
*/
operatingSystem?: $Scalars.String<_$Context>,
/**
* User's browser information.
*/
browser?: $Scalars.String<_$Context>,
/**
* User's device information.
*/
device?: $Scalars.String<_$Context>,
/**
* User's Linear client information.
*/
clientVersion?: $Scalars.String<_$Context>,
/**
* How disappointed the user would be if they could no longer use Linear.
*/
disappointmentRating?: $Scalars.Int<_$Context>
}