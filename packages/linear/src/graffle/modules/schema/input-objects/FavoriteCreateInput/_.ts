import type * as $Fields from './fields.js'

export * as FavoriteCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 23 |
* | **All Fields Nullable** | Yes |
*/
export interface FavoriteCreateInput {
kind: "InputObject",
name: "FavoriteCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
folderName: $Fields.folderName,
parentId: $Fields.parentId,
issueId: $Fields.issueId,
facetId: $Fields.facetId,
projectId: $Fields.projectId,
projectTab: $Fields.projectTab,
predefinedViewType: $Fields.predefinedViewType,
predefinedViewTeamId: $Fields.predefinedViewTeamId,
cycleId: $Fields.cycleId,
customViewId: $Fields.customViewId,
documentId: $Fields.documentId,
initiativeId: $Fields.initiativeId,
initiativeTab: $Fields.initiativeTab,
labelId: $Fields.labelId,
projectLabelId: $Fields.projectLabelId,
userId: $Fields.userId,
sortOrder: $Fields.sortOrder,
customerId: $Fields.customerId,
dashboardId: $Fields.dashboardId,
pullRequestId: $Fields.pullRequestId,
releaseId: $Fields.releaseId,
releasePipelineId: $Fields.releasePipelineId
},
type: {
id?: $Fields.id['type'],
folderName?: $Fields.folderName['type'],
parentId?: $Fields.parentId['type'],
issueId?: $Fields.issueId['type'],
facetId?: $Fields.facetId['type'],
projectId?: $Fields.projectId['type'],
projectTab?: $Fields.projectTab['type'],
predefinedViewType?: $Fields.predefinedViewType['type'],
predefinedViewTeamId?: $Fields.predefinedViewTeamId['type'],
cycleId?: $Fields.cycleId['type'],
customViewId?: $Fields.customViewId['type'],
documentId?: $Fields.documentId['type'],
initiativeId?: $Fields.initiativeId['type'],
initiativeTab?: $Fields.initiativeTab['type'],
labelId?: $Fields.labelId['type'],
projectLabelId?: $Fields.projectLabelId['type'],
userId?: $Fields.userId['type'],
sortOrder?: $Fields.sortOrder['type'],
customerId?: $Fields.customerId['type'],
dashboardId?: $Fields.dashboardId['type'],
pullRequestId?: $Fields.pullRequestId['type'],
releaseId?: $Fields.releaseId['type'],
releasePipelineId?: $Fields.releasePipelineId['type']
}
}