import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerFilter}.
*
* Comparator for the identifier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IDComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomerFilter} |
* | **Path** | `CustomerFilter.id` |
* | **Nullability** | Optional |
*/
export interface id {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.IDComparator,
type: $Schema.IDComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerFilter}.
*
* Comparator for the created at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomerFilter} |
* | **Path** | `CustomerFilter.createdAt` |
* | **Nullability** | Optional |
*/
export interface createdAt {
kind: "InputField",
name: "createdAt",
inlineType: [0, ],
namedType: $Schema.DateComparator,
type: $Schema.DateComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerFilter}.
*
* Comparator for the updated at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomerFilter} |
* | **Path** | `CustomerFilter.updatedAt` |
* | **Nullability** | Optional |
*/
export interface updatedAt {
kind: "InputField",
name: "updatedAt",
inlineType: [0, ],
namedType: $Schema.DateComparator,
type: $Schema.DateComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerFilter}.
*
* Comparator for the customer name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomerFilter} |
* | **Path** | `CustomerFilter.name` |
* | **Nullability** | Optional |
*/
export interface name {
kind: "InputField",
name: "name",
inlineType: [0, ],
namedType: $Schema.StringComparator,
type: $Schema.StringComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerFilter}.
*
* Comparator for the customer slack channel ID.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomerFilter} |
* | **Path** | `CustomerFilter.slackChannelId` |
* | **Nullability** | Optional |
*/
export interface slackChannelId {
kind: "InputField",
name: "slackChannelId",
inlineType: [0, ],
namedType: $Schema.StringComparator,
type: $Schema.StringComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerFilter}.
*
* Comparator for the customer's domains.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringArrayComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomerFilter} |
* | **Path** | `CustomerFilter.domains` |
* | **Nullability** | Optional |
*/
export interface domains {
kind: "InputField",
name: "domains",
inlineType: [0, ],
namedType: $Schema.StringArrayComparator,
type: $Schema.StringArrayComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerFilter}.
*
* Comparator for the customer's external IDs.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringArrayComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomerFilter} |
* | **Path** | `CustomerFilter.externalIds` |
* | **Nullability** | Optional |
*/
export interface externalIds {
kind: "InputField",
name: "externalIds",
inlineType: [0, ],
namedType: $Schema.StringArrayComparator,
type: $Schema.StringArrayComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerFilter}.
*
* Filters that the customer owner must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableUserFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomerFilter} |
* | **Path** | `CustomerFilter.owner` |
* | **Nullability** | Optional |
*/
export interface owner {
kind: "InputField",
name: "owner",
inlineType: [0, ],
namedType: $Schema.NullableUserFilter,
type: $Schema.NullableUserFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerFilter}.
*
* Filters that the customer's needs must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeedCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomerFilter} |
* | **Path** | `CustomerFilter.needs` |
* | **Nullability** | Optional |
*/
export interface needs {
kind: "InputField",
name: "needs",
inlineType: [0, ],
namedType: $Schema.CustomerNeedCollectionFilter,
type: $Schema.CustomerNeedCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerFilter}.
*
* Comparator for the customer generated revenue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NumberComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomerFilter} |
* | **Path** | `CustomerFilter.revenue` |
* | **Nullability** | Optional |
*/
export interface revenue {
kind: "InputField",
name: "revenue",
inlineType: [0, ],
namedType: $Schema.NumberComparator,
type: $Schema.NumberComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerFilter}.
*
* Comparator for the customer size.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NumberComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomerFilter} |
* | **Path** | `CustomerFilter.size` |
* | **Nullability** | Optional |
*/
export interface size {
kind: "InputField",
name: "size",
inlineType: [0, ],
namedType: $Schema.NumberComparator,
type: $Schema.NumberComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerFilter}.
*
* Filters that the customer's status must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerStatusFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomerFilter} |
* | **Path** | `CustomerFilter.status` |
* | **Nullability** | Optional |
*/
export interface status {
kind: "InputField",
name: "status",
inlineType: [0, ],
namedType: $Schema.CustomerStatusFilter,
type: $Schema.CustomerStatusFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerFilter}.
*
* Filters that the customer's tier must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerTierFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomerFilter} |
* | **Path** | `CustomerFilter.tier` |
* | **Nullability** | Optional |
*/
export interface tier {
kind: "InputField",
name: "tier",
inlineType: [0, ],
namedType: $Schema.CustomerTierFilter,
type: $Schema.CustomerTierFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerFilter}.
*
* Compound filters, all of which need to be matched by the customer.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomerFilter} |
* | **Path** | `CustomerFilter.and` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface and {
kind: "InputField",
name: "and",
inlineType: [0, [1, ]],
namedType: $Schema.CustomerFilter,
type: readonly ($Schema.CustomerFilter['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerFilter}.
*
* Compound filters, one of which need to be matched by the customer.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomerFilter} |
* | **Path** | `CustomerFilter.or` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface or {
kind: "InputField",
name: "or",
inlineType: [0, [1, ]],
namedType: $Schema.CustomerFilter,
type: readonly ($Schema.CustomerFilter['type'])[] | null | undefined
}