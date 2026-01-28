import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as PushSubscriptionCreateInput from './fields.js'

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
export interface PushSubscriptionCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The user identifier of the subscription.
*
* @deprecated Not needed anymore.
*/
userId?: $Scalars.String<_$Context>,
/**
* The data of the subscription in stringified JSON format.
*/
data: $Scalars.String$NonNull<_$Context>,
/**
* Whether this is a subscription payload for Google Cloud Messaging or Apple Push Notification service.
*/
$type?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PushSubscriptionType | null | undefined>
}