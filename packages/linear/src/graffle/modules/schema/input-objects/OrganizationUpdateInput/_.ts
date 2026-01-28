import type * as $Fields from './fields.js'

export * as OrganizationUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 43 |
* | **All Fields Nullable** | Yes |
*/
export interface OrganizationUpdateInput {
kind: "InputObject",
name: "OrganizationUpdateInput",
isAllFieldsNullable: true,
fields: {
name: $Fields.name,
logoUrl: $Fields.logoUrl,
urlKey: $Fields.urlKey,
gitBranchFormat: $Fields.gitBranchFormat,
gitLinkbackMessagesEnabled: $Fields.gitLinkbackMessagesEnabled,
gitPublicLinkbackMessagesEnabled: $Fields.gitPublicLinkbackMessagesEnabled,
gitLinkbackDescriptionsEnabled: $Fields.gitLinkbackDescriptionsEnabled,
roadmapEnabled: $Fields.roadmapEnabled,
projectUpdateReminderFrequencyInWeeks: $Fields.projectUpdateReminderFrequencyInWeeks,
projectUpdateRemindersDay: $Fields.projectUpdateRemindersDay,
projectUpdateRemindersHour: $Fields.projectUpdateRemindersHour,
initiativeUpdateReminderFrequencyInWeeks: $Fields.initiativeUpdateReminderFrequencyInWeeks,
initiativeUpdateRemindersDay: $Fields.initiativeUpdateRemindersDay,
initiativeUpdateRemindersHour: $Fields.initiativeUpdateRemindersHour,
fiscalYearStartMonth: $Fields.fiscalYearStartMonth,
workingDays: $Fields.workingDays,
reducedPersonalInformation: $Fields.reducedPersonalInformation,
oauthAppReview: $Fields.oauthAppReview,
allowedAuthServices: $Fields.allowedAuthServices,
slaEnabled: $Fields.slaEnabled,
allowMembersToInvite: $Fields.allowMembersToInvite,
restrictTeamCreationToAdmins: $Fields.restrictTeamCreationToAdmins,
restrictLabelManagementToAdmins: $Fields.restrictLabelManagementToAdmins,
restrictAgentInvocationToMembers: $Fields.restrictAgentInvocationToMembers,
ipRestrictions: $Fields.ipRestrictions,
allowedFileUploadContentTypes: $Fields.allowedFileUploadContentTypes,
themeSettings: $Fields.themeSettings,
customersEnabled: $Fields.customersEnabled,
customersConfiguration: $Fields.customersConfiguration,
codeIntelligenceEnabled: $Fields.codeIntelligenceEnabled,
codeIntelligenceRepository: $Fields.codeIntelligenceRepository,
feedEnabled: $Fields.feedEnabled,
hideNonPrimaryOrganizations: $Fields.hideNonPrimaryOrganizations,
defaultFeedSummarySchedule: $Fields.defaultFeedSummarySchedule,
aiAddonEnabled: $Fields.aiAddonEnabled,
generatedUpdatesEnabled: $Fields.generatedUpdatesEnabled,
aiTelemetryEnabled: $Fields.aiTelemetryEnabled,
personalApiKeysEnabled: $Fields.personalApiKeysEnabled,
aiDiscussionSummariesEnabled: $Fields.aiDiscussionSummariesEnabled,
aiThreadSummariesEnabled: $Fields.aiThreadSummariesEnabled,
hipaaComplianceEnabled: $Fields.hipaaComplianceEnabled,
securitySettings: $Fields.securitySettings,
aiProviderConfiguration: $Fields.aiProviderConfiguration
},
type: {
name?: $Fields.name['type'],
logoUrl?: $Fields.logoUrl['type'],
urlKey?: $Fields.urlKey['type'],
gitBranchFormat?: $Fields.gitBranchFormat['type'],
gitLinkbackMessagesEnabled?: $Fields.gitLinkbackMessagesEnabled['type'],
gitPublicLinkbackMessagesEnabled?: $Fields.gitPublicLinkbackMessagesEnabled['type'],
gitLinkbackDescriptionsEnabled?: $Fields.gitLinkbackDescriptionsEnabled['type'],
roadmapEnabled?: $Fields.roadmapEnabled['type'],
projectUpdateReminderFrequencyInWeeks?: $Fields.projectUpdateReminderFrequencyInWeeks['type'],
projectUpdateRemindersDay?: $Fields.projectUpdateRemindersDay['type'],
projectUpdateRemindersHour?: $Fields.projectUpdateRemindersHour['type'],
initiativeUpdateReminderFrequencyInWeeks?: $Fields.initiativeUpdateReminderFrequencyInWeeks['type'],
initiativeUpdateRemindersDay?: $Fields.initiativeUpdateRemindersDay['type'],
initiativeUpdateRemindersHour?: $Fields.initiativeUpdateRemindersHour['type'],
fiscalYearStartMonth?: $Fields.fiscalYearStartMonth['type'],
workingDays?: $Fields.workingDays['type'],
reducedPersonalInformation?: $Fields.reducedPersonalInformation['type'],
oauthAppReview?: $Fields.oauthAppReview['type'],
allowedAuthServices?: $Fields.allowedAuthServices['type'],
slaEnabled?: $Fields.slaEnabled['type'],
allowMembersToInvite?: $Fields.allowMembersToInvite['type'],
restrictTeamCreationToAdmins?: $Fields.restrictTeamCreationToAdmins['type'],
restrictLabelManagementToAdmins?: $Fields.restrictLabelManagementToAdmins['type'],
restrictAgentInvocationToMembers?: $Fields.restrictAgentInvocationToMembers['type'],
ipRestrictions?: $Fields.ipRestrictions['type'],
allowedFileUploadContentTypes?: $Fields.allowedFileUploadContentTypes['type'],
themeSettings?: $Fields.themeSettings['type'],
customersEnabled?: $Fields.customersEnabled['type'],
customersConfiguration?: $Fields.customersConfiguration['type'],
codeIntelligenceEnabled?: $Fields.codeIntelligenceEnabled['type'],
codeIntelligenceRepository?: $Fields.codeIntelligenceRepository['type'],
feedEnabled?: $Fields.feedEnabled['type'],
hideNonPrimaryOrganizations?: $Fields.hideNonPrimaryOrganizations['type'],
defaultFeedSummarySchedule?: $Fields.defaultFeedSummarySchedule['type'],
aiAddonEnabled?: $Fields.aiAddonEnabled['type'],
generatedUpdatesEnabled?: $Fields.generatedUpdatesEnabled['type'],
aiTelemetryEnabled?: $Fields.aiTelemetryEnabled['type'],
personalApiKeysEnabled?: $Fields.personalApiKeysEnabled['type'],
aiDiscussionSummariesEnabled?: $Fields.aiDiscussionSummariesEnabled['type'],
aiThreadSummariesEnabled?: $Fields.aiThreadSummariesEnabled['type'],
hipaaComplianceEnabled?: $Fields.hipaaComplianceEnabled['type'],
securitySettings?: $Fields.securitySettings['type'],
aiProviderConfiguration?: $Fields.aiProviderConfiguration['type']
}
}