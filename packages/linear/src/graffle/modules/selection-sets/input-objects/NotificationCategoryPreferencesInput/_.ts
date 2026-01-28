import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as NotificationCategoryPreferencesInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 14 |
* | **All Fields Nullable** | Yes |
*/
export interface NotificationCategoryPreferencesInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The preferences for notifications about assignments.
*/
assignments?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PartialNotificationChannelPreferencesInput<_$Context> | null | undefined>,
/**
* The preferences for notifications about status changes.
*/
statusChanges?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PartialNotificationChannelPreferencesInput<_$Context> | null | undefined>,
/**
* The preferences for notifications about comments and replies.
*/
commentsAndReplies?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PartialNotificationChannelPreferencesInput<_$Context> | null | undefined>,
/**
* The preferences for notifications about mentions.
*/
mentions?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PartialNotificationChannelPreferencesInput<_$Context> | null | undefined>,
/**
* The preferences for notifications about reactions.
*/
reactions?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PartialNotificationChannelPreferencesInput<_$Context> | null | undefined>,
/**
* The preferences for notifications about subscriptions.
*/
subscriptions?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PartialNotificationChannelPreferencesInput<_$Context> | null | undefined>,
/**
* The preferences for notifications about document changes.
*/
documentChanges?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PartialNotificationChannelPreferencesInput<_$Context> | null | undefined>,
/**
* The preferences for notifications about posts and updates.
*/
postsAndUpdates?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PartialNotificationChannelPreferencesInput<_$Context> | null | undefined>,
/**
* The preferences for notifications about reminders.
*/
reminders?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PartialNotificationChannelPreferencesInput<_$Context> | null | undefined>,
/**
* The preferences for notifications about reviews.
*/
reviews?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PartialNotificationChannelPreferencesInput<_$Context> | null | undefined>,
/**
* The preferences for notifications about apps and integrations.
*/
appsAndIntegrations?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PartialNotificationChannelPreferencesInput<_$Context> | null | undefined>,
/**
* The preferences for notifications about triage.
*/
triage?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PartialNotificationChannelPreferencesInput<_$Context> | null | undefined>,
/**
* The preferences for notifications about customers.
*/
customers?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PartialNotificationChannelPreferencesInput<_$Context> | null | undefined>,
/**
* The preferences for notifications about feed summaries.
*/
feed?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PartialNotificationChannelPreferencesInput<_$Context> | null | undefined>
}