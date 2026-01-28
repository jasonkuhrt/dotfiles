import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type * as $Fields from './fields.js'
import type { $DefaultSelectionContext } from '../../_context.js'
import type { $FragmentInline } from './fragment.js'

export type * as OauthClientApprovalNotification from './__.js'

/**
* Selection set for {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* An oauth client approval related notification.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 29 |
* | **Implements** | {@link $Schema.Notification}, {@link $Schema.Entity}, {@link $Schema.Node} |
*/
export interface OauthClientApprovalNotification<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.ObjectLike {

      /**
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.id` |
* | **Nullability** | Required |
*/
id?: $Fields.id.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.id<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.createdAt` |
* | **Nullability** | Required |
*/
createdAt?: $Fields.createdAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.createdAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
* been updated after creation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.updatedAt` |
* | **Nullability** | Required |
*/
updatedAt?: $Fields.updatedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.updatedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.archivedAt` |
* | **Nullability** | Optional |
*/
archivedAt?: $Fields.archivedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.archivedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Notification type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.type` |
* | **Nullability** | Required |
*/
type?: $Fields.type.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.type<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The user that caused the notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.actor` |
* | **Nullability** | Optional |
*/
actor?: $Fields.actor.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.actor<_$Context>>
/**
* The external user that caused the notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ExternalUser} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.externalUserActor` |
* | **Nullability** | Optional |
*/
externalUserActor?: $Fields.externalUserActor.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.externalUserActor<_$Context>>
/**
* The user that received the notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$User}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.user` |
* | **Nullability** | Required |
*/
user?: $Fields.user.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.user<_$Context>>
/**
* The time at when the user marked the notification as read. Null, if the the user hasn't read the notification
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.readAt` |
* | **Nullability** | Optional |
*/
readAt?: $Fields.readAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.readAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The time at when an email reminder for this notification was sent to the user. Null, if no email
* reminder has been sent.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.emailedAt` |
* | **Nullability** | Optional |
*/
emailedAt?: $Fields.emailedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.emailedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The time until a notification will be snoozed. After that it will appear in the inbox again.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.snoozedUntilAt` |
* | **Nullability** | Optional |
*/
snoozedUntilAt?: $Fields.snoozedUntilAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.snoozedUntilAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The time at which a notification was unsnoozed..
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.unsnoozedAt` |
* | **Nullability** | Optional |
*/
unsnoozedAt?: $Fields.unsnoozedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.unsnoozedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The category of the notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationCategory}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.category` |
* | **Nullability** | Required |
*/
category?: $Fields.category.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.category<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] URL to the target of the notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.url` |
* | **Nullability** | Required |
*/
url?: $Fields.url.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.url<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] Inbox URL for the notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.inboxUrl` |
* | **Nullability** | Required |
*/
inboxUrl?: $Fields.inboxUrl.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.inboxUrl<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] Notification title.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.title` |
* | **Nullability** | Required |
*/
title?: $Fields.title.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.title<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] Notification subtitle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.subtitle` |
* | **Nullability** | Required |
*/
subtitle?: $Fields.subtitle.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.subtitle<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] If notification actor was Linear.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.isLinearActor` |
* | **Nullability** | Required |
*/
isLinearActor?: $Fields.isLinearActor.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.isLinearActor<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] Notification avatar URL.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.actorAvatarUrl` |
* | **Nullability** | Optional |
*/
actorAvatarUrl?: $Fields.actorAvatarUrl.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.actorAvatarUrl<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] Notification actor initials if avatar is not available.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.actorInitials` |
* | **Nullability** | Optional |
*/
actorInitials?: $Fields.actorInitials.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.actorInitials<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] Notification actor initials if avatar is not available.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.actorAvatarColor` |
* | **Nullability** | Required |
*/
actorAvatarColor?: $Fields.actorAvatarColor.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.actorAvatarColor<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] Issue's status type for issue notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.issueStatusType` |
* | **Nullability** | Optional |
*/
issueStatusType?: $Fields.issueStatusType.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueStatusType<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] Project update health for new updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.projectUpdateHealth` |
* | **Nullability** | Optional |
*/
projectUpdateHealth?: $Fields.projectUpdateHealth.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectUpdateHealth<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] Initiative update health for new updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.initiativeUpdateHealth` |
* | **Nullability** | Optional |
*/
initiativeUpdateHealth?: $Fields.initiativeUpdateHealth.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiativeUpdateHealth<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] Notifications with the same grouping key will be grouped together in the UI.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.groupingKey` |
* | **Nullability** | Required |
*/
groupingKey?: $Fields.groupingKey.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.groupingKey<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] Priority of the notification with the same grouping key. Higher number means higher priority. If priority is the same, notifications should be sorted by `createdAt`.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.groupingPriority` |
* | **Nullability** | Required |
*/
groupingPriority?: $Fields.groupingPriority.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.groupingPriority<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The bot that caused the notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ActorBot} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.botActor` |
* | **Nullability** | Optional |
*/
botActor?: $Fields.botActor.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.botActor<_$Context>>
/**
* Related OAuth client approval request ID.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.oauthClientApprovalId` |
* | **Nullability** | Required |
*/
oauthClientApprovalId?: $Fields.oauthClientApprovalId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.oauthClientApprovalId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The OAuth client approval request related to the notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$OauthClientApproval}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$OauthClientApprovalNotification} |
* | **Path** | `OauthClientApprovalNotification.oauthClientApproval` |
* | **Nullability** | Required |
*/
oauthClientApproval?: $Fields.oauthClientApproval.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.oauthClientApproval<_$Context>>
      
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