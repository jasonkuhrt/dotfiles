import type * as $Fields from './fields.js'

export * as InitiativeNotification from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* An initiative related notification.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 37 |
* | **Implements** | {@link $Schema.Notification}, {@link $Schema.Entity}, {@link $Schema.Node} |
*/
export interface InitiativeNotification {
kind: "Object",
name: "InitiativeNotification",
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
initiativeId: $Fields.initiativeId,
initiativeUpdateId: $Fields.initiativeUpdateId,
initiative: $Fields.initiative,
document: $Fields.document,
initiativeUpdate: $Fields.initiativeUpdate,
comment: $Fields.comment,
parentComment: $Fields.parentComment
}
}