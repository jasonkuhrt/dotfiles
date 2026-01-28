import type * as $Fields from './fields.js'

export * as NotificationEntityInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Describes the type and id of the entity to target for notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 7 |
* | **All Fields Nullable** | Yes |
*/
export interface NotificationEntityInput {
kind: "InputObject",
name: "NotificationEntityInput",
isAllFieldsNullable: true,
fields: {
issueId: $Fields.issueId,
projectId: $Fields.projectId,
initiativeId: $Fields.initiativeId,
projectUpdateId: $Fields.projectUpdateId,
initiativeUpdateId: $Fields.initiativeUpdateId,
oauthClientApprovalId: $Fields.oauthClientApprovalId,
id: $Fields.id
},
type: {
issueId?: $Fields.issueId['type'],
projectId?: $Fields.projectId['type'],
initiativeId?: $Fields.initiativeId['type'],
projectUpdateId?: $Fields.projectUpdateId['type'],
initiativeUpdateId?: $Fields.initiativeUpdateId['type'],
oauthClientApprovalId?: $Fields.oauthClientApprovalId['type'],
id?: $Fields.id['type']
}
}