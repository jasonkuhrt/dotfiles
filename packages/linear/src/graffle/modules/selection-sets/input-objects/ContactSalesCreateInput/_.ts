import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as ContactSalesCreateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* [INTERNAL] Input for sending a message to the Linear Sales team.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 6 |
* | **All Fields Nullable** | Yes |
*/
export interface ContactSalesCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Name of the person requesting information.
*/
name: $Scalars.String$NonNull<_$Context>,
/**
* Work email of the person requesting information.
*/
email: $Scalars.String$NonNull<_$Context>,
/**
* Size of the company.
*/
companySize?: $Scalars.String<_$Context>,
/**
* The message the user sent.
*/
message?: $Scalars.String<_$Context>,
/**
* The URL this request was sent from.
*/
url?: $Scalars.String<_$Context>,
/**
* PostHog distinct ID for analytics correlation.
*/
distinctId?: $Scalars.String<_$Context>
}