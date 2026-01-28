import type * as $Fields from './fields.js'

export * as Initiative from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* An initiative to group projects.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 39 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface Initiative {
kind: "Object",
name: "Initiative",
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
organization: $Fields.organization,
creator: $Fields.creator,
owner: $Fields.owner,
slugId: $Fields.slugId,
sortOrder: $Fields.sortOrder,
color: $Fields.color,
icon: $Fields.icon,
trashed: $Fields.trashed,
facets: $Fields.facets,
targetDate: $Fields.targetDate,
targetDateResolution: $Fields.targetDateResolution,
status: $Fields.status,
lastUpdate: $Fields.lastUpdate,
health: $Fields.health,
healthUpdatedAt: $Fields.healthUpdatedAt,
startedAt: $Fields.startedAt,
completedAt: $Fields.completedAt,
url: $Fields.url,
projects: $Fields.projects,
links: $Fields.links,
integrationsSettings: $Fields.integrationsSettings,
history: $Fields.history,
initiativeUpdates: $Fields.initiativeUpdates,
subInitiatives: $Fields.subInitiatives,
parentInitiative: $Fields.parentInitiative,
content: $Fields.content,
documentContent: $Fields.documentContent,
documents: $Fields.documents
}
}