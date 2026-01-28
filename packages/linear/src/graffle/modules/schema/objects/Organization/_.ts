import type * as $Fields from './fields.js'

export * as Organization from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* An organization. Organizations are root-level objects that contain user accounts and teams.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 66 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface Organization {
kind: "Object",
name: "Organization",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
name: $Fields.name,
urlKey: $Fields.urlKey,
logoUrl: $Fields.logoUrl,
periodUploadVolume: $Fields.periodUploadVolume,
facets: $Fields.facets,
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
samlEnabled: $Fields.samlEnabled,
samlSettings: $Fields.samlSettings,
scimEnabled: $Fields.scimEnabled,
scimSettings: $Fields.scimSettings,
securitySettings: $Fields.securitySettings,
allowedAuthServices: $Fields.allowedAuthServices,
allowedFileUploadContentTypes: $Fields.allowedFileUploadContentTypes,
ipRestrictions: $Fields.ipRestrictions,
deletionRequestedAt: $Fields.deletionRequestedAt,
trialEndsAt: $Fields.trialEndsAt,
trialStartsAt: $Fields.trialStartsAt,
previousUrlKeys: $Fields.previousUrlKeys,
hipaaComplianceEnabled: $Fields.hipaaComplianceEnabled,
themeSettings: $Fields.themeSettings,
releaseChannel: $Fields.releaseChannel,
customersConfiguration: $Fields.customersConfiguration,
codeIntelligenceEnabled: $Fields.codeIntelligenceEnabled,
codeIntelligenceRepository: $Fields.codeIntelligenceRepository,
defaultFeedSummarySchedule: $Fields.defaultFeedSummarySchedule,
feedEnabled: $Fields.feedEnabled,
hideNonPrimaryOrganizations: $Fields.hideNonPrimaryOrganizations,
aiAddonEnabled: $Fields.aiAddonEnabled,
generatedUpdatesEnabled: $Fields.generatedUpdatesEnabled,
aiThreadSummariesEnabled: $Fields.aiThreadSummariesEnabled,
aiDiscussionSummariesEnabled: $Fields.aiDiscussionSummariesEnabled,
aiProviderConfiguration: $Fields.aiProviderConfiguration,
slaDayCount: $Fields.slaDayCount,
projectUpdatesReminderFrequency: $Fields.projectUpdatesReminderFrequency,
allowedAiProviders: $Fields.allowedAiProviders,
users: $Fields.users,
teams: $Fields.teams,
projectStatuses: $Fields.projectStatuses,
integrations: $Fields.integrations,
subscription: $Fields.subscription,
userCount: $Fields.userCount,
createdIssueCount: $Fields.createdIssueCount,
templates: $Fields.templates,
labels: $Fields.labels,
projectLabels: $Fields.projectLabels,
customerCount: $Fields.customerCount,
customersEnabled: $Fields.customersEnabled,
allowMembersToInvite: $Fields.allowMembersToInvite,
restrictTeamCreationToAdmins: $Fields.restrictTeamCreationToAdmins,
restrictLabelManagementToAdmins: $Fields.restrictLabelManagementToAdmins
}
}