import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"WorkflowDefinition"`
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
value: "WorkflowDefinition"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.id` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
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
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.archivedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* The name of the workflow.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.name` |
* | **Nullability** | Required |
*/
export interface name {
kind: "OutputField",
name: "name",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* The name of the group that the workflow belongs to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.groupName` |
* | **Nullability** | Optional |
*/
export interface groupName {
kind: "OutputField",
name: "groupName",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* The description of the workflow.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.description` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* The type of the workflow.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowType}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.type` |
* | **Nullability** | Required |
*/
export interface type {
kind: "OutputField",
name: "type",
arguments: {},
inlineType: [1, ],
namedType: $Schema.WorkflowType
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* The type of the event that triggers off the workflow.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowTrigger}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.trigger` |
* | **Nullability** | Required |
*/
export interface trigger {
kind: "OutputField",
name: "trigger",
arguments: {},
inlineType: [1, ],
namedType: $Schema.WorkflowTrigger
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* The object type (e.g. Issue) that triggers this workflow.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowTriggerType}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.triggerType` |
* | **Nullability** | Required |
*/
export interface triggerType {
kind: "OutputField",
name: "triggerType",
arguments: {},
inlineType: [1, ],
namedType: $Schema.WorkflowTriggerType
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* The conditions that need to be match for the workflow to be triggered.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.conditions` |
* | **Nullability** | Optional |
*/
export interface conditions {
kind: "OutputField",
name: "conditions",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.enabled` |
* | **Nullability** | Required |
*/
export interface enabled {
kind: "OutputField",
name: "enabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* The team associated with the workflow. If not set, the workflow is associated with the entire organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Team} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.team` |
* | **Nullability** | Optional |
*/
export interface team {
kind: "OutputField",
name: "team",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Team
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* The user who created the workflow.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.creator` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* An array of activities that will be executed as part of the workflow.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.activities` |
* | **Nullability** | Required |
*/
export interface activities {
kind: "OutputField",
name: "activities",
arguments: {},
inlineType: [1, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* The sort order of the workflow definition within its siblings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.sortOrder` |
* | **Nullability** | Required |
*/
export interface sortOrder {
kind: "OutputField",
name: "sortOrder",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* The date when the workflow was last executed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.lastExecutedAt` |
* | **Nullability** | Optional |
*/
export interface lastExecutedAt {
kind: "OutputField",
name: "lastExecutedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* The user who last updated the workflow.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.lastUpdatedBy` |
* | **Nullability** | Optional |
*/
export interface lastUpdatedBy {
kind: "OutputField",
name: "lastUpdatedBy",
arguments: {},
inlineType: [0, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* The contextual label view associated with the workflow.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabel} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.label` |
* | **Nullability** | Optional |
*/
export interface label {
kind: "OutputField",
name: "label",
arguments: {},
inlineType: [0, ],
namedType: $Schema.IssueLabel
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* The contextual cycle view associated with the workflow.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Cycle} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.cycle` |
* | **Nullability** | Optional |
*/
export interface cycle {
kind: "OutputField",
name: "cycle",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Cycle
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* The contextual user view associated with the workflow.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.user` |
* | **Nullability** | Optional |
*/
export interface user {
kind: "OutputField",
name: "user",
arguments: {},
inlineType: [0, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* The contextual project view associated with the workflow.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Project} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.project` |
* | **Nullability** | Optional |
*/
export interface project {
kind: "OutputField",
name: "project",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Project
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* The contextual initiative view associated with the workflow.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Initiative} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.initiative` |
* | **Nullability** | Optional |
*/
export interface initiative {
kind: "OutputField",
name: "initiative",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Initiative
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* The context custom view associated with the workflow.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomView} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.customView` |
* | **Nullability** | Optional |
*/
export interface customView {
kind: "OutputField",
name: "customView",
arguments: {},
inlineType: [0, ],
namedType: $Schema.CustomView
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* The type of view to which this workflow's context is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ContextViewType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.contextViewType` |
* | **Nullability** | Optional |
*/
export interface contextViewType {
kind: "OutputField",
name: "contextViewType",
arguments: {},
inlineType: [0, ],
namedType: $Schema.ContextViewType
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WorkflowDefinition}.
*
* The type of user view to which this workflow's context is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserContextViewType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.WorkflowDefinition} |
* | **Path** | `WorkflowDefinition.userContextViewType` |
* | **Nullability** | Optional |
*/
export interface userContextViewType {
kind: "OutputField",
name: "userContextViewType",
arguments: {},
inlineType: [0, ],
namedType: $Schema.UserContextViewType
}
