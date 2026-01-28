import type * as $Fields from './fields.js'
import type { CustomerNotificationSubscription, CustomViewNotificationSubscription, CycleNotificationSubscription, LabelNotificationSubscription, ProjectNotificationSubscription, InitiativeNotificationSubscription, TeamNotificationSubscription, UserNotificationSubscription } from '../../__.js'

export * as NotificationSubscription from './fields.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface}.
*
* Notification subscriptions for models.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface ↗} |
* | **Fields** | 16 |
* | **Implementors** | {@link $Schema.CustomerNotificationSubscription}, {@link $Schema.CustomViewNotificationSubscription}, {@link $Schema.CycleNotificationSubscription}, {@link $Schema.LabelNotificationSubscription}, {@link $Schema.ProjectNotificationSubscription}, {@link $Schema.InitiativeNotificationSubscription}, {@link $Schema.TeamNotificationSubscription}, {@link $Schema.UserNotificationSubscription} |
*/
export interface NotificationSubscription {
kind: "Interface",
name: "NotificationSubscription",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
subscriber: $Fields.subscriber,
customer: $Fields.customer,
customView: $Fields.customView,
cycle: $Fields.cycle,
label: $Fields.label,
project: $Fields.project,
initiative: $Fields.initiative,
team: $Fields.team,
user: $Fields.user,
contextViewType: $Fields.contextViewType,
userContextViewType: $Fields.userContextViewType,
active: $Fields.active
},
implementors: [CustomerNotificationSubscription, CustomViewNotificationSubscription, CycleNotificationSubscription, LabelNotificationSubscription, ProjectNotificationSubscription, InitiativeNotificationSubscription, TeamNotificationSubscription, UserNotificationSubscription],
implementorsUnion: CustomerNotificationSubscription
| CustomViewNotificationSubscription
| CycleNotificationSubscription
| LabelNotificationSubscription
| ProjectNotificationSubscription
| InitiativeNotificationSubscription
| TeamNotificationSubscription
| UserNotificationSubscription,
implementorsIndex: {
CustomerNotificationSubscription: CustomerNotificationSubscription,
CustomViewNotificationSubscription: CustomViewNotificationSubscription,
CycleNotificationSubscription: CycleNotificationSubscription,
LabelNotificationSubscription: LabelNotificationSubscription,
ProjectNotificationSubscription: ProjectNotificationSubscription,
InitiativeNotificationSubscription: InitiativeNotificationSubscription,
TeamNotificationSubscription: TeamNotificationSubscription,
UserNotificationSubscription: UserNotificationSubscription
}
}