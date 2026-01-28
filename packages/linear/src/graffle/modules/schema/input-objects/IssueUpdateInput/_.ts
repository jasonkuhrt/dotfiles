import type * as $Fields from './fields.js'

export * as IssueUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 30 |
* | **All Fields Nullable** | Yes |
*/
export interface IssueUpdateInput {
kind: "InputObject",
name: "IssueUpdateInput",
isAllFieldsNullable: true,
fields: {
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
addedLabelIds: $Fields.addedLabelIds,
removedLabelIds: $Fields.removedLabelIds,
teamId: $Fields.teamId,
cycleId: $Fields.cycleId,
projectId: $Fields.projectId,
projectMilestoneId: $Fields.projectMilestoneId,
lastAppliedTemplateId: $Fields.lastAppliedTemplateId,
stateId: $Fields.stateId,
boardOrder: $Fields.boardOrder,
sortOrder: $Fields.sortOrder,
prioritySortOrder: $Fields.prioritySortOrder,
subIssueSortOrder: $Fields.subIssueSortOrder,
dueDate: $Fields.dueDate,
trashed: $Fields.trashed,
slaBreachesAt: $Fields.slaBreachesAt,
slaStartedAt: $Fields.slaStartedAt,
snoozedUntilAt: $Fields.snoozedUntilAt,
snoozedById: $Fields.snoozedById,
slaType: $Fields.slaType,
autoClosedByParentClosing: $Fields.autoClosedByParentClosing
},
type: {
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
addedLabelIds?: $Fields.addedLabelIds['type'],
removedLabelIds?: $Fields.removedLabelIds['type'],
teamId?: $Fields.teamId['type'],
cycleId?: $Fields.cycleId['type'],
projectId?: $Fields.projectId['type'],
projectMilestoneId?: $Fields.projectMilestoneId['type'],
lastAppliedTemplateId?: $Fields.lastAppliedTemplateId['type'],
stateId?: $Fields.stateId['type'],
boardOrder?: $Fields.boardOrder['type'],
sortOrder?: $Fields.sortOrder['type'],
prioritySortOrder?: $Fields.prioritySortOrder['type'],
subIssueSortOrder?: $Fields.subIssueSortOrder['type'],
dueDate?: $Fields.dueDate['type'],
trashed?: $Fields.trashed['type'],
slaBreachesAt?: $Fields.slaBreachesAt['type'],
slaStartedAt?: $Fields.slaStartedAt['type'],
snoozedUntilAt?: $Fields.snoozedUntilAt['type'],
snoozedById?: $Fields.snoozedById['type'],
slaType?: $Fields.slaType['type'],
autoClosedByParentClosing?: $Fields.autoClosedByParentClosing['type']
}
}