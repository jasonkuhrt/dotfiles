import type * as $Fields from './fields.js'

export * as EntityExternalLinkCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 10 |
* | **All Fields Nullable** | Yes |
*/
export interface EntityExternalLinkCreateInput {
kind: "InputObject",
name: "EntityExternalLinkCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
url: $Fields.url,
label: $Fields.label,
initiativeId: $Fields.initiativeId,
projectId: $Fields.projectId,
teamId: $Fields.teamId,
releaseId: $Fields.releaseId,
cycleId: $Fields.cycleId,
resourceFolderId: $Fields.resourceFolderId,
sortOrder: $Fields.sortOrder
},
type: {
id?: $Fields.id['type'],
url: $Fields.url['type'],
label: $Fields.label['type'],
initiativeId?: $Fields.initiativeId['type'],
projectId?: $Fields.projectId['type'],
teamId?: $Fields.teamId['type'],
releaseId?: $Fields.releaseId['type'],
cycleId?: $Fields.cycleId['type'],
resourceFolderId?: $Fields.resourceFolderId['type'],
sortOrder?: $Fields.sortOrder['type']
}
}