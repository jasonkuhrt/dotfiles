import type * as $Fields from './fields.js'

export * as DocumentCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 16 |
* | **All Fields Nullable** | Yes |
*/
export interface DocumentCreateInput {
kind: "InputObject",
name: "DocumentCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
title: $Fields.title,
icon: $Fields.icon,
color: $Fields.color,
contentData: $Fields.contentData,
content: $Fields.content,
projectId: $Fields.projectId,
initiativeId: $Fields.initiativeId,
teamId: $Fields.teamId,
issueId: $Fields.issueId,
releaseId: $Fields.releaseId,
cycleId: $Fields.cycleId,
resourceFolderId: $Fields.resourceFolderId,
lastAppliedTemplateId: $Fields.lastAppliedTemplateId,
sortOrder: $Fields.sortOrder,
subscriberIds: $Fields.subscriberIds
},
type: {
id?: $Fields.id['type'],
title: $Fields.title['type'],
icon?: $Fields.icon['type'],
color?: $Fields.color['type'],
contentData?: $Fields.contentData['type'],
content?: $Fields.content['type'],
projectId?: $Fields.projectId['type'],
initiativeId?: $Fields.initiativeId['type'],
teamId?: $Fields.teamId['type'],
issueId?: $Fields.issueId['type'],
releaseId?: $Fields.releaseId['type'],
cycleId?: $Fields.cycleId['type'],
resourceFolderId?: $Fields.resourceFolderId['type'],
lastAppliedTemplateId?: $Fields.lastAppliedTemplateId['type'],
sortOrder?: $Fields.sortOrder['type'],
subscriberIds?: $Fields.subscriberIds['type']
}
}