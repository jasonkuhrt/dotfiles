import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as NotificationUpdateInput from './fields.js'

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
export interface NotificationUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The time when notification was marked as read.
*/
readAt?: $Scalars.DateTime<_$Context>,
/**
* The time until a notification will be snoozed. After that it will appear in the inbox again.
*/
snoozedUntilAt?: $Scalars.DateTime<_$Context>,
/**
* The id of the project update related to the notification.
*/
projectUpdateId?: $Scalars.String<_$Context>,
/**
* The id of the project update related to the notification.
*/
initiativeUpdateId?: $Scalars.String<_$Context>
}