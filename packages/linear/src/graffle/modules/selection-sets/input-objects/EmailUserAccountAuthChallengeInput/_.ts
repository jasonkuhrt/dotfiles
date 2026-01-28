import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as EmailUserAccountAuthChallengeInput from './fields.js'

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
export interface EmailUserAccountAuthChallengeInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The email for which to generate the magic login code.
*/
email: $Scalars.String$NonNull<_$Context>,
/**
* Whether the login was requested from the desktop app.
*/
isDesktop?: $Scalars.Boolean<_$Context>,
/**
* Auth code for the client initiating the sequence.
*/
clientAuthCode?: $Scalars.String<_$Context>,
/**
* Signup code.
*
* @deprecated Not used anymore
*/
signupCode?: $Scalars.String<_$Context>,
/**
* The organization invite link to associate with this authentication.
*/
inviteLink?: $Scalars.String<_$Context>,
/**
* Whether to only return the login code. This is used by mobile apps to skip showing the login link.
*/
loginCodeOnly?: $Scalars.Boolean<_$Context>,
/**
* Response from the login challenge.
*/
challengeResponse?: $Scalars.String<_$Context>
}