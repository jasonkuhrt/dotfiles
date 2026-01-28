import type * as $Fields from './fields.js'

export * as InitiativeUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* The properties of the initiative to update.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 16 |
* | **All Fields Nullable** | Yes |
*/
export interface InitiativeUpdateInput {
kind: "InputObject",
name: "InitiativeUpdateInput",
isAllFieldsNullable: true,
fields: {
name: $Fields.name,
description: $Fields.description,
ownerId: $Fields.ownerId,
sortOrder: $Fields.sortOrder,
color: $Fields.color,
icon: $Fields.icon,
targetDate: $Fields.targetDate,
status: $Fields.status,
targetDateResolution: $Fields.targetDateResolution,
trashed: $Fields.trashed,
content: $Fields.content,
updateReminderFrequencyInWeeks: $Fields.updateReminderFrequencyInWeeks,
updateReminderFrequency: $Fields.updateReminderFrequency,
frequencyResolution: $Fields.frequencyResolution,
updateRemindersDay: $Fields.updateRemindersDay,
updateRemindersHour: $Fields.updateRemindersHour
},
type: {
name?: $Fields.name['type'],
description?: $Fields.description['type'],
ownerId?: $Fields.ownerId['type'],
sortOrder?: $Fields.sortOrder['type'],
color?: $Fields.color['type'],
icon?: $Fields.icon['type'],
targetDate?: $Fields.targetDate['type'],
status?: $Fields.status['type'],
targetDateResolution?: $Fields.targetDateResolution['type'],
trashed?: $Fields.trashed['type'],
content?: $Fields.content['type'],
updateReminderFrequencyInWeeks?: $Fields.updateReminderFrequencyInWeeks['type'],
updateReminderFrequency?: $Fields.updateReminderFrequency['type'],
frequencyResolution?: $Fields.frequencyResolution['type'],
updateRemindersDay?: $Fields.updateRemindersDay['type'],
updateRemindersHour?: $Fields.updateRemindersHour['type']
}
}