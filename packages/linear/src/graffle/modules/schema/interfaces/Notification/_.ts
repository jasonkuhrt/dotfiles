import type * as $Fields from './fields.js'
import type { IssueNotification, ProjectNotification, InitiativeNotification, OauthClientApprovalNotification, DocumentNotification, PostNotification, CustomerNeedNotification, CustomerNotification, PullRequestNotification } from '../../__.js'

export * as Notification from './fields.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface}.
*
* A notification sent to a user.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface ↗} |
* | **Fields** | 27 |
* | **Implementors** | {@link $Schema.IssueNotification}, {@link $Schema.ProjectNotification}, {@link $Schema.InitiativeNotification}, {@link $Schema.OauthClientApprovalNotification}, {@link $Schema.DocumentNotification}, {@link $Schema.PostNotification}, {@link $Schema.CustomerNeedNotification}, {@link $Schema.CustomerNotification}, {@link $Schema.PullRequestNotification} |
*/
export interface Notification {
kind: "Interface",
name: "Notification",
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
botActor: $Fields.botActor
},
implementors: [IssueNotification, ProjectNotification, InitiativeNotification, OauthClientApprovalNotification, DocumentNotification, PostNotification, CustomerNeedNotification, CustomerNotification, PullRequestNotification],
implementorsUnion: IssueNotification
| ProjectNotification
| InitiativeNotification
| OauthClientApprovalNotification
| DocumentNotification
| PostNotification
| CustomerNeedNotification
| CustomerNotification
| PullRequestNotification,
implementorsIndex: {
IssueNotification: IssueNotification,
ProjectNotification: ProjectNotification,
InitiativeNotification: InitiativeNotification,
OauthClientApprovalNotification: OauthClientApprovalNotification,
DocumentNotification: DocumentNotification,
PostNotification: PostNotification,
CustomerNeedNotification: CustomerNeedNotification,
CustomerNotification: CustomerNotification,
PullRequestNotification: PullRequestNotification
}
}