import type * as $Fields from './fields.js'

export * as Team from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* An organizational unit that contains issues.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 84 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface Team {
kind: "Object",
name: "Team",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
name: $Fields.name,
key: $Fields.key,
description: $Fields.description,
icon: $Fields.icon,
color: $Fields.color,
organization: $Fields.organization,
parent: $Fields.parent,
children: $Fields.children,
cyclesEnabled: $Fields.cyclesEnabled,
cycleStartDay: $Fields.cycleStartDay,
cycleDuration: $Fields.cycleDuration,
cycleCooldownTime: $Fields.cycleCooldownTime,
cycleIssueAutoAssignStarted: $Fields.cycleIssueAutoAssignStarted,
cycleIssueAutoAssignCompleted: $Fields.cycleIssueAutoAssignCompleted,
cycleLockToActive: $Fields.cycleLockToActive,
upcomingCycleCount: $Fields.upcomingCycleCount,
timezone: $Fields.timezone,
inheritWorkflowStatuses: $Fields.inheritWorkflowStatuses,
inheritIssueEstimation: $Fields.inheritIssueEstimation,
issueEstimationType: $Fields.issueEstimationType,
issueOrderingNoPriorityFirst: $Fields.issueOrderingNoPriorityFirst,
issueEstimationAllowZero: $Fields.issueEstimationAllowZero,
setIssueSortOrderOnStateChange: $Fields.setIssueSortOrderOnStateChange,
issueEstimationExtended: $Fields.issueEstimationExtended,
defaultIssueEstimate: $Fields.defaultIssueEstimate,
triageEnabled: $Fields.triageEnabled,
requirePriorityToLeaveTriage: $Fields.requirePriorityToLeaveTriage,
defaultIssueState: $Fields.defaultIssueState,
defaultTemplateForMembers: $Fields.defaultTemplateForMembers,
defaultTemplateForMembersId: $Fields.defaultTemplateForMembersId,
defaultTemplateForNonMembers: $Fields.defaultTemplateForNonMembers,
defaultTemplateForNonMembersId: $Fields.defaultTemplateForNonMembersId,
defaultProjectTemplate: $Fields.defaultProjectTemplate,
triageIssueState: $Fields.triageIssueState,
private: $Fields.private,
allMembersCanJoin: $Fields.allMembersCanJoin,
securitySettings: $Fields.securitySettings,
facets: $Fields.facets,
posts: $Fields.posts,
scimManaged: $Fields.scimManaged,
scimGroupName: $Fields.scimGroupName,
progressHistory: $Fields.progressHistory,
currentProgress: $Fields.currentProgress,
draftWorkflowState: $Fields.draftWorkflowState,
startWorkflowState: $Fields.startWorkflowState,
reviewWorkflowState: $Fields.reviewWorkflowState,
mergeableWorkflowState: $Fields.mergeableWorkflowState,
mergeWorkflowState: $Fields.mergeWorkflowState,
groupIssueHistory: $Fields.groupIssueHistory,
aiThreadSummariesEnabled: $Fields.aiThreadSummariesEnabled,
aiDiscussionSummariesEnabled: $Fields.aiDiscussionSummariesEnabled,
slackNewIssue: $Fields.slackNewIssue,
slackIssueComments: $Fields.slackIssueComments,
slackIssueStatuses: $Fields.slackIssueStatuses,
autoClosePeriod: $Fields.autoClosePeriod,
autoCloseStateId: $Fields.autoCloseStateId,
autoArchivePeriod: $Fields.autoArchivePeriod,
autoCloseParentIssues: $Fields.autoCloseParentIssues,
autoCloseChildIssues: $Fields.autoCloseChildIssues,
markedAsDuplicateWorkflowState: $Fields.markedAsDuplicateWorkflowState,
joinByDefault: $Fields.joinByDefault,
cycleCalenderUrl: $Fields.cycleCalenderUrl,
displayName: $Fields.displayName,
issues: $Fields.issues,
issueCount: $Fields.issueCount,
cycles: $Fields.cycles,
activeCycle: $Fields.activeCycle,
triageResponsibility: $Fields.triageResponsibility,
members: $Fields.members,
membership: $Fields.membership,
memberships: $Fields.memberships,
projects: $Fields.projects,
states: $Fields.states,
gitAutomationStates: $Fields.gitAutomationStates,
templates: $Fields.templates,
labels: $Fields.labels,
webhooks: $Fields.webhooks,
integrationsSettings: $Fields.integrationsSettings,
issueSortOrderDefaultToBottom: $Fields.issueSortOrderDefaultToBottom,
inviteHash: $Fields.inviteHash
}
}