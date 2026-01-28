import type * as $Fields from './fields.js'

export * as IssueNotification from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
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
export interface IssueNotification {
kind: "Object",
name: "IssueNotification",
fields: {
__typename: $Fields.__typename,
commentId: $Fields.commentId,
parentCommentId: $Fields.parentCommentId,
reactionEmoji: $Fields.reactionEmoji,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
type: $Fields.type,
actor: $Fields.actor,
externalUserActor: $Fields.externalUserActor,
user: $Fields.user,
readAt: $Fields.readAt,
emailedAt: $Fields.emailedAt,
snoozedUntilAt: $Fields.snoozedUntilAt,
unsnoozedAt: $Fields.unsnoozedAt,
category: $Fields.category,
url: $Fields.url,
inboxUrl: $Fields.inboxUrl,
title: $Fields.title,
subtitle: $Fields.subtitle,
isLinearActor: $Fields.isLinearActor,
actorAvatarUrl: $Fields.actorAvatarUrl,
actorInitials: $Fields.actorInitials,
actorAvatarColor: $Fields.actorAvatarColor,
issueStatusType: $Fields.issueStatusType,
projectUpdateHealth: $Fields.projectUpdateHealth,
initiativeUpdateHealth: $Fields.initiativeUpdateHealth,
groupingKey: $Fields.groupingKey,
groupingPriority: $Fields.groupingPriority,
botActor: $Fields.botActor,
issueId: $Fields.issueId,
issue: $Fields.issue,
comment: $Fields.comment,
parentComment: $Fields.parentComment,
team: $Fields.team,
subscriptions: $Fields.subscriptions
}
}