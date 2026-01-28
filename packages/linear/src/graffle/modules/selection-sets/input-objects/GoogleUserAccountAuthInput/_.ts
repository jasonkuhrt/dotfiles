import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as GoogleUserAccountAuthInput from './fields.js'

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
export interface GoogleUserAccountAuthInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Code returned from Google's OAuth flow.
*/
code: $Scalars.String$NonNull<_$Context>,
/**
* The URI to redirect the user to.
*/
redirectUri?: $Scalars.String<_$Context>,
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
* Signup code.
*
* @deprecated Not used anymore
*/
signupCode?: $Scalars.String<_$Context>,
/**
* An optional invite link for an organization used to populate available organizations.
*/
inviteLink?: $Scalars.String<_$Context>,
/**
* An optional parameter to disable new user signup and force login. Default: false.
*/
disallowSignup?: $Scalars.Boolean<_$Context>
}