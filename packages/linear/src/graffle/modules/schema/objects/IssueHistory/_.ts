import type * as $Fields from './fields.js'

export * as IssueHistory from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A record of changes to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 68 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface IssueHistory {
kind: "Object",
name: "IssueHistory",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
issue: $Fields.issue,
actorId: $Fields.actorId,
updatedDescription: $Fields.updatedDescription,
fromTitle: $Fields.fromTitle,
toTitle: $Fields.toTitle,
fromAssigneeId: $Fields.fromAssigneeId,
toAssigneeId: $Fields.toAssigneeId,
fromPriority: $Fields.fromPriority,
toPriority: $Fields.toPriority,
fromTeamId: $Fields.fromTeamId,
toTeamId: $Fields.toTeamId,
fromParentId: $Fields.fromParentId,
toParentId: $Fields.toParentId,
fromStateId: $Fields.fromStateId,
toStateId: $Fields.toStateId,
fromCycleId: $Fields.fromCycleId,
toCycleId: $Fields.toCycleId,
toConvertedProjectId: $Fields.toConvertedProjectId,
fromProjectId: $Fields.fromProjectId,
toProjectId: $Fields.toProjectId,
fromEstimate: $Fields.fromEstimate,
toEstimate: $Fields.toEstimate,
archived: $Fields.archived,
trashed: $Fields.trashed,
attachmentId: $Fields.attachmentId,
addedLabelIds: $Fields.addedLabelIds,
removedLabelIds: $Fields.removedLabelIds,
addedToReleaseIds: $Fields.addedToReleaseIds,
removedFromReleaseIds: $Fields.removedFromReleaseIds,
relationChanges: $Fields.relationChanges,
autoClosed: $Fields.autoClosed,
autoArchived: $Fields.autoArchived,
fromDueDate: $Fields.fromDueDate,
toDueDate: $Fields.toDueDate,
customerNeedId: $Fields.customerNeedId,
changes: $Fields.changes,
actor: $Fields.actor,
actors: $Fields.actors,
descriptionUpdatedBy: $Fields.descriptionUpdatedBy,
fromAssignee: $Fields.fromAssignee,
toAssignee: $Fields.toAssignee,
fromCycle: $Fields.fromCycle,
toCycle: $Fields.toCycle,
toConvertedProject: $Fields.toConvertedProject,
fromDelegate: $Fields.fromDelegate,
toDelegate: $Fields.toDelegate,
fromProject: $Fields.fromProject,
toProject: $Fields.toProject,
fromState: $Fields.fromState,
toState: $Fields.toState,
fromTeam: $Fields.fromTeam,
toTeam: $Fields.toTeam,
fromParent: $Fields.fromParent,
toParent: $Fields.toParent,
attachment: $Fields.attachment,
issueImport: $Fields.issueImport,
triageResponsibilityNotifiedUsers: $Fields.triageResponsibilityNotifiedUsers,
triageResponsibilityAutoAssigned: $Fields.triageResponsibilityAutoAssigned,
botActor: $Fields.botActor,
addedLabels: $Fields.addedLabels,
removedLabels: $Fields.removedLabels,
addedToReleases: $Fields.addedToReleases,
removedFromReleases: $Fields.removedFromReleases,
triageRuleMetadata: $Fields.triageRuleMetadata
}
}