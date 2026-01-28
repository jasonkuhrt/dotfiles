import type * as $Fields from './fields.js'

export * as NotificationSubscriptionCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 13 |
* | **All Fields Nullable** | Yes |
*/
export interface NotificationSubscriptionCreateInput {
kind: "InputObject",
name: "NotificationSubscriptionCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
customerId: $Fields.customerId,
customViewId: $Fields.customViewId,
cycleId: $Fields.cycleId,
initiativeId: $Fields.initiativeId,
labelId: $Fields.labelId,
projectId: $Fields.projectId,
teamId: $Fields.teamId,
userId: $Fields.userId,
contextViewType: $Fields.contextViewType,
userContextViewType: $Fields.userContextViewType,
notificationSubscriptionTypes: $Fields.notificationSubscriptionTypes,
active: $Fields.active
},
type: {
id?: $Fields.id['type'],
customerId?: $Fields.customerId['type'],
customViewId?: $Fields.customViewId['type'],
cycleId?: $Fields.cycleId['type'],
initiativeId?: $Fields.initiativeId['type'],
labelId?: $Fields.labelId['type'],
projectId?: $Fields.projectId['type'],
teamId?: $Fields.teamId['type'],
userId?: $Fields.userId['type'],
contextViewType?: $Fields.contextViewType['type'],
userContextViewType?: $Fields.userContextViewType['type'],
notificationSubscriptionTypes?: $Fields.notificationSubscriptionTypes['type'],
active?: $Fields.active['type']
}
}