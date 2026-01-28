import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CommentFilter}.
*
* Comparator for the identifier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IDComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CommentFilter} |
* | **Path** | `CommentFilter.id` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CommentFilter}.
*
* Comparator for the created at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CommentFilter} |
* | **Path** | `CommentFilter.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CommentFilter}.
*
* Comparator for the updated at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CommentFilter} |
* | **Path** | `CommentFilter.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CommentFilter}.
*
* Comparator for the comment's body.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CommentFilter} |
* | **Path** | `CommentFilter.body` |
* | **Nullability** | Optional |
*/
export interface body {
kind: "InputField",
name: "body",
inlineType: [0, ],
namedType: $Schema.StringComparator,
type: $Schema.StringComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CommentFilter}.
*
* Filters that the comment's creator must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CommentFilter} |
* | **Path** | `CommentFilter.user` |
* | **Nullability** | Optional |
*/
export interface user {
kind: "InputField",
name: "user",
inlineType: [0, ],
namedType: $Schema.UserFilter,
type: $Schema.UserFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CommentFilter}.
*
* Filters that the comment's issue must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableIssueFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CommentFilter} |
* | **Path** | `CommentFilter.issue` |
* | **Nullability** | Optional |
*/
export interface issue {
kind: "InputField",
name: "issue",
inlineType: [0, ],
namedType: $Schema.NullableIssueFilter,
type: $Schema.NullableIssueFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CommentFilter}.
*
* Filters that the comment's project update must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableProjectUpdateFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CommentFilter} |
* | **Path** | `CommentFilter.projectUpdate` |
* | **Nullability** | Optional |
*/
export interface projectUpdate {
kind: "InputField",
name: "projectUpdate",
inlineType: [0, ],
namedType: $Schema.NullableProjectUpdateFilter,
type: $Schema.NullableProjectUpdateFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CommentFilter}.
*
* Filters that the comment parent must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableCommentFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CommentFilter} |
* | **Path** | `CommentFilter.parent` |
* | **Nullability** | Optional |
*/
export interface parent {
kind: "InputField",
name: "parent",
inlineType: [0, ],
namedType: $Schema.NullableCommentFilter,
type: $Schema.NullableCommentFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CommentFilter}.
*
* Filters that the comment's document content must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDocumentContentFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CommentFilter} |
* | **Path** | `CommentFilter.documentContent` |
* | **Nullability** | Optional |
*/
export interface documentContent {
kind: "InputField",
name: "documentContent",
inlineType: [0, ],
namedType: $Schema.NullableDocumentContentFilter,
type: $Schema.NullableDocumentContentFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CommentFilter}.
*
* Filters that the comment's reactions must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReactionCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CommentFilter} |
* | **Path** | `CommentFilter.reactions` |
* | **Nullability** | Optional |
*/
export interface reactions {
kind: "InputField",
name: "reactions",
inlineType: [0, ],
namedType: $Schema.ReactionCollectionFilter,
type: $Schema.ReactionCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CommentFilter}.
*
* Filters that the comment's customer needs must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeedCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CommentFilter} |
* | **Path** | `CommentFilter.needs` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CommentFilter}.
*
* Compound filters, all of which need to be matched by the comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CommentFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CommentFilter} |
* | **Path** | `CommentFilter.and` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface and {
kind: "InputField",
name: "and",
inlineType: [0, [1, ]],
namedType: $Schema.CommentFilter,
type: readonly ($Schema.CommentFilter['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CommentFilter}.
*
* Compound filters, one of which need to be matched by the comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CommentFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CommentFilter} |
* | **Path** | `CommentFilter.or` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface or {
kind: "InputField",
name: "or",
inlineType: [0, [1, ]],
namedType: $Schema.CommentFilter,
type: readonly ($Schema.CommentFilter['type'])[] | null | undefined
}