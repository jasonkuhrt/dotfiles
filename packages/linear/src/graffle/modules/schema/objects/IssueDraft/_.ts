import type * as $Fields from './fields.js'

export * as IssueDraft from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* [Internal] A draft issue.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 29 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface IssueDraft {
kind: "Object",
name: "IssueDraft",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
title: $Fields.title,
description: $Fields.description,
priority: $Fields.priority,
estimate: $Fields.estimate,
dueDate: $Fields.dueDate,
labelIds: $Fields.labelIds,
teamId: $Fields.teamId,
cycleId: $Fields.cycleId,
projectId: $Fields.projectId,
projectMilestoneId: $Fields.projectMilestoneId,
creator: $Fields.creator,
assigneeId: $Fields.assigneeId,
delegateId: $Fields.delegateId,
stateId: $Fields.stateId,
parent: $Fields.parent,
parentId: $Fields.parentId,
sourceCommentId: $Fields.sourceCommentId,
parentIssue: $Fields.parentIssue,
parentIssueId: $Fields.parentIssueId,
subIssueSortOrder: $Fields.subIssueSortOrder,
priorityLabel: $Fields.priorityLabel,
descriptionData: $Fields.descriptionData,
attachments: $Fields.attachments,
needs: $Fields.needs,
schedule: $Fields.schedule
}
}