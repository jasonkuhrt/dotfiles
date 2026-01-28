import type * as $Fields from './fields.js'

export * as ProjectUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 32 |
* | **All Fields Nullable** | Yes |
*/
export interface ProjectUpdateInput {
kind: "InputObject",
name: "ProjectUpdateInput",
isAllFieldsNullable: true,
fields: {
state: $Fields.state,
statusId: $Fields.statusId,
name: $Fields.name,
description: $Fields.description,
content: $Fields.content,
convertedFromIssueId: $Fields.convertedFromIssueId,
lastAppliedTemplateId: $Fields.lastAppliedTemplateId,
icon: $Fields.icon,
color: $Fields.color,
teamIds: $Fields.teamIds,
projectUpdateRemindersPausedUntilAt: $Fields.projectUpdateRemindersPausedUntilAt,
updateReminderFrequencyInWeeks: $Fields.updateReminderFrequencyInWeeks,
updateReminderFrequency: $Fields.updateReminderFrequency,
frequencyResolution: $Fields.frequencyResolution,
updateRemindersDay: $Fields.updateRemindersDay,
updateRemindersHour: $Fields.updateRemindersHour,
leadId: $Fields.leadId,
memberIds: $Fields.memberIds,
startDate: $Fields.startDate,
startDateResolution: $Fields.startDateResolution,
targetDate: $Fields.targetDate,
targetDateResolution: $Fields.targetDateResolution,
completedAt: $Fields.completedAt,
canceledAt: $Fields.canceledAt,
slackNewIssue: $Fields.slackNewIssue,
slackIssueComments: $Fields.slackIssueComments,
slackIssueStatuses: $Fields.slackIssueStatuses,
sortOrder: $Fields.sortOrder,
prioritySortOrder: $Fields.prioritySortOrder,
trashed: $Fields.trashed,
priority: $Fields.priority,
labelIds: $Fields.labelIds
},
type: {
state?: $Fields.state['type'],
statusId?: $Fields.statusId['type'],
name?: $Fields.name['type'],
description?: $Fields.description['type'],
content?: $Fields.content['type'],
convertedFromIssueId?: $Fields.convertedFromIssueId['type'],
lastAppliedTemplateId?: $Fields.lastAppliedTemplateId['type'],
icon?: $Fields.icon['type'],
color?: $Fields.color['type'],
teamIds?: $Fields.teamIds['type'],
projectUpdateRemindersPausedUntilAt?: $Fields.projectUpdateRemindersPausedUntilAt['type'],
updateReminderFrequencyInWeeks?: $Fields.updateReminderFrequencyInWeeks['type'],
updateReminderFrequency?: $Fields.updateReminderFrequency['type'],
frequencyResolution?: $Fields.frequencyResolution['type'],
updateRemindersDay?: $Fields.updateRemindersDay['type'],
updateRemindersHour?: $Fields.updateRemindersHour['type'],
leadId?: $Fields.leadId['type'],
memberIds?: $Fields.memberIds['type'],
startDate?: $Fields.startDate['type'],
startDateResolution?: $Fields.startDateResolution['type'],
targetDate?: $Fields.targetDate['type'],
targetDateResolution?: $Fields.targetDateResolution['type'],
completedAt?: $Fields.completedAt['type'],
canceledAt?: $Fields.canceledAt['type'],
slackNewIssue?: $Fields.slackNewIssue['type'],
slackIssueComments?: $Fields.slackIssueComments['type'],
slackIssueStatuses?: $Fields.slackIssueStatuses['type'],
sortOrder?: $Fields.sortOrder['type'],
prioritySortOrder?: $Fields.prioritySortOrder['type'],
trashed?: $Fields.trashed['type'],
priority?: $Fields.priority['type'],
labelIds?: $Fields.labelIds['type']
}
}