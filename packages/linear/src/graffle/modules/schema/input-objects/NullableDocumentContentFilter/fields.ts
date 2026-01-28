import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDocumentContentFilter}.
*
* Comparator for the identifier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IDComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NullableDocumentContentFilter} |
* | **Path** | `NullableDocumentContentFilter.id` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDocumentContentFilter}.
*
* Comparator for the created at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NullableDocumentContentFilter} |
* | **Path** | `NullableDocumentContentFilter.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDocumentContentFilter}.
*
* Comparator for the updated at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NullableDocumentContentFilter} |
* | **Path** | `NullableDocumentContentFilter.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDocumentContentFilter}.
*
* Comparator for the document content.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableStringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NullableDocumentContentFilter} |
* | **Path** | `NullableDocumentContentFilter.content` |
* | **Nullability** | Optional |
*/
export interface content {
kind: "InputField",
name: "content",
inlineType: [0, ],
namedType: $Schema.NullableStringComparator,
type: $Schema.NullableStringComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDocumentContentFilter}.
*
* Filters that the document content project must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NullableDocumentContentFilter} |
* | **Path** | `NullableDocumentContentFilter.project` |
* | **Nullability** | Optional |
*/
export interface project {
kind: "InputField",
name: "project",
inlineType: [0, ],
namedType: $Schema.ProjectFilter,
type: $Schema.ProjectFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDocumentContentFilter}.
*
* Filters that the document content document must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NullableDocumentContentFilter} |
* | **Path** | `NullableDocumentContentFilter.document` |
* | **Nullability** | Optional |
*/
export interface document {
kind: "InputField",
name: "document",
inlineType: [0, ],
namedType: $Schema.DocumentFilter,
type: $Schema.DocumentFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDocumentContentFilter}.
*
* Filter based on the existence of the relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NullableDocumentContentFilter} |
* | **Path** | `NullableDocumentContentFilter.null` |
* | **Nullability** | Optional |
*/
interface $null {
kind: "InputField",
name: "null",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
export { type $null as null }
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDocumentContentFilter}.
*
* Compound filters, all of which need to be matched by the user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDocumentContentFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NullableDocumentContentFilter} |
* | **Path** | `NullableDocumentContentFilter.and` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface and {
kind: "InputField",
name: "and",
inlineType: [0, [1, ]],
namedType: $Schema.NullableDocumentContentFilter,
type: readonly ($Schema.NullableDocumentContentFilter['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDocumentContentFilter}.
*
* Compound filters, one of which need to be matched by the user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDocumentContentFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NullableDocumentContentFilter} |
* | **Path** | `NullableDocumentContentFilter.or` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface or {
kind: "InputField",
name: "or",
inlineType: [0, [1, ]],
namedType: $Schema.NullableDocumentContentFilter,
type: readonly ($Schema.NullableDocumentContentFilter['type'])[] | null | undefined
}