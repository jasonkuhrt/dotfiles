import type * as $Fields from './fields.js'

export * as CustomerNeedUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 11 |
* | **All Fields Nullable** | Yes |
*/
export interface CustomerNeedUpdateInput {
kind: "InputObject",
name: "CustomerNeedUpdateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
customerId: $Fields.customerId,
customerExternalId: $Fields.customerExternalId,
issueId: $Fields.issueId,
projectId: $Fields.projectId,
priority: $Fields.priority,
applyPriorityToRelatedNeeds: $Fields.applyPriorityToRelatedNeeds,
body: $Fields.body,
bodyData: $Fields.bodyData,
url: $Fields.url,
attachmentUrl: $Fields.attachmentUrl
},
type: {
id?: $Fields.id['type'],
customerId?: $Fields.customerId['type'],
customerExternalId?: $Fields.customerExternalId['type'],
issueId?: $Fields.issueId['type'],
projectId?: $Fields.projectId['type'],
priority?: $Fields.priority['type'],
applyPriorityToRelatedNeeds?: $Fields.applyPriorityToRelatedNeeds['type'],
body?: $Fields.body['type'],
bodyData?: $Fields.bodyData['type'],
url?: $Fields.url['type'],
attachmentUrl?: $Fields.attachmentUrl['type']
}
}