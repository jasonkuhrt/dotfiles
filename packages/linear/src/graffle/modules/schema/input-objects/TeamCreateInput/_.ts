import type * as $Fields from './fields.js'

export * as TeamCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 38 |
* | **All Fields Nullable** | Yes |
*/
export interface TeamCreateInput {
kind: "InputObject",
name: "TeamCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
name: $Fields.name,
description: $Fields.description,
key: $Fields.key,
icon: $Fields.icon,
color: $Fields.color,
organizationId: $Fields.organizationId,
cyclesEnabled: $Fields.cyclesEnabled,
cycleStartDay: $Fields.cycleStartDay,
cycleDuration: $Fields.cycleDuration,
cycleCooldownTime: $Fields.cycleCooldownTime,
cycleIssueAutoAssignStarted: $Fields.cycleIssueAutoAssignStarted,
cycleIssueAutoAssignCompleted: $Fields.cycleIssueAutoAssignCompleted,
cycleLockToActive: $Fields.cycleLockToActive,
upcomingCycleCount: $Fields.upcomingCycleCount,
triageEnabled: $Fields.triageEnabled,
requirePriorityToLeaveTriage: $Fields.requirePriorityToLeaveTriage,
timezone: $Fields.timezone,
issueOrderingNoPriorityFirst: $Fields.issueOrderingNoPriorityFirst,
inheritIssueEstimation: $Fields.inheritIssueEstimation,
inheritWorkflowStatuses: $Fields.inheritWorkflowStatuses,
issueEstimationType: $Fields.issueEstimationType,
issueEstimationAllowZero: $Fields.issueEstimationAllowZero,
setIssueSortOrderOnStateChange: $Fields.setIssueSortOrderOnStateChange,
issueEstimationExtended: $Fields.issueEstimationExtended,
defaultIssueEstimate: $Fields.defaultIssueEstimate,
groupIssueHistory: $Fields.groupIssueHistory,
defaultTemplateForMembersId: $Fields.defaultTemplateForMembersId,
defaultTemplateForNonMembersId: $Fields.defaultTemplateForNonMembersId,
defaultProjectTemplateId: $Fields.defaultProjectTemplateId,
private: $Fields.private,
autoClosePeriod: $Fields.autoClosePeriod,
autoCloseStateId: $Fields.autoCloseStateId,
autoArchivePeriod: $Fields.autoArchivePeriod,
markedAsDuplicateWorkflowStateId: $Fields.markedAsDuplicateWorkflowStateId,
parentId: $Fields.parentId,
inheritProductIntelligenceScope: $Fields.inheritProductIntelligenceScope,
productIntelligenceScope: $Fields.productIntelligenceScope
},
type: {
id?: $Fields.id['type'],
name: $Fields.name['type'],
description?: $Fields.description['type'],
key?: $Fields.key['type'],
icon?: $Fields.icon['type'],
color?: $Fields.color['type'],
organizationId?: $Fields.organizationId['type'],
cyclesEnabled?: $Fields.cyclesEnabled['type'],
cycleStartDay?: $Fields.cycleStartDay['type'],
cycleDuration?: $Fields.cycleDuration['type'],
cycleCooldownTime?: $Fields.cycleCooldownTime['type'],
cycleIssueAutoAssignStarted?: $Fields.cycleIssueAutoAssignStarted['type'],
cycleIssueAutoAssignCompleted?: $Fields.cycleIssueAutoAssignCompleted['type'],
cycleLockToActive?: $Fields.cycleLockToActive['type'],
upcomingCycleCount?: $Fields.upcomingCycleCount['type'],
triageEnabled?: $Fields.triageEnabled['type'],
requirePriorityToLeaveTriage?: $Fields.requirePriorityToLeaveTriage['type'],
timezone?: $Fields.timezone['type'],
issueOrderingNoPriorityFirst?: $Fields.issueOrderingNoPriorityFirst['type'],
inheritIssueEstimation?: $Fields.inheritIssueEstimation['type'],
inheritWorkflowStatuses?: $Fields.inheritWorkflowStatuses['type'],
issueEstimationType?: $Fields.issueEstimationType['type'],
issueEstimationAllowZero?: $Fields.issueEstimationAllowZero['type'],
setIssueSortOrderOnStateChange?: $Fields.setIssueSortOrderOnStateChange['type'],
issueEstimationExtended?: $Fields.issueEstimationExtended['type'],
defaultIssueEstimate?: $Fields.defaultIssueEstimate['type'],
groupIssueHistory?: $Fields.groupIssueHistory['type'],
defaultTemplateForMembersId?: $Fields.defaultTemplateForMembersId['type'],
defaultTemplateForNonMembersId?: $Fields.defaultTemplateForNonMembersId['type'],
defaultProjectTemplateId?: $Fields.defaultProjectTemplateId['type'],
private?: $Fields.private['type'],
autoClosePeriod?: $Fields.autoClosePeriod['type'],
autoCloseStateId?: $Fields.autoCloseStateId['type'],
autoArchivePeriod?: $Fields.autoArchivePeriod['type'],
markedAsDuplicateWorkflowStateId?: $Fields.markedAsDuplicateWorkflowStateId['type'],
parentId?: $Fields.parentId['type'],
inheritProductIntelligenceScope?: $Fields.inheritProductIntelligenceScope['type'],
productIntelligenceScope?: $Fields.productIntelligenceScope['type']
}
}