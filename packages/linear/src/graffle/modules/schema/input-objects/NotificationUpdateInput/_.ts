import type * as $Fields from './fields.js'

export * as NotificationUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface NotificationUpdateInput {
kind: "InputObject",
name: "NotificationUpdateInput",
isAllFieldsNullable: true,
fields: {
readAt: $Fields.readAt,
snoozedUntilAt: $Fields.snoozedUntilAt,
projectUpdateId: $Fields.projectUpdateId,
initiativeUpdateId: $Fields.initiativeUpdateId
},
type: {
readAt?: $Fields.readAt['type'],
snoozedUntilAt?: $Fields.snoozedUntilAt['type'],
projectUpdateId?: $Fields.projectUpdateId['type'],
initiativeUpdateId?: $Fields.initiativeUpdateId['type']
}
}