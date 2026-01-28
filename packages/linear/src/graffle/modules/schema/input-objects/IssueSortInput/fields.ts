import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* Sort by priority
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PrioritySort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.priority` |
* | **Nullability** | Optional |
*/
export interface priority {
kind: "InputField",
name: "priority",
inlineType: [0, ],
namedType: $Schema.PrioritySort,
type: $Schema.PrioritySort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* Sort by estimate
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EstimateSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.estimate` |
* | **Nullability** | Optional |
*/
export interface estimate {
kind: "InputField",
name: "estimate",
inlineType: [0, ],
namedType: $Schema.EstimateSort,
type: $Schema.EstimateSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* Sort by issue title
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TitleSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.title` |
* | **Nullability** | Optional |
*/
export interface title {
kind: "InputField",
name: "title",
inlineType: [0, ],
namedType: $Schema.TitleSort,
type: $Schema.TitleSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* Sort by label
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.LabelSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.label` |
* | **Nullability** | Optional |
*/
export interface label {
kind: "InputField",
name: "label",
inlineType: [0, ],
namedType: $Schema.LabelSort,
type: $Schema.LabelSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* Sort by label group
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.LabelGroupSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.labelGroup` |
* | **Nullability** | Optional |
*/
export interface labelGroup {
kind: "InputField",
name: "labelGroup",
inlineType: [0, ],
namedType: $Schema.LabelGroupSort,
type: $Schema.LabelGroupSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* Sort by SLA status
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SlaStatusSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.slaStatus` |
* | **Nullability** | Optional |
*/
export interface slaStatus {
kind: "InputField",
name: "slaStatus",
inlineType: [0, ],
namedType: $Schema.SlaStatusSort,
type: $Schema.SlaStatusSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* Sort by issue creation date
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CreatedAtSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.createdAt` |
* | **Nullability** | Optional |
*/
export interface createdAt {
kind: "InputField",
name: "createdAt",
inlineType: [0, ],
namedType: $Schema.CreatedAtSort,
type: $Schema.CreatedAtSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* Sort by issue update date
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UpdatedAtSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.updatedAt` |
* | **Nullability** | Optional |
*/
export interface updatedAt {
kind: "InputField",
name: "updatedAt",
inlineType: [0, ],
namedType: $Schema.UpdatedAtSort,
type: $Schema.UpdatedAtSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* Sort by issue completion date
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CompletedAtSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.completedAt` |
* | **Nullability** | Optional |
*/
export interface completedAt {
kind: "InputField",
name: "completedAt",
inlineType: [0, ],
namedType: $Schema.CompletedAtSort,
type: $Schema.CompletedAtSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* Sort by issue due date
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DueDateSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.dueDate` |
* | **Nullability** | Optional |
*/
export interface dueDate {
kind: "InputField",
name: "dueDate",
inlineType: [0, ],
namedType: $Schema.DueDateSort,
type: $Schema.DueDateSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* [Internal] Sort by the accumulated time in the current workflow state
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimeInStatusSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.accumulatedStateUpdatedAt` |
* | **Nullability** | Optional |
*/
export interface accumulatedStateUpdatedAt {
kind: "InputField",
name: "accumulatedStateUpdatedAt",
inlineType: [0, ],
namedType: $Schema.TimeInStatusSort,
type: $Schema.TimeInStatusSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* Sort by Cycle start date
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CycleSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.cycle` |
* | **Nullability** | Optional |
*/
export interface cycle {
kind: "InputField",
name: "cycle",
inlineType: [0, ],
namedType: $Schema.CycleSort,
type: $Schema.CycleSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* Sort by Project Milestone target date
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.MilestoneSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.milestone` |
* | **Nullability** | Optional |
*/
export interface milestone {
kind: "InputField",
name: "milestone",
inlineType: [0, ],
namedType: $Schema.MilestoneSort,
type: $Schema.MilestoneSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* Sort by assignee name
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AssigneeSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.assignee` |
* | **Nullability** | Optional |
*/
export interface assignee {
kind: "InputField",
name: "assignee",
inlineType: [0, ],
namedType: $Schema.AssigneeSort,
type: $Schema.AssigneeSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* Sort by delegate name
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DelegateSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.delegate` |
* | **Nullability** | Optional |
*/
export interface delegate {
kind: "InputField",
name: "delegate",
inlineType: [0, ],
namedType: $Schema.DelegateSort,
type: $Schema.DelegateSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* Sort by Project name
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.project` |
* | **Nullability** | Optional |
*/
export interface project {
kind: "InputField",
name: "project",
inlineType: [0, ],
namedType: $Schema.ProjectSort,
type: $Schema.ProjectSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* Sort by Team name
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.team` |
* | **Nullability** | Optional |
*/
export interface team {
kind: "InputField",
name: "team",
inlineType: [0, ],
namedType: $Schema.TeamSort,
type: $Schema.TeamSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* Sort by manual order
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ManualSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.manual` |
* | **Nullability** | Optional |
*/
export interface manual {
kind: "InputField",
name: "manual",
inlineType: [0, ],
namedType: $Schema.ManualSort,
type: $Schema.ManualSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* Sort by workflow state type
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowStateSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.workflowState` |
* | **Nullability** | Optional |
*/
export interface workflowState {
kind: "InputField",
name: "workflowState",
inlineType: [0, ],
namedType: $Schema.WorkflowStateSort,
type: $Schema.WorkflowStateSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* Sort by customer name
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.customer` |
* | **Nullability** | Optional |
*/
export interface customer {
kind: "InputField",
name: "customer",
inlineType: [0, ],
namedType: $Schema.CustomerSort,
type: $Schema.CustomerSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* Sort by customer revenue
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerRevenueSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.customerRevenue` |
* | **Nullability** | Optional |
*/
export interface customerRevenue {
kind: "InputField",
name: "customerRevenue",
inlineType: [0, ],
namedType: $Schema.CustomerRevenueSort,
type: $Schema.CustomerRevenueSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* Sort by number of customers associated with the issue
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerCountSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.customerCount` |
* | **Nullability** | Optional |
*/
export interface customerCount {
kind: "InputField",
name: "customerCount",
inlineType: [0, ],
namedType: $Schema.CustomerCountSort,
type: $Schema.CustomerCountSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* Sort by number of important customers associated with the issue
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerImportantCountSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.customerImportantCount` |
* | **Nullability** | Optional |
*/
export interface customerImportantCount {
kind: "InputField",
name: "customerImportantCount",
inlineType: [0, ],
namedType: $Schema.CustomerImportantCountSort,
type: $Schema.CustomerImportantCountSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* Sort by the root issue
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RootIssueSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.rootIssue` |
* | **Nullability** | Optional |
*/
export interface rootIssue {
kind: "InputField",
name: "rootIssue",
inlineType: [0, ],
namedType: $Schema.RootIssueSort,
type: $Schema.RootIssueSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSortInput}.
*
* [ALPHA] Sort by number of links associated with the issue
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.LinkCountSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSortInput} |
* | **Path** | `IssueSortInput.linkCount` |
* | **Nullability** | Optional |
*/
export interface linkCount {
kind: "InputField",
name: "linkCount",
inlineType: [0, ],
namedType: $Schema.LinkCountSort,
type: $Schema.LinkCountSort['type'] | null | undefined
}