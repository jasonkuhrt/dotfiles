import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectSortInput}.
*
* Sort by project name
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectNameSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectSortInput} |
* | **Path** | `ProjectSortInput.name` |
* | **Nullability** | Optional |
*/
export interface name {
kind: "InputField",
name: "name",
inlineType: [0, ],
namedType: $Schema.ProjectNameSort,
type: $Schema.ProjectNameSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectSortInput}.
*
* Sort by project status
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectStatusSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectSortInput} |
* | **Path** | `ProjectSortInput.status` |
* | **Nullability** | Optional |
*/
export interface status {
kind: "InputField",
name: "status",
inlineType: [0, ],
namedType: $Schema.ProjectStatusSort,
type: $Schema.ProjectStatusSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectSortInput}.
*
* Sort by project priority
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectPrioritySort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectSortInput} |
* | **Path** | `ProjectSortInput.priority` |
* | **Nullability** | Optional |
*/
export interface priority {
kind: "InputField",
name: "priority",
inlineType: [0, ],
namedType: $Schema.ProjectPrioritySort,
type: $Schema.ProjectPrioritySort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectSortInput}.
*
* Sort by manual order
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectManualSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectSortInput} |
* | **Path** | `ProjectSortInput.manual` |
* | **Nullability** | Optional |
*/
export interface manual {
kind: "InputField",
name: "manual",
inlineType: [0, ],
namedType: $Schema.ProjectManualSort,
type: $Schema.ProjectManualSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectSortInput}.
*
* Sort by project target date
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TargetDateSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectSortInput} |
* | **Path** | `ProjectSortInput.targetDate` |
* | **Nullability** | Optional |
*/
export interface targetDate {
kind: "InputField",
name: "targetDate",
inlineType: [0, ],
namedType: $Schema.TargetDateSort,
type: $Schema.TargetDateSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectSortInput}.
*
* Sort by project start date
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StartDateSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectSortInput} |
* | **Path** | `ProjectSortInput.startDate` |
* | **Nullability** | Optional |
*/
export interface startDate {
kind: "InputField",
name: "startDate",
inlineType: [0, ],
namedType: $Schema.StartDateSort,
type: $Schema.StartDateSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectSortInput}.
*
* Sort by project creation date
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectCreatedAtSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectSortInput} |
* | **Path** | `ProjectSortInput.createdAt` |
* | **Nullability** | Optional |
*/
export interface createdAt {
kind: "InputField",
name: "createdAt",
inlineType: [0, ],
namedType: $Schema.ProjectCreatedAtSort,
type: $Schema.ProjectCreatedAtSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectSortInput}.
*
* Sort by project update date
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdatedAtSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectSortInput} |
* | **Path** | `ProjectSortInput.updatedAt` |
* | **Nullability** | Optional |
*/
export interface updatedAt {
kind: "InputField",
name: "updatedAt",
inlineType: [0, ],
namedType: $Schema.ProjectUpdatedAtSort,
type: $Schema.ProjectUpdatedAtSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectSortInput}.
*
* Sort by project health status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectHealthSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectSortInput} |
* | **Path** | `ProjectSortInput.health` |
* | **Nullability** | Optional |
*/
export interface health {
kind: "InputField",
name: "health",
inlineType: [0, ],
namedType: $Schema.ProjectHealthSort,
type: $Schema.ProjectHealthSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectSortInput}.
*
* Sort by project lead name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectLeadSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectSortInput} |
* | **Path** | `ProjectSortInput.lead` |
* | **Nullability** | Optional |
*/
export interface lead {
kind: "InputField",
name: "lead",
inlineType: [0, ],
namedType: $Schema.ProjectLeadSort,
type: $Schema.ProjectLeadSort['type'] | null | undefined
}