import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserFilter}.
*
* Comparator for the identifier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IDComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.UserFilter} |
* | **Path** | `UserFilter.id` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserFilter}.
*
* Comparator for the created at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.UserFilter} |
* | **Path** | `UserFilter.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserFilter}.
*
* Comparator for the updated at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.UserFilter} |
* | **Path** | `UserFilter.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserFilter}.
*
* Comparator for the user's name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.UserFilter} |
* | **Path** | `UserFilter.name` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserFilter}.
*
* Comparator for the user's display name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.UserFilter} |
* | **Path** | `UserFilter.displayName` |
* | **Nullability** | Optional |
*/
export interface displayName {
kind: "InputField",
name: "displayName",
inlineType: [0, ],
namedType: $Schema.StringComparator,
type: $Schema.StringComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserFilter}.
*
* Comparator for the user's email.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.UserFilter} |
* | **Path** | `UserFilter.email` |
* | **Nullability** | Optional |
*/
export interface email {
kind: "InputField",
name: "email",
inlineType: [0, ],
namedType: $Schema.StringComparator,
type: $Schema.StringComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserFilter}.
*
* Comparator for the user's activity status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.BooleanComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.UserFilter} |
* | **Path** | `UserFilter.active` |
* | **Nullability** | Optional |
*/
export interface active {
kind: "InputField",
name: "active",
inlineType: [0, ],
namedType: $Schema.BooleanComparator,
type: $Schema.BooleanComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserFilter}.
*
* Filters that the users assigned issues must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.UserFilter} |
* | **Path** | `UserFilter.assignedIssues` |
* | **Nullability** | Optional |
*/
export interface assignedIssues {
kind: "InputField",
name: "assignedIssues",
inlineType: [0, ],
namedType: $Schema.IssueCollectionFilter,
type: $Schema.IssueCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserFilter}.
*
* Comparator for the user's admin status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.BooleanComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.UserFilter} |
* | **Path** | `UserFilter.admin` |
* | **Nullability** | Optional |
*/
export interface admin {
kind: "InputField",
name: "admin",
inlineType: [0, ],
namedType: $Schema.BooleanComparator,
type: $Schema.BooleanComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserFilter}.
*
* [Internal] Comparator for the user's owner status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.BooleanComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.UserFilter} |
* | **Path** | `UserFilter.owner` |
* | **Nullability** | Optional |
*/
export interface owner {
kind: "InputField",
name: "owner",
inlineType: [0, ],
namedType: $Schema.BooleanComparator,
type: $Schema.BooleanComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserFilter}.
*
* Comparator for the user's invited status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.BooleanComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.UserFilter} |
* | **Path** | `UserFilter.invited` |
* | **Nullability** | Optional |
*/
export interface invited {
kind: "InputField",
name: "invited",
inlineType: [0, ],
namedType: $Schema.BooleanComparator,
type: $Schema.BooleanComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserFilter}.
*
* Comparator for the user's invited status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.BooleanComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.UserFilter} |
* | **Path** | `UserFilter.isInvited` |
* | **Nullability** | Optional |
*/
export interface isInvited {
kind: "InputField",
name: "isInvited",
inlineType: [0, ],
namedType: $Schema.BooleanComparator,
type: $Schema.BooleanComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserFilter}.
*
* Comparator for the user's app status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.BooleanComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.UserFilter} |
* | **Path** | `UserFilter.app` |
* | **Nullability** | Optional |
*/
export interface app {
kind: "InputField",
name: "app",
inlineType: [0, ],
namedType: $Schema.BooleanComparator,
type: $Schema.BooleanComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserFilter}.
*
* Filter based on the currently authenticated user. Set to true to filter for the authenticated user, false for any other user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.BooleanComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.UserFilter} |
* | **Path** | `UserFilter.isMe` |
* | **Nullability** | Optional |
*/
export interface isMe {
kind: "InputField",
name: "isMe",
inlineType: [0, ],
namedType: $Schema.BooleanComparator,
type: $Schema.BooleanComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserFilter}.
*
* Compound filters, all of which need to be matched by the user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.UserFilter} |
* | **Path** | `UserFilter.and` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface and {
kind: "InputField",
name: "and",
inlineType: [0, [1, ]],
namedType: $Schema.UserFilter,
type: readonly ($Schema.UserFilter['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserFilter}.
*
* Compound filters, one of which need to be matched by the user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.UserFilter} |
* | **Path** | `UserFilter.or` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface or {
kind: "InputField",
name: "or",
inlineType: [0, [1, ]],
namedType: $Schema.UserFilter,
type: readonly ($Schema.UserFilter['type'])[] | null | undefined
}