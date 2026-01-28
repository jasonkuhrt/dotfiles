import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"IssueSearchResult"`
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
value: "IssueSearchResult"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.id` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
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
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.archivedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The issue's unique number.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.number` |
* | **Nullability** | Required |
*/
interface $number {
kind: "OutputField",
name: "number",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}
export { type $number as number }

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The issue's title.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.title` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The priority of the issue. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.priority` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The estimate of the complexity of the issue..
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.estimate` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The order of the item in its column on the board.
*
* @deprecated Will be removed in near future, please use `sortOrder` instead
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.boardOrder` |
* | **⚠ Deprecated** | Will be removed in near future, please use `sortOrder` instead |
* | **Nullability** | Required |
*/
export interface boardOrder {
kind: "OutputField",
name: "boardOrder",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The order of the item in relation to other items in the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.sortOrder` |
* | **Nullability** | Required |
*/
export interface sortOrder {
kind: "OutputField",
name: "sortOrder",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The order of the item in relation to other items in the organization, when ordered by priority.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.prioritySortOrder` |
* | **Nullability** | Required |
*/
export interface prioritySortOrder {
kind: "OutputField",
name: "prioritySortOrder",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The time at which the issue was moved into started state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.startedAt` |
* | **Nullability** | Optional |
*/
export interface startedAt {
kind: "OutputField",
name: "startedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The time at which the issue was moved into completed state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.completedAt` |
* | **Nullability** | Optional |
*/
export interface completedAt {
kind: "OutputField",
name: "completedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The time at which the issue entered triage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.startedTriageAt` |
* | **Nullability** | Optional |
*/
export interface startedTriageAt {
kind: "OutputField",
name: "startedTriageAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The time at which the issue left triage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.triagedAt` |
* | **Nullability** | Optional |
*/
export interface triagedAt {
kind: "OutputField",
name: "triagedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The time at which the issue was moved into canceled state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.canceledAt` |
* | **Nullability** | Optional |
*/
export interface canceledAt {
kind: "OutputField",
name: "canceledAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The time at which the issue was automatically closed by the auto pruning process.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.autoClosedAt` |
* | **Nullability** | Optional |
*/
export interface autoClosedAt {
kind: "OutputField",
name: "autoClosedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The time at which the issue was automatically archived by the auto pruning process.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.autoArchivedAt` |
* | **Nullability** | Optional |
*/
export interface autoArchivedAt {
kind: "OutputField",
name: "autoArchivedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The date at which the issue is due.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimelessDate} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.dueDate` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The time at which the issue's SLA began.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.slaStartedAt` |
* | **Nullability** | Optional |
*/
export interface slaStartedAt {
kind: "OutputField",
name: "slaStartedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The time at which the issue's SLA will enter medium risk state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.slaMediumRiskAt` |
* | **Nullability** | Optional |
*/
export interface slaMediumRiskAt {
kind: "OutputField",
name: "slaMediumRiskAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The time at which the issue's SLA will enter high risk state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.slaHighRiskAt` |
* | **Nullability** | Optional |
*/
export interface slaHighRiskAt {
kind: "OutputField",
name: "slaHighRiskAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The time at which the issue's SLA will breach.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.slaBreachesAt` |
* | **Nullability** | Optional |
*/
export interface slaBreachesAt {
kind: "OutputField",
name: "slaBreachesAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The type of SLA set on the issue. Calendar days or business days.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.slaType` |
* | **Nullability** | Optional |
*/
export interface slaType {
kind: "OutputField",
name: "slaType",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The time at which the issue was added to a project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.addedToProjectAt` |
* | **Nullability** | Optional |
*/
export interface addedToProjectAt {
kind: "OutputField",
name: "addedToProjectAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The time at which the issue was added to a cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.addedToCycleAt` |
* | **Nullability** | Optional |
*/
export interface addedToCycleAt {
kind: "OutputField",
name: "addedToCycleAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The time at which the issue was added to a team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.addedToTeamAt` |
* | **Nullability** | Optional |
*/
export interface addedToTeamAt {
kind: "OutputField",
name: "addedToTeamAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* A flag that indicates whether the issue is in the trash bin.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.trashed` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The time until an issue will be snoozed in Triage view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.snoozedUntilAt` |
* | **Nullability** | Optional |
*/
export interface snoozedUntilAt {
kind: "OutputField",
name: "snoozedUntilAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* [Internal] The time at which the most recent suggestions for this issue were generated.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.suggestionsGeneratedAt` |
* | **Nullability** | Optional |
*/
export interface suggestionsGeneratedAt {
kind: "OutputField",
name: "suggestionsGeneratedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* [Internal] The activity summary information for this issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.activitySummary` |
* | **Nullability** | Optional |
*/
export interface activitySummary {
kind: "OutputField",
name: "activitySummary",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* Id of the labels associated with this issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.labelIds` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The team that the issue is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Team}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.team` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The cycle that the issue is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Cycle} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.cycle` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The project that the issue is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Project} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.project` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The projectMilestone that the issue is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestone} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.projectMilestone` |
* | **Nullability** | Optional |
*/
export interface projectMilestone {
kind: "OutputField",
name: "projectMilestone",
arguments: {},
inlineType: [0, ],
namedType: $Schema.ProjectMilestone
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The last template that was applied to this issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Template} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.lastAppliedTemplate` |
* | **Nullability** | Optional |
*/
export interface lastAppliedTemplate {
kind: "OutputField",
name: "lastAppliedTemplate",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Template
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The recurring issue template that created this issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Template} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.recurringIssueTemplate` |
* | **Nullability** | Optional |
*/
export interface recurringIssueTemplate {
kind: "OutputField",
name: "recurringIssueTemplate",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Template
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* Previous identifiers of the issue if it has been moved between teams.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.previousIdentifiers` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface previousIdentifiers {
kind: "OutputField",
name: "previousIdentifiers",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The user who created the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.creator` |
* | **Nullability** | Optional |
*/
export interface creator {
kind: "OutputField",
name: "creator",
arguments: {},
inlineType: [0, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The external user who created the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ExternalUser} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.externalUserCreator` |
* | **Nullability** | Optional |
*/
export interface externalUserCreator {
kind: "OutputField",
name: "externalUserCreator",
arguments: {},
inlineType: [0, ],
namedType: $Schema.ExternalUser
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The user to whom the issue is assigned to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.assignee` |
* | **Nullability** | Optional |
*/
export interface assignee {
kind: "OutputField",
name: "assignee",
arguments: {},
inlineType: [0, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The agent user that is delegated to work on this issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.delegate` |
* | **Nullability** | Optional |
*/
export interface delegate {
kind: "OutputField",
name: "delegate",
arguments: {},
inlineType: [0, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The user who snoozed the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.snoozedBy` |
* | **Nullability** | Optional |
*/
export interface snoozedBy {
kind: "OutputField",
name: "snoozedBy",
arguments: {},
inlineType: [0, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The workflow state that the issue is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowState}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.state` |
* | **Nullability** | Required |
*/
export interface state {
kind: "OutputField",
name: "state",
arguments: {},
inlineType: [1, ],
namedType: $Schema.WorkflowState
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The order of the item in the sub-issue list. Only set if the issue has a parent.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.subIssueSortOrder` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* Emoji reaction summary, grouped by emoji type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.reactionData` |
* | **Nullability** | Required |
*/
export interface reactionData {
kind: "OutputField",
name: "reactionData",
arguments: {},
inlineType: [1, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* Label for the priority.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.priorityLabel` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The comment that this issue was created from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Comment} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.sourceComment` |
* | **Nullability** | Optional |
*/
export interface sourceComment {
kind: "OutputField",
name: "sourceComment",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Comment
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* Integration type that created this issue, if applicable.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationService} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.integrationSourceType` |
* | **Nullability** | Optional |
*/
export interface integrationSourceType {
kind: "OutputField",
name: "integrationSourceType",
arguments: {},
inlineType: [0, ],
namedType: $Schema.IntegrationService
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* Documents associated with the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.documents` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface documents {
kind: "OutputField",
name: "documents",
arguments: {
/**
* Filter returned documents.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.DocumentFilter
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.DocumentConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The bot that created the issue, if applicable.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ActorBot} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.botActor` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The users favorite associated with this issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Favorite} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.favorite` |
* | **Nullability** | Optional |
*/
export interface favorite {
kind: "OutputField",
name: "favorite",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Favorite
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* Issue's human readable identifier (e.g. ENG-123).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.identifier` |
* | **Nullability** | Required |
*/
export interface identifier {
kind: "OutputField",
name: "identifier",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* Issue URL.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.url` |
* | **Nullability** | Required |
*/
export interface url {
kind: "OutputField",
name: "url",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* Suggested branch name for the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.branchName` |
* | **Nullability** | Required |
*/
export interface branchName {
kind: "OutputField",
name: "branchName",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* Returns the number of Attachment resources which are created by customer support ticketing systems (e.g. Zendesk).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Int}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.customerTicketCount` |
* | **Nullability** | Required |
*/
export interface customerTicketCount {
kind: "OutputField",
name: "customerTicketCount",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Int
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* Users who are subscribed to the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.subscribers` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
export interface subscribers {
kind: "OutputField",
name: "subscribers",
arguments: {
/**
* Filter returned subscribers.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.UserFilter
},
/**
* Should query return disabled/suspended users (default: false).
*/
includeDisabled: {
kind: "InputField",
name: "includeDisabled",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.UserConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The parent of the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Issue} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.parent` |
* | **Nullability** | Optional |
*/
export interface parent {
kind: "OutputField",
name: "parent",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Issue
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* Children of the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.children` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface children {
kind: "OutputField",
name: "children",
arguments: {
/**
* Filter returned issues.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.IssueFilter
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.IssueConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* Comments associated with the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CommentConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.comments` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface comments {
kind: "OutputField",
name: "comments",
arguments: {
/**
* Filter returned comments.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.CommentFilter
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.CommentConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* History entries associated with the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueHistoryConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.history` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface history {
kind: "OutputField",
name: "history",
arguments: {
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.IssueHistoryConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* Labels associated with this issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabelConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.labels` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface labels {
kind: "OutputField",
name: "labels",
arguments: {
/**
* Filter returned issue labels.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.IssueLabelFilter
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.IssueLabelConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* Relations associated with this issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueRelationConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.relations` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface relations {
kind: "OutputField",
name: "relations",
arguments: {
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.IssueRelationConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* Inverse relations associated with this issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueRelationConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.inverseRelations` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface inverseRelations {
kind: "OutputField",
name: "inverseRelations",
arguments: {
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.IssueRelationConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* Attachments associated with the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.attachments` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface attachments {
kind: "OutputField",
name: "attachments",
arguments: {
/**
* Filter returned attachments.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.AttachmentFilter
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.AttachmentConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* Attachments previously associated with the issue before being moved to another issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.formerAttachments` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface formerAttachments {
kind: "OutputField",
name: "formerAttachments",
arguments: {
/**
* Filter returned attachments.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.AttachmentFilter
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.AttachmentConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The issue's description in markdown format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.description` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* [Internal] The issue's description content as YJS state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.descriptionState` |
* | **Nullability** | Optional |
*/
export interface descriptionState {
kind: "OutputField",
name: "descriptionState",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* [ALPHA] The document content representing this issue description.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentContent} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.documentContent` |
* | **Nullability** | Optional |
*/
export interface documentContent {
kind: "OutputField",
name: "documentContent",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DocumentContent
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* Reactions associated with the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Reaction}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.reactions` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface reactions {
kind: "OutputField",
name: "reactions",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.Reaction
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* Customer needs associated with the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeedConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.needs` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface needs {
kind: "OutputField",
name: "needs",
arguments: {
/**
* Filter returned needs.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.CustomerNeedFilter
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.CustomerNeedConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* Customer needs previously associated with the issue before being moved to another issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeedConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.formerNeeds` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface formerNeeds {
kind: "OutputField",
name: "formerNeeds",
arguments: {
/**
* Filter returned needs.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.CustomerNeedFilter
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.CustomerNeedConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The external services the issue is synced with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ExternalEntityInfo}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.syncedWith` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface syncedWith {
kind: "OutputField",
name: "syncedWith",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.ExternalEntityInfo
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* [Internal] Product Intelligence suggestions for the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueSuggestionConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.suggestions` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface suggestions {
kind: "OutputField",
name: "suggestions",
arguments: {
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.IssueSuggestionConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* [Internal] Incoming product intelligence relation suggestions for the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueSuggestionConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.incomingSuggestions` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface incomingSuggestions {
kind: "OutputField",
name: "incomingSuggestions",
arguments: {
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.IssueSuggestionConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The internal user who requested creation of the Asks issue on behalf of the creator.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.asksRequester` |
* | **Nullability** | Optional |
*/
export interface asksRequester {
kind: "OutputField",
name: "asksRequester",
arguments: {},
inlineType: [0, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* The external user who requested creation of the Asks issue on behalf of the creator.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ExternalUser} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.asksExternalUserRequester` |
* | **Nullability** | Optional |
*/
export interface asksExternalUserRequester {
kind: "OutputField",
name: "asksExternalUserRequester",
arguments: {},
inlineType: [0, ],
namedType: $Schema.ExternalUser
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* [ALPHA] The issue's workflow states over time.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueStateSpanConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.stateHistory` |
* | **Nullability** | Required |
* | **Arguments** | 4 |
*/
export interface stateHistory {
kind: "OutputField",
name: "stateHistory",
arguments: {
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
}
},
inlineType: [1, ],
namedType: $Schema.IssueStateSpanConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchResult}.
*
* Metadata related to search result.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueSearchResult} |
* | **Path** | `IssueSearchResult.metadata` |
* | **Nullability** | Required |
*/
export interface metadata {
kind: "OutputField",
name: "metadata",
arguments: {},
inlineType: [1, ],
namedType: $Schema.JSONObject
}
