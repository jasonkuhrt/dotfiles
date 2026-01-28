import type * as $Fields from './fields.js'

export * as CustomerNeedCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 14 |
* | **All Fields Nullable** | Yes |
*/
export interface CustomerNeedCreateInput {
kind: "InputObject",
name: "CustomerNeedCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
customerId: $Fields.customerId,
customerExternalId: $Fields.customerExternalId,
issueId: $Fields.issueId,
projectId: $Fields.projectId,
commentId: $Fields.commentId,
attachmentId: $Fields.attachmentId,
priority: $Fields.priority,
body: $Fields.body,
bodyData: $Fields.bodyData,
url: $Fields.url,
attachmentUrl: $Fields.attachmentUrl,
createAsUser: $Fields.createAsUser,
displayIconUrl: $Fields.displayIconUrl
},
type: {
id?: $Fields.id['type'],
customerId?: $Fields.customerId['type'],
customerExternalId?: $Fields.customerExternalId['type'],
issueId?: $Fields.issueId['type'],
projectId?: $Fields.projectId['type'],
commentId?: $Fields.commentId['type'],
attachmentId?: $Fields.attachmentId['type'],
priority?: $Fields.priority['type'],
body?: $Fields.body['type'],
bodyData?: $Fields.bodyData['type'],
url?: $Fields.url['type'],
attachmentUrl?: $Fields.attachmentUrl['type'],
createAsUser?: $Fields.createAsUser['type'],
displayIconUrl?: $Fields.displayIconUrl['type']
}
}