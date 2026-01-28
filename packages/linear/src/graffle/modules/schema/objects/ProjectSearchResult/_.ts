import type * as $Fields from './fields.js'

export * as ProjectSearchResult from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 73 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface ProjectSearchResult {
kind: "Object",
name: "ProjectSearchResult",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
updateReminderFrequencyInWeeks: $Fields.updateReminderFrequencyInWeeks,
updateReminderFrequency: $Fields.updateReminderFrequency,
frequencyResolution: $Fields.frequencyResolution,
updateRemindersDay: $Fields.updateRemindersDay,
updateRemindersHour: $Fields.updateRemindersHour,
name: $Fields.name,
description: $Fields.description,
slugId: $Fields.slugId,
icon: $Fields.icon,
color: $Fields.color,
status: $Fields.status,
creator: $Fields.creator,
lead: $Fields.lead,
facets: $Fields.facets,
projectUpdateRemindersPausedUntilAt: $Fields.projectUpdateRemindersPausedUntilAt,
startDate: $Fields.startDate,
startDateResolution: $Fields.startDateResolution,
targetDate: $Fields.targetDate,
targetDateResolution: $Fields.targetDateResolution,
startedAt: $Fields.startedAt,
completedAt: $Fields.completedAt,
canceledAt: $Fields.canceledAt,
autoArchivedAt: $Fields.autoArchivedAt,
trashed: $Fields.trashed,
sortOrder: $Fields.sortOrder,
prioritySortOrder: $Fields.prioritySortOrder,
convertedFromIssue: $Fields.convertedFromIssue,
lastAppliedTemplate: $Fields.lastAppliedTemplate,
priority: $Fields.priority,
lastUpdate: $Fields.lastUpdate,
health: $Fields.health,
healthUpdatedAt: $Fields.healthUpdatedAt,
issueCountHistory: $Fields.issueCountHistory,
completedIssueCountHistory: $Fields.completedIssueCountHistory,
scopeHistory: $Fields.scopeHistory,
completedScopeHistory: $Fields.completedScopeHistory,
inProgressScopeHistory: $Fields.inProgressScopeHistory,
progressHistory: $Fields.progressHistory,
currentProgress: $Fields.currentProgress,
slackNewIssue: $Fields.slackNewIssue,
slackIssueComments: $Fields.slackIssueComments,
slackIssueStatuses: $Fields.slackIssueStatuses,
labelIds: $Fields.labelIds,
favorite: $Fields.favorite,
url: $Fields.url,
initiatives: $Fields.initiatives,
initiativeToProjects: $Fields.initiativeToProjects,
teams: $Fields.teams,
members: $Fields.members,
projectUpdates: $Fields.projectUpdates,
documents: $Fields.documents,
projectMilestones: $Fields.projectMilestones,
issues: $Fields.issues,
externalLinks: $Fields.externalLinks,
history: $Fields.history,
labels: $Fields.labels,
progress: $Fields.progress,
scope: $Fields.scope,
integrationsSettings: $Fields.integrationsSettings,
content: $Fields.content,
contentState: $Fields.contentState,
documentContent: $Fields.documentContent,
comments: $Fields.comments,
relations: $Fields.relations,
inverseRelations: $Fields.inverseRelations,
needs: $Fields.needs,
state: $Fields.state,
priorityLabel: $Fields.priorityLabel,
metadata: $Fields.metadata
}
}