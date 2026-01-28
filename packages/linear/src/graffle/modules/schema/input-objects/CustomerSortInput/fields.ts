import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerSortInput}.
*
* Sort by name
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NameSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomerSortInput} |
* | **Path** | `CustomerSortInput.name` |
* | **Nullability** | Optional |
*/
export interface name {
kind: "InputField",
name: "name",
inlineType: [0, ],
namedType: $Schema.NameSort,
type: $Schema.NameSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerSortInput}.
*
* Sort by customer creation date
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerCreatedAtSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomerSortInput} |
* | **Path** | `CustomerSortInput.createdAt` |
* | **Nullability** | Optional |
*/
export interface createdAt {
kind: "InputField",
name: "createdAt",
inlineType: [0, ],
namedType: $Schema.CustomerCreatedAtSort,
type: $Schema.CustomerCreatedAtSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerSortInput}.
*
* Sort by owner name
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OwnerSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomerSortInput} |
* | **Path** | `CustomerSortInput.owner` |
* | **Nullability** | Optional |
*/
export interface owner {
kind: "InputField",
name: "owner",
inlineType: [0, ],
namedType: $Schema.OwnerSort,
type: $Schema.OwnerSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerSortInput}.
*
* Sort by customer status
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerStatusSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomerSortInput} |
* | **Path** | `CustomerSortInput.status` |
* | **Nullability** | Optional |
*/
export interface status {
kind: "InputField",
name: "status",
inlineType: [0, ],
namedType: $Schema.CustomerStatusSort,
type: $Schema.CustomerStatusSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerSortInput}.
*
* Sort by customer generated revenue
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RevenueSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomerSortInput} |
* | **Path** | `CustomerSortInput.revenue` |
* | **Nullability** | Optional |
*/
export interface revenue {
kind: "InputField",
name: "revenue",
inlineType: [0, ],
namedType: $Schema.RevenueSort,
type: $Schema.RevenueSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerSortInput}.
*
* Sort by customer size
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SizeSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomerSortInput} |
* | **Path** | `CustomerSortInput.size` |
* | **Nullability** | Optional |
*/
export interface size {
kind: "InputField",
name: "size",
inlineType: [0, ],
namedType: $Schema.SizeSort,
type: $Schema.SizeSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerSortInput}.
*
* Sort by customer tier
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TierSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomerSortInput} |
* | **Path** | `CustomerSortInput.tier` |
* | **Nullability** | Optional |
*/
export interface tier {
kind: "InputField",
name: "tier",
inlineType: [0, ],
namedType: $Schema.TierSort,
type: $Schema.TierSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerSortInput}.
*
* Sort by approximate customer need count
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ApproximateNeedCountSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomerSortInput} |
* | **Path** | `CustomerSortInput.approximateNeedCount` |
* | **Nullability** | Optional |
*/
export interface approximateNeedCount {
kind: "InputField",
name: "approximateNeedCount",
inlineType: [0, ],
namedType: $Schema.ApproximateNeedCountSort,
type: $Schema.ApproximateNeedCountSort['type'] | null | undefined
}