import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as NotificationEntityInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Describes the type and id of the entity to target for notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 7 |
* | **All Fields Nullable** | Yes |
*/
export interface NotificationEntityInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The id of the issue related to the notification.
*/
issueId?: $Scalars.String<_$Context>,
/**
* [DEPRECATED] The id of the project related to the notification.
*/
projectId?: $Scalars.String<_$Context>,
/**
* The id of the initiative related to the notification.
*/
initiativeId?: $Scalars.String<_$Context>,
/**
* The id of the project update related to the notification.
*/
projectUpdateId?: $Scalars.String<_$Context>,
/**
* The id of the initiative update related to the notification.
*/
initiativeUpdateId?: $Scalars.String<_$Context>,
/**
* The id of the OAuth client approval related to the notification.
*/
oauthClientApprovalId?: $Scalars.String<_$Context>,
/**
* The id of the notification.
*/
id?: $Scalars.String<_$Context>
}