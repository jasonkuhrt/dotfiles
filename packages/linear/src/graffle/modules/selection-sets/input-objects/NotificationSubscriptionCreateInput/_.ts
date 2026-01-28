import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as NotificationSubscriptionCreateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 13 |
* | **All Fields Nullable** | Yes |
*/
export interface NotificationSubscriptionCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The identifier of the customer to subscribe to.
*/
customerId?: $Scalars.String<_$Context>,
/**
* The identifier of the custom view to subscribe to.
*/
customViewId?: $Scalars.String<_$Context>,
/**
* The identifier of the cycle to subscribe to.
*/
cycleId?: $Scalars.String<_$Context>,
/**
* The identifier of the initiative to subscribe to.
*/
initiativeId?: $Scalars.String<_$Context>,
/**
* The identifier of the label to subscribe to.
*/
labelId?: $Scalars.String<_$Context>,
/**
* The identifier of the project to subscribe to.
*/
projectId?: $Scalars.String<_$Context>,
/**
* The identifier of the team to subscribe to.
*/
teamId?: $Scalars.String<_$Context>,
/**
* The identifier of the user to subscribe to.
*/
userId?: $Scalars.String<_$Context>,
/**
* The type of view to which the notification subscription context is associated with.
*/
$contextViewType?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ContextViewType | null | undefined>,
/**
* The type of user view to which the notification subscription context is associated with.
*/
$userContextViewType?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserContextViewType | null | undefined>,
/**
* The types of notifications of the subscription.
*/
notificationSubscriptionTypes?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>,
/**
* Whether the subscription is active.
*/
active?: $Scalars.Boolean<_$Context>
}