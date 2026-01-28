import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeSortInput}.
*
* Sort by initiative name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeNameSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeSortInput} |
* | **Path** | `InitiativeSortInput.name` |
* | **Nullability** | Optional |
*/
export interface name {
kind: "InputField",
name: "name",
inlineType: [0, ],
namedType: $Schema.InitiativeNameSort,
type: $Schema.InitiativeNameSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeSortInput}.
*
* Sort by manual order.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeManualSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeSortInput} |
* | **Path** | `InitiativeSortInput.manual` |
* | **Nullability** | Optional |
*/
export interface manual {
kind: "InputField",
name: "manual",
inlineType: [0, ],
namedType: $Schema.InitiativeManualSort,
type: $Schema.InitiativeManualSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeSortInput}.
*
* Sort by initiative update date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeUpdatedAtSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeSortInput} |
* | **Path** | `InitiativeSortInput.updatedAt` |
* | **Nullability** | Optional |
*/
export interface updatedAt {
kind: "InputField",
name: "updatedAt",
inlineType: [0, ],
namedType: $Schema.InitiativeUpdatedAtSort,
type: $Schema.InitiativeUpdatedAtSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeSortInput}.
*
* Sort by initiative creation date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeCreatedAtSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeSortInput} |
* | **Path** | `InitiativeSortInput.createdAt` |
* | **Nullability** | Optional |
*/
export interface createdAt {
kind: "InputField",
name: "createdAt",
inlineType: [0, ],
namedType: $Schema.InitiativeCreatedAtSort,
type: $Schema.InitiativeCreatedAtSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeSortInput}.
*
* Sort by initiative target date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeTargetDateSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeSortInput} |
* | **Path** | `InitiativeSortInput.targetDate` |
* | **Nullability** | Optional |
*/
export interface targetDate {
kind: "InputField",
name: "targetDate",
inlineType: [0, ],
namedType: $Schema.InitiativeTargetDateSort,
type: $Schema.InitiativeTargetDateSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeSortInput}.
*
* Sort by initiative health status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeHealthSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeSortInput} |
* | **Path** | `InitiativeSortInput.health` |
* | **Nullability** | Optional |
*/
export interface health {
kind: "InputField",
name: "health",
inlineType: [0, ],
namedType: $Schema.InitiativeHealthSort,
type: $Schema.InitiativeHealthSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeSortInput}.
*
* Sort by initiative health update date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeHealthUpdatedAtSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeSortInput} |
* | **Path** | `InitiativeSortInput.healthUpdatedAt` |
* | **Nullability** | Optional |
*/
export interface healthUpdatedAt {
kind: "InputField",
name: "healthUpdatedAt",
inlineType: [0, ],
namedType: $Schema.InitiativeHealthUpdatedAtSort,
type: $Schema.InitiativeHealthUpdatedAtSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeSortInput}.
*
* Sort by initiative owner name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeOwnerSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeSortInput} |
* | **Path** | `InitiativeSortInput.owner` |
* | **Nullability** | Optional |
*/
export interface owner {
kind: "InputField",
name: "owner",
inlineType: [0, ],
namedType: $Schema.InitiativeOwnerSort,
type: $Schema.InitiativeOwnerSort['type'] | null | undefined
}