import type * as $Fields from './fields.js'

export * as ProjectCreateInput from './fields.js'

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
export interface ProjectCreateInput {
kind: "InputObject",
name: "ProjectCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
name: $Fields.name,
icon: $Fields.icon,
color: $Fields.color,
state: $Fields.state,
statusId: $Fields.statusId,
description: $Fields.description,
content: $Fields.content,
teamIds: $Fields.teamIds,
convertedFromIssueId: $Fields.convertedFromIssueId,
lastAppliedTemplateId: $Fields.lastAppliedTemplateId,
templateId: $Fields.templateId,
useDefaultTemplate: $Fields.useDefaultTemplate,
leadId: $Fields.leadId,
memberIds: $Fields.memberIds,
startDate: $Fields.startDate,
startDateResolution: $Fields.startDateResolution,
targetDate: $Fields.targetDate,
targetDateResolution: $Fields.targetDateResolution,
sortOrder: $Fields.sortOrder,
prioritySortOrder: $Fields.prioritySortOrder,
priority: $Fields.priority,
labelIds: $Fields.labelIds
},
type: {
id?: $Fields.id['type'],
name: $Fields.name['type'],
icon?: $Fields.icon['type'],
color?: $Fields.color['type'],
state?: $Fields.state['type'],
statusId?: $Fields.statusId['type'],
description?: $Fields.description['type'],
content?: $Fields.content['type'],
teamIds: $Fields.teamIds['type'],
convertedFromIssueId?: $Fields.convertedFromIssueId['type'],
lastAppliedTemplateId?: $Fields.lastAppliedTemplateId['type'],
templateId?: $Fields.templateId['type'],
useDefaultTemplate?: $Fields.useDefaultTemplate['type'],
leadId?: $Fields.leadId['type'],
memberIds?: $Fields.memberIds['type'],
startDate?: $Fields.startDate['type'],
startDateResolution?: $Fields.startDateResolution['type'],
targetDate?: $Fields.targetDate['type'],
targetDateResolution?: $Fields.targetDateResolution['type'],
sortOrder?: $Fields.sortOrder['type'],
prioritySortOrder?: $Fields.prioritySortOrder['type'],
priority?: $Fields.priority['type'],
labelIds?: $Fields.labelIds['type']
}
}