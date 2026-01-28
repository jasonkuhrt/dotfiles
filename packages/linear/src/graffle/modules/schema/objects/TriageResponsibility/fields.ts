import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"TriageResponsibility"`
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
value: "TriageResponsibility"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.TriageResponsibility}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TriageResponsibility} |
* | **Path** | `TriageResponsibility.id` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.TriageResponsibility}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.TriageResponsibility} |
* | **Path** | `TriageResponsibility.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.TriageResponsibility}.
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
* | **Parent** | {@link $Schema.TriageResponsibility} |
* | **Path** | `TriageResponsibility.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.TriageResponsibility}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.TriageResponsibility} |
* | **Path** | `TriageResponsibility.archivedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.TriageResponsibility}.
*
* The action to take when an issue is added to triage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TriageResponsibilityAction}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.TriageResponsibility} |
* | **Path** | `TriageResponsibility.action` |
* | **Nullability** | Required |
*/
export interface action {
kind: "OutputField",
name: "action",
arguments: {},
inlineType: [1, ],
namedType: $Schema.TriageResponsibilityAction
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.TriageResponsibility}.
*
* Set of users used for triage responsibility.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TriageResponsibilityManualSelection} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.TriageResponsibility} |
* | **Path** | `TriageResponsibility.manualSelection` |
* | **Nullability** | Optional |
*/
export interface manualSelection {
kind: "OutputField",
name: "manualSelection",
arguments: {},
inlineType: [0, ],
namedType: $Schema.TriageResponsibilityManualSelection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.TriageResponsibility}.
*
* The team to which the triage responsibility belongs to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Team}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.TriageResponsibility} |
* | **Path** | `TriageResponsibility.team` |
* | **Nullability** | Required |
*/
export interface team {
kind: "OutputField",
name: "team",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Team
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.TriageResponsibility}.
*
* The time schedule used for scheduling.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimeSchedule} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.TriageResponsibility} |
* | **Path** | `TriageResponsibility.timeSchedule` |
* | **Nullability** | Optional |
*/
export interface timeSchedule {
kind: "OutputField",
name: "timeSchedule",
arguments: {},
inlineType: [0, ],
namedType: $Schema.TimeSchedule
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.TriageResponsibility}.
*
* The user currently responsible for triage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.TriageResponsibility} |
* | **Path** | `TriageResponsibility.currentUser` |
* | **Nullability** | Optional |
*/
export interface currentUser {
kind: "OutputField",
name: "currentUser",
arguments: {},
inlineType: [0, ],
namedType: $Schema.User
}
