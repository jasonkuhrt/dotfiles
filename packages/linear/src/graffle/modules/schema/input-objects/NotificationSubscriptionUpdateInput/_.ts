import type * as $Fields from './fields.js'

export * as NotificationSubscriptionUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | Yes |
*/
export interface NotificationSubscriptionUpdateInput {
kind: "InputObject",
name: "NotificationSubscriptionUpdateInput",
isAllFieldsNullable: true,
fields: {
notificationSubscriptionTypes: $Fields.notificationSubscriptionTypes,
active: $Fields.active
},
type: {
notificationSubscriptionTypes?: $Fields.notificationSubscriptionTypes['type'],
active?: $Fields.active['type']
}
}