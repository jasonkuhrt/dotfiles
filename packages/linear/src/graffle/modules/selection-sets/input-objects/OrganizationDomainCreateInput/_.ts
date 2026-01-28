import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as OrganizationDomainCreateInput from './fields.js'

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
export interface OrganizationDomainCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The identity provider to which to add the domain.
*/
identityProviderId?: $Scalars.String<_$Context>,
/**
* The domain name to add.
*/
name: $Scalars.String$NonNull<_$Context>,
/**
* The email address to which to send the verification code.
*/
verificationEmail?: $Scalars.String<_$Context>,
/**
* The authentication type this domain is for.
*/
authType?: $Scalars.String<_$Context>
}