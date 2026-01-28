import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"IssueDraft"`
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
value: "IssueDraft"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.id` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
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
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.archivedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* The draft's title.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.title` |
* | **Nullability** | Required |
*/
export interface title {
kind: "OutputField",
name: "title",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* The draft's description in markdown format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.description` |
* | **Nullability** | Optional |
*/
export interface description {
kind: "OutputField",
name: "description",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* The priority of the draft.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.priority` |
* | **Nullability** | Required |
*/
export interface priority {
kind: "OutputField",
name: "priority",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* The estimate of the complexity of the draft.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.estimate` |
* | **Nullability** | Optional |
*/
export interface estimate {
kind: "OutputField",
name: "estimate",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* The date at which the issue would be due.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimelessDate} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.dueDate` |
* | **Nullability** | Optional |
*/
export interface dueDate {
kind: "OutputField",
name: "dueDate",
arguments: {},
inlineType: [0, ],
namedType: $Schema.TimelessDate
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* The IDs of labels added to the draft.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.labelIds` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface labelIds {
kind: "OutputField",
name: "labelIds",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* The team associated with the draft.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.teamId` |
* | **Nullability** | Required |
*/
export interface teamId {
kind: "OutputField",
name: "teamId",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* The cycle associated with the draft.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.cycleId` |
* | **Nullability** | Optional |
*/
export interface cycleId {
kind: "OutputField",
name: "cycleId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* The project associated with the draft.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.projectId` |
* | **Nullability** | Optional |
*/
export interface projectId {
kind: "OutputField",
name: "projectId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* The project milestone associated with the draft.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.projectMilestoneId` |
* | **Nullability** | Optional |
*/
export interface projectMilestoneId {
kind: "OutputField",
name: "projectMilestoneId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* The user who created the draft.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.creator` |
* | **Nullability** | Required |
*/
export interface creator {
kind: "OutputField",
name: "creator",
arguments: {},
inlineType: [1, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* The user assigned to the draft.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.assigneeId` |
* | **Nullability** | Optional |
*/
export interface assigneeId {
kind: "OutputField",
name: "assigneeId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* The agent user delegated to work on the issue being drafted.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.delegateId` |
* | **Nullability** | Optional |
*/
export interface delegateId {
kind: "OutputField",
name: "delegateId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* The workflow state associated with the draft.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.stateId` |
* | **Nullability** | Required |
*/
export interface stateId {
kind: "OutputField",
name: "stateId",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* The parent draft of the draft.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueDraft} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.parent` |
* | **Nullability** | Optional |
*/
export interface parent {
kind: "OutputField",
name: "parent",
arguments: {},
inlineType: [0, ],
namedType: $Schema.IssueDraft
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* The ID of the parent issue draft, if any.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.parentId` |
* | **Nullability** | Optional |
*/
export interface parentId {
kind: "OutputField",
name: "parentId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* The ID of the comment that the draft was created from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.sourceCommentId` |
* | **Nullability** | Optional |
*/
export interface sourceCommentId {
kind: "OutputField",
name: "sourceCommentId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* The parent issue of the draft.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Issue} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.parentIssue` |
* | **Nullability** | Optional |
*/
export interface parentIssue {
kind: "OutputField",
name: "parentIssue",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Issue
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* The ID of the parent issue, if any.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.parentIssueId` |
* | **Nullability** | Optional |
*/
export interface parentIssueId {
kind: "OutputField",
name: "parentIssueId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* The order of items in the sub-draft list. Only set if the draft has `parent` set.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.subIssueSortOrder` |
* | **Nullability** | Optional |
*/
export interface subIssueSortOrder {
kind: "OutputField",
name: "subIssueSortOrder",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* Label for the priority.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.priorityLabel` |
* | **Nullability** | Required |
*/
export interface priorityLabel {
kind: "OutputField",
name: "priorityLabel",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* [Internal] The draft's description as a Prosemirror document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSON} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.descriptionData` |
* | **Nullability** | Optional |
*/
export interface descriptionData {
kind: "OutputField",
name: "descriptionData",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSON
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* Serialized array of JSONs representing attachments.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.attachments` |
* | **Nullability** | Optional |
*/
export interface attachments {
kind: "OutputField",
name: "attachments",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* Serialized array of JSONs representing customer needs.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.needs` |
* | **Nullability** | Optional |
*/
export interface needs {
kind: "OutputField",
name: "needs",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueDraft}.
*
* Serialized array of JSONs representing the recurring issue's schedule.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueDraft} |
* | **Path** | `IssueDraft.schedule` |
* | **Nullability** | Optional |
*/
export interface schedule {
kind: "OutputField",
name: "schedule",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSONObject
}
