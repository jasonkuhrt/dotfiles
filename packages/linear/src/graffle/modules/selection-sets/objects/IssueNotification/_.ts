import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type * as $Fields from './fields.js'
import type { $DefaultSelectionContext } from '../../_context.js'
import type { $FragmentInline } from './fragment.js'

export type * as IssueNotification from './__.js'

/**
* Selection set for {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* An issue related notification.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 36 |
* | **Implements** | {@link $Schema.Notification}, {@link $Schema.Entity}, {@link $Schema.Node} |
*/
export interface IssueNotification<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.ObjectLike {

      /**
* Related comment ID. Null if the notification is not related to a comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.commentId` |
* | **Nullability** | Optional |
*/
commentId?: $Fields.commentId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.commentId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Related parent comment ID. Null if the notification is not related to a comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.parentCommentId` |
* | **Nullability** | Optional |
*/
parentCommentId?: $Fields.parentCommentId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.parentCommentId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Name of the reaction emoji related to the notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.reactionEmoji` |
* | **Nullability** | Optional |
*/
reactionEmoji?: $Fields.reactionEmoji.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.reactionEmoji<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.id` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.createdAt` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.updatedAt` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.archivedAt` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.type` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.actor` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.externalUserActor` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.user` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.readAt` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.emailedAt` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.snoozedUntilAt` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.unsnoozedAt` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.category` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.url` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.inboxUrl` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.title` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.subtitle` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.isLinearActor` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.actorAvatarUrl` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.actorInitials` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.actorAvatarColor` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.issueStatusType` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.projectUpdateHealth` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.initiativeUpdateHealth` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.groupingKey` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.groupingPriority` |
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
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.botActor` |
* | **Nullability** | Optional |
*/
botActor?: $Fields.botActor.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.botActor<_$Context>>
/**
* Related issue ID.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.issueId` |
* | **Nullability** | Required |
*/
issueId?: $Fields.issueId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The issue related to the notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Issue}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.issue` |
* | **Nullability** | Required |
*/
issue?: $Fields.issue.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issue<_$Context>>
/**
* The comment related to the notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Comment} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.comment` |
* | **Nullability** | Optional |
*/
comment?: $Fields.comment.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.comment<_$Context>>
/**
* The parent comment related to the notification, if a notification is a reply comment notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Comment} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.parentComment` |
* | **Nullability** | Optional |
*/
parentComment?: $Fields.parentComment.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.parentComment<_$Context>>
/**
* The team related to the issue notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Team}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.team` |
* | **Nullability** | Required |
*/
team?: $Fields.team.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.team<_$Context>>
/**
* The subscriptions related to the notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationSubscription}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface ↗} |
* | **Parent** | {@link $NamedTypes.$IssueNotification} |
* | **Path** | `IssueNotification.subscriptions` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
subscriptions?: $Fields.subscriptions.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.subscriptions<_$Context>>
      
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