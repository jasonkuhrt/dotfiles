import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as TokenUserAccountAuthInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 5 |
* | **All Fields Nullable** | Yes |
*/
export interface TokenUserAccountAuthInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The email which to login via the magic login code.
*/
email: $Scalars.String$NonNull<_$Context>,
/**
* The magic login code.
*/
token: $Scalars.String$NonNull<_$Context>,
/**
* The timezone of the user's browser.
*/
timezone: $Scalars.String$NonNull<_$Context>,
/**
* The identifiers of the teams to auto-join.
*
* @deprecated Not used anymore
*/
teamIdsToJoin?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>,
/**
* An optional invite link for an organization.
*/
inviteLink?: $Scalars.String<_$Context>
}