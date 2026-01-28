import type * as $Fields from './fields.js'

export * as IssueSearchResult from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 80 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface IssueSearchResult {
kind: "Object",
name: "IssueSearchResult",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
number: $Fields.number,
title: $Fields.title,
priority: $Fields.priority,
estimate: $Fields.estimate,
boardOrder: $Fields.boardOrder,
sortOrder: $Fields.sortOrder,
prioritySortOrder: $Fields.prioritySortOrder,
startedAt: $Fields.startedAt,
completedAt: $Fields.completedAt,
startedTriageAt: $Fields.startedTriageAt,
triagedAt: $Fields.triagedAt,
canceledAt: $Fields.canceledAt,
autoClosedAt: $Fields.autoClosedAt,
autoArchivedAt: $Fields.autoArchivedAt,
dueDate: $Fields.dueDate,
slaStartedAt: $Fields.slaStartedAt,
slaMediumRiskAt: $Fields.slaMediumRiskAt,
slaHighRiskAt: $Fields.slaHighRiskAt,
slaBreachesAt: $Fields.slaBreachesAt,
slaType: $Fields.slaType,
addedToProjectAt: $Fields.addedToProjectAt,
addedToCycleAt: $Fields.addedToCycleAt,
addedToTeamAt: $Fields.addedToTeamAt,
trashed: $Fields.trashed,
snoozedUntilAt: $Fields.snoozedUntilAt,
suggestionsGeneratedAt: $Fields.suggestionsGeneratedAt,
activitySummary: $Fields.activitySummary,
labelIds: $Fields.labelIds,
team: $Fields.team,
cycle: $Fields.cycle,
project: $Fields.project,
projectMilestone: $Fields.projectMilestone,
lastAppliedTemplate: $Fields.lastAppliedTemplate,
recurringIssueTemplate: $Fields.recurringIssueTemplate,
previousIdentifiers: $Fields.previousIdentifiers,
creator: $Fields.creator,
externalUserCreator: $Fields.externalUserCreator,
assignee: $Fields.assignee,
delegate: $Fields.delegate,
snoozedBy: $Fields.snoozedBy,
state: $Fields.state,
subIssueSortOrder: $Fields.subIssueSortOrder,
reactionData: $Fields.reactionData,
priorityLabel: $Fields.priorityLabel,
sourceComment: $Fields.sourceComment,
integrationSourceType: $Fields.integrationSourceType,
documents: $Fields.documents,
botActor: $Fields.botActor,
favorite: $Fields.favorite,
identifier: $Fields.identifier,
url: $Fields.url,
branchName: $Fields.branchName,
customerTicketCount: $Fields.customerTicketCount,
subscribers: $Fields.subscribers,
parent: $Fields.parent,
children: $Fields.children,
comments: $Fields.comments,
history: $Fields.history,
labels: $Fields.labels,
relations: $Fields.relations,
inverseRelations: $Fields.inverseRelations,
attachments: $Fields.attachments,
formerAttachments: $Fields.formerAttachments,
description: $Fields.description,
descriptionState: $Fields.descriptionState,
documentContent: $Fields.documentContent,
reactions: $Fields.reactions,
needs: $Fields.needs,
formerNeeds: $Fields.formerNeeds,
syncedWith: $Fields.syncedWith,
suggestions: $Fields.suggestions,
incomingSuggestions: $Fields.incomingSuggestions,
asksRequester: $Fields.asksRequester,
asksExternalUserRequester: $Fields.asksExternalUserRequester,
stateHistory: $Fields.stateHistory,
metadata: $Fields.metadata
}
}