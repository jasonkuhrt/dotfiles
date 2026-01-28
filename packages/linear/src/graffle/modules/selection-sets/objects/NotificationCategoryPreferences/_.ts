import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type * as $Fields from './fields.js'
import type { $DefaultSelectionContext } from '../../_context.js'
import type { $FragmentInline } from './fragment.js'

export type * as NotificationCategoryPreferences from './__.js'

/**
* Selection set for {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A user's notification category preferences.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 15 |
*/
export interface NotificationCategoryPreferences<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.ObjectLike {

      /**
* The preferences for notifications about assignments.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.assignments` |
* | **Nullability** | Required |
*/
assignments?: $Fields.assignments.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.assignments<_$Context>>
/**
* The preferences for notifications about status changes.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.statusChanges` |
* | **Nullability** | Required |
*/
statusChanges?: $Fields.statusChanges.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.statusChanges<_$Context>>
/**
* The preferences for notifications about comments and replies.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.commentsAndReplies` |
* | **Nullability** | Required |
*/
commentsAndReplies?: $Fields.commentsAndReplies.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.commentsAndReplies<_$Context>>
/**
* The preferences for notifications about mentions.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.mentions` |
* | **Nullability** | Required |
*/
mentions?: $Fields.mentions.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.mentions<_$Context>>
/**
* The preferences for notifications about reactions.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.reactions` |
* | **Nullability** | Required |
*/
reactions?: $Fields.reactions.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.reactions<_$Context>>
/**
* The preferences for notifications about subscriptions.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.subscriptions` |
* | **Nullability** | Required |
*/
subscriptions?: $Fields.subscriptions.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.subscriptions<_$Context>>
/**
* The preferences for notifications about document changes.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.documentChanges` |
* | **Nullability** | Required |
*/
documentChanges?: $Fields.documentChanges.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.documentChanges<_$Context>>
/**
* The preferences for notifications about posts and updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.postsAndUpdates` |
* | **Nullability** | Required |
*/
postsAndUpdates?: $Fields.postsAndUpdates.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.postsAndUpdates<_$Context>>
/**
* The preferences for notifications about reminders.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.reminders` |
* | **Nullability** | Required |
*/
reminders?: $Fields.reminders.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.reminders<_$Context>>
/**
* The preferences for notifications about reviews.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.reviews` |
* | **Nullability** | Required |
*/
reviews?: $Fields.reviews.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.reviews<_$Context>>
/**
* The preferences for notifications about apps and integrations.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.appsAndIntegrations` |
* | **Nullability** | Required |
*/
appsAndIntegrations?: $Fields.appsAndIntegrations.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.appsAndIntegrations<_$Context>>
/**
* The preferences for system notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.system` |
* | **Nullability** | Required |
*/
system?: $Fields.system.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.system<_$Context>>
/**
* The preferences for triage notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.triage` |
* | **Nullability** | Required |
*/
triage?: $Fields.triage.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.triage<_$Context>>
/**
* The preferences for customer notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.customers` |
* | **Nullability** | Required |
*/
customers?: $Fields.customers.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customers<_$Context>>
/**
* The preferences for feed summary notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationChannelPreferences}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationCategoryPreferences} |
* | **Path** | `NotificationCategoryPreferences.feed` |
* | **Nullability** | Required |
*/
feed?: $Fields.feed.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.feed<_$Context>>
      
      /**
* Inline fragments for field groups.
*
* Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
* selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments}
*/
___?: $FragmentInline<_$Context> | $FragmentInline<_$Context>[]
      /**
* A meta field. Is the name of the type being selected.
*
* @see {@link https://graphql.org/learn/queries/#meta-fields | Meta Fields}
*/
__typename?: GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
    
}