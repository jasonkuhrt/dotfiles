import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as PartialNotificationChannelPreferencesInput from './fields.js'

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
export interface PartialNotificationChannelPreferencesInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Whether notifications are currently enabled for mobile.
*/
mobile?: $Scalars.Boolean<_$Context>,
/**
* Whether notifications are currently enabled for desktop.
*/
desktop?: $Scalars.Boolean<_$Context>,
/**
* Whether notifications are currently enabled for email.
*/
email?: $Scalars.Boolean<_$Context>,
/**
* Whether notifications are currently enabled for Slack.
*/
slack?: $Scalars.Boolean<_$Context>
}