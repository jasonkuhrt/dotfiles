import type * as $Fields from './fields.js'

export * as IssueCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 35 |
* | **All Fields Nullable** | Yes |
*/
export interface IssueCreateInput {
kind: "InputObject",
name: "IssueCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
title: $Fields.title,
description: $Fields.description,
descriptionData: $Fields.descriptionData,
assigneeId: $Fields.assigneeId,
delegateId: $Fields.delegateId,
parentId: $Fields.parentId,
priority: $Fields.priority,
estimate: $Fields.estimate,
subscriberIds: $Fields.subscriberIds,
labelIds: $Fields.labelIds,
teamId: $Fields.teamId,
cycleId: $Fields.cycleId,
projectId: $Fields.projectId,
projectMilestoneId: $Fields.projectMilestoneId,
lastAppliedTemplateId: $Fields.lastAppliedTemplateId,
stateId: $Fields.stateId,
referenceCommentId: $Fields.referenceCommentId,
sourceCommentId: $Fields.sourceCommentId,
sourcePullRequestCommentId: $Fields.sourcePullRequestCommentId,
boardOrder: $Fields.boardOrder,
sortOrder: $Fields.sortOrder,
prioritySortOrder: $Fields.prioritySortOrder,
subIssueSortOrder: $Fields.subIssueSortOrder,
dueDate: $Fields.dueDate,
createAsUser: $Fields.createAsUser,
displayIconUrl: $Fields.displayIconUrl,
preserveSortOrderOnCreate: $Fields.preserveSortOrderOnCreate,
createdAt: $Fields.createdAt,
slaBreachesAt: $Fields.slaBreachesAt,
slaStartedAt: $Fields.slaStartedAt,
templateId: $Fields.templateId,
completedAt: $Fields.completedAt,
slaType: $Fields.slaType,
useDefaultTemplate: $Fields.useDefaultTemplate
},
type: {
id?: $Fields.id['type'],
title?: $Fields.title['type'],
description?: $Fields.description['type'],
descriptionData?: $Fields.descriptionData['type'],
assigneeId?: $Fields.assigneeId['type'],
delegateId?: $Fields.delegateId['type'],
parentId?: $Fields.parentId['type'],
priority?: $Fields.priority['type'],
estimate?: $Fields.estimate['type'],
subscriberIds?: $Fields.subscriberIds['type'],
labelIds?: $Fields.labelIds['type'],
teamId: $Fields.teamId['type'],
cycleId?: $Fields.cycleId['type'],
projectId?: $Fields.projectId['type'],
projectMilestoneId?: $Fields.projectMilestoneId['type'],
lastAppliedTemplateId?: $Fields.lastAppliedTemplateId['type'],
stateId?: $Fields.stateId['type'],
referenceCommentId?: $Fields.referenceCommentId['type'],
sourceCommentId?: $Fields.sourceCommentId['type'],
sourcePullRequestCommentId?: $Fields.sourcePullRequestCommentId['type'],
boardOrder?: $Fields.boardOrder['type'],
sortOrder?: $Fields.sortOrder['type'],
prioritySortOrder?: $Fields.prioritySortOrder['type'],
subIssueSortOrder?: $Fields.subIssueSortOrder['type'],
dueDate?: $Fields.dueDate['type'],
createAsUser?: $Fields.createAsUser['type'],
displayIconUrl?: $Fields.displayIconUrl['type'],
preserveSortOrderOnCreate?: $Fields.preserveSortOrderOnCreate['type'],
createdAt?: $Fields.createdAt['type'],
slaBreachesAt?: $Fields.slaBreachesAt['type'],
slaStartedAt?: $Fields.slaStartedAt['type'],
templateId?: $Fields.templateId['type'],
completedAt?: $Fields.completedAt['type'],
slaType?: $Fields.slaType['type'],
useDefaultTemplate?: $Fields.useDefaultTemplate['type']
}
}