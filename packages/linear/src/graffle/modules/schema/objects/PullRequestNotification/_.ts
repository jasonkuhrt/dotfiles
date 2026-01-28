import type * as $Fields from './fields.js'

export * as PullRequestNotification from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A pull request related notification.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 30 |
* | **Implements** | {@link $Schema.Notification}, {@link $Schema.Entity}, {@link $Schema.Node} |
*/
export interface PullRequestNotification {
kind: "Object",
name: "PullRequestNotification",
fields: {
__typename: $Fields.__typename,
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
pullRequestId: $Fields.pullRequestId,
pullRequestCommentId: $Fields.pullRequestCommentId,
pullRequest: $Fields.pullRequest
}
}