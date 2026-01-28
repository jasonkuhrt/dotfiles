import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"PostNotification"`
*
* {@link https://graphql.org/learn/queries/#meta-fields | GraphQL __typename documentation}
*/
export interface __typename {
kind: "OutputField",
name: "__typename",
arguments: {},
inlineType: [1],
namedType: {
kind: "__typename",
value: "PostNotification"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* Related comment ID. Null if the notification is not related to a comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.commentId` |
* | **Nullability** | Optional |
*/
export interface commentId {
kind: "OutputField",
name: "commentId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* Related parent comment ID. Null if the notification is not related to a comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.parentCommentId` |
* | **Nullability** | Optional |
*/
export interface parentCommentId {
kind: "OutputField",
name: "parentCommentId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* Name of the reaction emoji related to the notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.reactionEmoji` |
* | **Nullability** | Optional |
*/
export interface reactionEmoji {
kind: "OutputField",
name: "reactionEmoji",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "OutputField",
name: "id",
arguments: {},
inlineType: [1, ],
namedType: $Schema.ID
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.createdAt` |
* | **Nullability** | Required |
*/
export interface createdAt {
kind: "OutputField",
name: "createdAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
* been updated after creation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.updatedAt` |
* | **Nullability** | Required |
*/
export interface updatedAt {
kind: "OutputField",
name: "updatedAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.archivedAt` |
* | **Nullability** | Optional |
*/
export interface archivedAt {
kind: "OutputField",
name: "archivedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* Notification type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.type` |
* | **Nullability** | Required |
*/
export interface type {
kind: "OutputField",
name: "type",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* The user that caused the notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.actor` |
* | **Nullability** | Optional |
*/
export interface actor {
kind: "OutputField",
name: "actor",
arguments: {},
inlineType: [0, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* The external user that caused the notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ExternalUser} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.externalUserActor` |
* | **Nullability** | Optional |
*/
export interface externalUserActor {
kind: "OutputField",
name: "externalUserActor",
arguments: {},
inlineType: [0, ],
namedType: $Schema.ExternalUser
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* The user that received the notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.user` |
* | **Nullability** | Required |
*/
export interface user {
kind: "OutputField",
name: "user",
arguments: {},
inlineType: [1, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* The time at when the user marked the notification as read. Null, if the the user hasn't read the notification
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.readAt` |
* | **Nullability** | Optional |
*/
export interface readAt {
kind: "OutputField",
name: "readAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* The time at when an email reminder for this notification was sent to the user. Null, if no email
* reminder has been sent.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.emailedAt` |
* | **Nullability** | Optional |
*/
export interface emailedAt {
kind: "OutputField",
name: "emailedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* The time until a notification will be snoozed. After that it will appear in the inbox again.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.snoozedUntilAt` |
* | **Nullability** | Optional |
*/
export interface snoozedUntilAt {
kind: "OutputField",
name: "snoozedUntilAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* The time at which a notification was unsnoozed..
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.unsnoozedAt` |
* | **Nullability** | Optional |
*/
export interface unsnoozedAt {
kind: "OutputField",
name: "unsnoozedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* The category of the notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationCategory}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.category` |
* | **Nullability** | Required |
*/
export interface category {
kind: "OutputField",
name: "category",
arguments: {},
inlineType: [1, ],
namedType: $Schema.NotificationCategory
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* [Internal] URL to the target of the notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.url` |
* | **Nullability** | Required |
*/
export interface url {
kind: "OutputField",
name: "url",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* [Internal] Inbox URL for the notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.inboxUrl` |
* | **Nullability** | Required |
*/
export interface inboxUrl {
kind: "OutputField",
name: "inboxUrl",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* [Internal] Notification title.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.title` |
* | **Nullability** | Required |
*/
export interface title {
kind: "OutputField",
name: "title",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* [Internal] Notification subtitle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.subtitle` |
* | **Nullability** | Required |
*/
export interface subtitle {
kind: "OutputField",
name: "subtitle",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* [Internal] If notification actor was Linear.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.isLinearActor` |
* | **Nullability** | Required |
*/
export interface isLinearActor {
kind: "OutputField",
name: "isLinearActor",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* [Internal] Notification avatar URL.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.actorAvatarUrl` |
* | **Nullability** | Optional |
*/
export interface actorAvatarUrl {
kind: "OutputField",
name: "actorAvatarUrl",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* [Internal] Notification actor initials if avatar is not available.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.actorInitials` |
* | **Nullability** | Optional |
*/
export interface actorInitials {
kind: "OutputField",
name: "actorInitials",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* [Internal] Notification actor initials if avatar is not available.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.actorAvatarColor` |
* | **Nullability** | Required |
*/
export interface actorAvatarColor {
kind: "OutputField",
name: "actorAvatarColor",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* [Internal] Issue's status type for issue notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.issueStatusType` |
* | **Nullability** | Optional |
*/
export interface issueStatusType {
kind: "OutputField",
name: "issueStatusType",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* [Internal] Project update health for new updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.projectUpdateHealth` |
* | **Nullability** | Optional |
*/
export interface projectUpdateHealth {
kind: "OutputField",
name: "projectUpdateHealth",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* [Internal] Initiative update health for new updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.initiativeUpdateHealth` |
* | **Nullability** | Optional |
*/
export interface initiativeUpdateHealth {
kind: "OutputField",
name: "initiativeUpdateHealth",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* [Internal] Notifications with the same grouping key will be grouped together in the UI.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.groupingKey` |
* | **Nullability** | Required |
*/
export interface groupingKey {
kind: "OutputField",
name: "groupingKey",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* [Internal] Priority of the notification with the same grouping key. Higher number means higher priority. If priority is the same, notifications should be sorted by `createdAt`.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.groupingPriority` |
* | **Nullability** | Required |
*/
export interface groupingPriority {
kind: "OutputField",
name: "groupingPriority",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* The bot that caused the notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ActorBot} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.botActor` |
* | **Nullability** | Optional |
*/
export interface botActor {
kind: "OutputField",
name: "botActor",
arguments: {},
inlineType: [0, ],
namedType: $Schema.ActorBot
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PostNotification}.
*
* Related post ID.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PostNotification} |
* | **Path** | `PostNotification.postId` |
* | **Nullability** | Required |
*/
export interface postId {
kind: "OutputField",
name: "postId",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}
