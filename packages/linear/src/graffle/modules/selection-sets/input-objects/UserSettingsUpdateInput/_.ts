import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as UserSettingsUpdateInput from './fields.js'

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
export interface UserSettingsUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The user's settings.
*/
settings?: $Scalars.JSONObject<_$Context>,
/**
* The types of emails the user has unsubscribed from.
*
* @deprecated Use individual subscription fields instead. This field is now ignored.
*/
unsubscribedFrom?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>,
/**
* Whether this user is subscribed to changelog email or not.
*/
subscribedToChangelog?: $Scalars.Boolean<_$Context>,
/**
* Whether this user is subscribed to DPA emails or not.
*/
subscribedToDPA?: $Scalars.Boolean<_$Context>,
/**
* Whether this user is subscribed to invite accepted emails or not.
*/
subscribedToInviteAccepted?: $Scalars.Boolean<_$Context>,
/**
* Whether this user is subscribed to privacy and legal update emails or not.
*/
subscribedToPrivacyLegalUpdates?: $Scalars.Boolean<_$Context>,
/**
* Whether this user is subscribed to general marketing communications or not.
*/
subscribedToGeneralMarketingCommunications?: $Scalars.Boolean<_$Context>,
/**
* The user's notification category preferences.
*/
notificationCategoryPreferences?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NotificationCategoryPreferencesInput<_$Context> | null | undefined>,
/**
* The user's notification channel preferences.
*/
notificationChannelPreferences?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PartialNotificationChannelPreferencesInput<_$Context> | null | undefined>,
/**
* The user's notification delivery preferences.
*/
notificationDeliveryPreferences?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NotificationDeliveryPreferencesInput<_$Context> | null | undefined>,
/**
* [Internal] The user's usage warning history.
*/
usageWarningHistory?: $Scalars.JSONObject<_$Context>,
/**
* [Internal] How often to generate a feed summary.
*/
$feedSummarySchedule?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.FeedSummarySchedule | null | undefined>,
/**
* [Internal] The user's last seen time for the pulse feed.
*/
feedLastSeenTime?: $Scalars.DateTime<_$Context>
}