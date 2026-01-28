import type * as $Fields from './fields.js'
import type { CustomerNotificationSubscription, CustomViewNotificationSubscription, CycleNotificationSubscription, LabelNotificationSubscription, ProjectNotificationSubscription, InitiativeNotificationSubscription, TeamNotificationSubscription, UserNotificationSubscription, IssueNotification, ProjectNotification, InitiativeNotification, OauthClientApprovalNotification, DocumentNotification, PostNotification, CustomerNeedNotification, CustomerNotification, PullRequestNotification, NotificationSubscription, Notification } from '../../__.js'

export * as Entity from './fields.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface}.
*
* A basic entity.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface ↗} |
* | **Fields** | 4 |
* | **Implementors** | {@link $Schema.CustomerNotificationSubscription}, {@link $Schema.CustomViewNotificationSubscription}, {@link $Schema.CycleNotificationSubscription}, {@link $Schema.LabelNotificationSubscription}, {@link $Schema.ProjectNotificationSubscription}, {@link $Schema.InitiativeNotificationSubscription}, {@link $Schema.TeamNotificationSubscription}, {@link $Schema.UserNotificationSubscription}, {@link $Schema.IssueNotification}, {@link $Schema.ProjectNotification}, {@link $Schema.InitiativeNotification}, {@link $Schema.OauthClientApprovalNotification}, {@link $Schema.DocumentNotification}, {@link $Schema.PostNotification}, {@link $Schema.CustomerNeedNotification}, {@link $Schema.CustomerNotification}, {@link $Schema.PullRequestNotification}, {@link $Schema.NotificationSubscription}, {@link $Schema.Notification} |
*/
export interface Entity {
kind: "Interface",
name: "Entity",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt
},
implementors: [CustomerNotificationSubscription, CustomViewNotificationSubscription, CycleNotificationSubscription, LabelNotificationSubscription, ProjectNotificationSubscription, InitiativeNotificationSubscription, TeamNotificationSubscription, UserNotificationSubscription, IssueNotification, ProjectNotification, InitiativeNotification, OauthClientApprovalNotification, DocumentNotification, PostNotification, CustomerNeedNotification, CustomerNotification, PullRequestNotification, NotificationSubscription, Notification],
implementorsUnion: CustomerNotificationSubscription
| CustomViewNotificationSubscription
| CycleNotificationSubscription
| LabelNotificationSubscription
| ProjectNotificationSubscription
| InitiativeNotificationSubscription
| TeamNotificationSubscription
| UserNotificationSubscription
| IssueNotification
| ProjectNotification
| InitiativeNotification
| OauthClientApprovalNotification
| DocumentNotification
| PostNotification
| CustomerNeedNotification
| CustomerNotification
| PullRequestNotification
| NotificationSubscription
| Notification,
implementorsIndex: {
CustomerNotificationSubscription: CustomerNotificationSubscription,
CustomViewNotificationSubscription: CustomViewNotificationSubscription,
CycleNotificationSubscription: CycleNotificationSubscription,
LabelNotificationSubscription: LabelNotificationSubscription,
ProjectNotificationSubscription: ProjectNotificationSubscription,
InitiativeNotificationSubscription: InitiativeNotificationSubscription,
TeamNotificationSubscription: TeamNotificationSubscription,
UserNotificationSubscription: UserNotificationSubscription,
IssueNotification: IssueNotification,
ProjectNotification: ProjectNotification,
InitiativeNotification: InitiativeNotification,
OauthClientApprovalNotification: OauthClientApprovalNotification,
DocumentNotification: DocumentNotification,
PostNotification: PostNotification,
CustomerNeedNotification: CustomerNeedNotification,
CustomerNotification: CustomerNotification,
PullRequestNotification: PullRequestNotification,
NotificationSubscription: NotificationSubscription,
Notification: Notification
}
}