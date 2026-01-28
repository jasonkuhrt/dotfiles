import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"IssueHistory"`
*
* {@link https://graphql.org/learn/queries/#meta-fields | GraphQL __typename documentation}
*/
export interface __typename {
kind: "OutputField",
name: "__typename",
arguments: {},
inlineType: [1],
namedType: {
kind: "__typename",
value: "IssueHistory"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "OutputField",
name: "id",
arguments: {},
inlineType: [1, ],
namedType: $Schema.ID
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.createdAt` |
* | **Nullability** | Required |
*/
export interface createdAt {
kind: "OutputField",
name: "createdAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
* been updated after creation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.updatedAt` |
* | **Nullability** | Required |
*/
export interface updatedAt {
kind: "OutputField",
name: "updatedAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.archivedAt` |
* | **Nullability** | Optional |
*/
export interface archivedAt {
kind: "OutputField",
name: "archivedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The issue that was changed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Issue}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.issue` |
* | **Nullability** | Required |
*/
export interface issue {
kind: "OutputField",
name: "issue",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Issue
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The id of user who made these changes. If null, possibly means that the change made by an integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.actorId` |
* | **Nullability** | Optional |
*/
export interface actorId {
kind: "OutputField",
name: "actorId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* Whether the issue's description was updated.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.updatedDescription` |
* | **Nullability** | Optional |
*/
export interface updatedDescription {
kind: "OutputField",
name: "updatedDescription",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* What the title was changed from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.fromTitle` |
* | **Nullability** | Optional |
*/
export interface fromTitle {
kind: "OutputField",
name: "fromTitle",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* What the title was changed to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.toTitle` |
* | **Nullability** | Optional |
*/
export interface toTitle {
kind: "OutputField",
name: "toTitle",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The id of user from whom the issue was re-assigned from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.fromAssigneeId` |
* | **Nullability** | Optional |
*/
export interface fromAssigneeId {
kind: "OutputField",
name: "fromAssigneeId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The id of user to whom the issue was assigned to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.toAssigneeId` |
* | **Nullability** | Optional |
*/
export interface toAssigneeId {
kind: "OutputField",
name: "toAssigneeId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* What the priority was changed from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.fromPriority` |
* | **Nullability** | Optional |
*/
export interface fromPriority {
kind: "OutputField",
name: "fromPriority",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* What the priority was changed to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.toPriority` |
* | **Nullability** | Optional |
*/
export interface toPriority {
kind: "OutputField",
name: "toPriority",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The id of team from which the issue was moved from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.fromTeamId` |
* | **Nullability** | Optional |
*/
export interface fromTeamId {
kind: "OutputField",
name: "fromTeamId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The id of team to which the issue was moved to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.toTeamId` |
* | **Nullability** | Optional |
*/
export interface toTeamId {
kind: "OutputField",
name: "toTeamId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The id of previous parent of the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.fromParentId` |
* | **Nullability** | Optional |
*/
export interface fromParentId {
kind: "OutputField",
name: "fromParentId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The id of new parent of the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.toParentId` |
* | **Nullability** | Optional |
*/
export interface toParentId {
kind: "OutputField",
name: "toParentId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The id of previous workflow state of the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.fromStateId` |
* | **Nullability** | Optional |
*/
export interface fromStateId {
kind: "OutputField",
name: "fromStateId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The id of new workflow state of the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.toStateId` |
* | **Nullability** | Optional |
*/
export interface toStateId {
kind: "OutputField",
name: "toStateId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The id of previous cycle of the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.fromCycleId` |
* | **Nullability** | Optional |
*/
export interface fromCycleId {
kind: "OutputField",
name: "fromCycleId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The id of new cycle of the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.toCycleId` |
* | **Nullability** | Optional |
*/
export interface toCycleId {
kind: "OutputField",
name: "toCycleId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The id of new project created from the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.toConvertedProjectId` |
* | **Nullability** | Optional |
*/
export interface toConvertedProjectId {
kind: "OutputField",
name: "toConvertedProjectId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The id of previous project of the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.fromProjectId` |
* | **Nullability** | Optional |
*/
export interface fromProjectId {
kind: "OutputField",
name: "fromProjectId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The id of new project of the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.toProjectId` |
* | **Nullability** | Optional |
*/
export interface toProjectId {
kind: "OutputField",
name: "toProjectId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* What the estimate was changed from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.fromEstimate` |
* | **Nullability** | Optional |
*/
export interface fromEstimate {
kind: "OutputField",
name: "fromEstimate",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* What the estimate was changed to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.toEstimate` |
* | **Nullability** | Optional |
*/
export interface toEstimate {
kind: "OutputField",
name: "toEstimate",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* Whether the issue is archived at the time of this history entry.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.archived` |
* | **Nullability** | Optional |
*/
export interface archived {
kind: "OutputField",
name: "archived",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* Whether the issue was trashed or un-trashed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.trashed` |
* | **Nullability** | Optional |
*/
export interface trashed {
kind: "OutputField",
name: "trashed",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The id of linked attachment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.attachmentId` |
* | **Nullability** | Optional |
*/
export interface attachmentId {
kind: "OutputField",
name: "attachmentId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* ID's of labels that were added.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.addedLabelIds` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface addedLabelIds {
kind: "OutputField",
name: "addedLabelIds",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* ID's of labels that were removed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.removedLabelIds` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface removedLabelIds {
kind: "OutputField",
name: "removedLabelIds",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* [ALPHA] ID's of releases that the issue was added to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.addedToReleaseIds` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface addedToReleaseIds {
kind: "OutputField",
name: "addedToReleaseIds",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* [ALPHA] ID's of releases that the issue was removed from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.removedFromReleaseIds` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface removedFromReleaseIds {
kind: "OutputField",
name: "removedFromReleaseIds",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* Changed issue relationships.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueRelationHistoryPayload}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.relationChanges` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface relationChanges {
kind: "OutputField",
name: "relationChanges",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.IssueRelationHistoryPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* Whether the issue was auto-closed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.autoClosed` |
* | **Nullability** | Optional |
*/
export interface autoClosed {
kind: "OutputField",
name: "autoClosed",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* Whether the issue was auto-archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.autoArchived` |
* | **Nullability** | Optional |
*/
export interface autoArchived {
kind: "OutputField",
name: "autoArchived",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* What the due date was changed from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimelessDate} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.fromDueDate` |
* | **Nullability** | Optional |
*/
export interface fromDueDate {
kind: "OutputField",
name: "fromDueDate",
arguments: {},
inlineType: [0, ],
namedType: $Schema.TimelessDate
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* What the due date was changed to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimelessDate} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.toDueDate` |
* | **Nullability** | Optional |
*/
export interface toDueDate {
kind: "OutputField",
name: "toDueDate",
arguments: {},
inlineType: [0, ],
namedType: $Schema.TimelessDate
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The id of linked customer need.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.customerNeedId` |
* | **Nullability** | Optional |
*/
export interface customerNeedId {
kind: "OutputField",
name: "customerNeedId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* [Internal] Serialized JSON representing changes for certain non-relational properties.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.changes` |
* | **Nullability** | Optional |
*/
export interface changes {
kind: "OutputField",
name: "changes",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The actor that performed the actions. This field may be empty in the case of integrations or automations.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.actor` |
* | **Nullability** | Optional |
*/
export interface actor {
kind: "OutputField",
name: "actor",
arguments: {},
inlineType: [0, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The actors that performed the actions. This field may be empty in the case of integrations or automations.
*
* @deprecated Use `actor` and `descriptionUpdatedBy` instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.actors` |
* | **⚠ Deprecated** | Use `actor` and `descriptionUpdatedBy` instead. |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface actors {
kind: "OutputField",
name: "actors",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The actors that edited the description of the issue, if any.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.descriptionUpdatedBy` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface descriptionUpdatedBy {
kind: "OutputField",
name: "descriptionUpdatedBy",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The user that was unassigned from the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.fromAssignee` |
* | **Nullability** | Optional |
*/
export interface fromAssignee {
kind: "OutputField",
name: "fromAssignee",
arguments: {},
inlineType: [0, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The user that was assigned to the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.toAssignee` |
* | **Nullability** | Optional |
*/
export interface toAssignee {
kind: "OutputField",
name: "toAssignee",
arguments: {},
inlineType: [0, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The cycle that the issue was moved from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Cycle} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.fromCycle` |
* | **Nullability** | Optional |
*/
export interface fromCycle {
kind: "OutputField",
name: "fromCycle",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Cycle
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The cycle that the issue was moved to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Cycle} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.toCycle` |
* | **Nullability** | Optional |
*/
export interface toCycle {
kind: "OutputField",
name: "toCycle",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Cycle
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The new project created from the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Project} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.toConvertedProject` |
* | **Nullability** | Optional |
*/
export interface toConvertedProject {
kind: "OutputField",
name: "toConvertedProject",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Project
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The app user from whom the issue delegation was transferred.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.fromDelegate` |
* | **Nullability** | Optional |
*/
export interface fromDelegate {
kind: "OutputField",
name: "fromDelegate",
arguments: {},
inlineType: [0, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The app user to whom the issue delegation was transferred.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.toDelegate` |
* | **Nullability** | Optional |
*/
export interface toDelegate {
kind: "OutputField",
name: "toDelegate",
arguments: {},
inlineType: [0, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The project that the issue was moved from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Project} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.fromProject` |
* | **Nullability** | Optional |
*/
export interface fromProject {
kind: "OutputField",
name: "fromProject",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Project
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The project that the issue was moved to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Project} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.toProject` |
* | **Nullability** | Optional |
*/
export interface toProject {
kind: "OutputField",
name: "toProject",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Project
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The state that the issue was moved from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowState} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.fromState` |
* | **Nullability** | Optional |
*/
export interface fromState {
kind: "OutputField",
name: "fromState",
arguments: {},
inlineType: [0, ],
namedType: $Schema.WorkflowState
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The state that the issue was moved to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowState} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.toState` |
* | **Nullability** | Optional |
*/
export interface toState {
kind: "OutputField",
name: "toState",
arguments: {},
inlineType: [0, ],
namedType: $Schema.WorkflowState
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The team that the issue was moved from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Team} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.fromTeam` |
* | **Nullability** | Optional |
*/
export interface fromTeam {
kind: "OutputField",
name: "fromTeam",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Team
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The team that the issue was moved to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Team} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.toTeam` |
* | **Nullability** | Optional |
*/
export interface toTeam {
kind: "OutputField",
name: "toTeam",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Team
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The parent issue that the issue was moved from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Issue} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.fromParent` |
* | **Nullability** | Optional |
*/
export interface fromParent {
kind: "OutputField",
name: "fromParent",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Issue
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The parent issue that the issue was moved to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Issue} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.toParent` |
* | **Nullability** | Optional |
*/
export interface toParent {
kind: "OutputField",
name: "toParent",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Issue
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The linked attachment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Attachment} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.attachment` |
* | **Nullability** | Optional |
*/
export interface attachment {
kind: "OutputField",
name: "attachment",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Attachment
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The import record.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImport} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.issueImport` |
* | **Nullability** | Optional |
*/
export interface issueImport {
kind: "OutputField",
name: "issueImport",
arguments: {},
inlineType: [0, ],
namedType: $Schema.IssueImport
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The users that were notified of the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.triageResponsibilityNotifiedUsers` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface triageResponsibilityNotifiedUsers {
kind: "OutputField",
name: "triageResponsibilityNotifiedUsers",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* Boolean indicating if the issue was auto-assigned using the triage responsibility feature.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.triageResponsibilityAutoAssigned` |
* | **Nullability** | Optional |
*/
export interface triageResponsibilityAutoAssigned {
kind: "OutputField",
name: "triageResponsibilityAutoAssigned",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The bot that performed the action.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ActorBot} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.botActor` |
* | **Nullability** | Optional |
*/
export interface botActor {
kind: "OutputField",
name: "botActor",
arguments: {},
inlineType: [0, ],
namedType: $Schema.ActorBot
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The labels that were added to the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabel}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.addedLabels` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface addedLabels {
kind: "OutputField",
name: "addedLabels",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.IssueLabel
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The labels that were removed from the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabel}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.removedLabels` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface removedLabels {
kind: "OutputField",
name: "removedLabels",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.IssueLabel
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The releases that the issue was added to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Release}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.addedToReleases` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface addedToReleases {
kind: "OutputField",
name: "addedToReleases",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.Release
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* The releases that the issue was removed from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Release}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.removedFromReleases` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface removedFromReleases {
kind: "OutputField",
name: "removedFromReleases",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.Release
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueHistory}.
*
* [INTERNAL] Metadata about the triage rule that made changes to the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueHistoryTriageRuleMetadata} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueHistory} |
* | **Path** | `IssueHistory.triageRuleMetadata` |
* | **Nullability** | Optional |
*/
export interface triageRuleMetadata {
kind: "OutputField",
name: "triageRuleMetadata",
arguments: {},
inlineType: [0, ],
namedType: $Schema.IssueHistoryTriageRuleMetadata
}
