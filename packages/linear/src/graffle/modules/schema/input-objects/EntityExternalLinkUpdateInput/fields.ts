import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EntityExternalLinkUpdateInput}.
*
* The URL of the link.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EntityExternalLinkUpdateInput} |
* | **Path** | `EntityExternalLinkUpdateInput.url` |
* | **Nullability** | Optional |
*/
export interface url {
kind: "InputField",
name: "url",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EntityExternalLinkUpdateInput}.
*
* The label for the link.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EntityExternalLinkUpdateInput} |
* | **Path** | `EntityExternalLinkUpdateInput.label` |
* | **Nullability** | Optional |
*/
export interface label {
kind: "InputField",
name: "label",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EntityExternalLinkUpdateInput}.
*
* The order of the item in the entities resources list.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EntityExternalLinkUpdateInput} |
* | **Path** | `EntityExternalLinkUpdateInput.sortOrder` |
* | **Nullability** | Optional |
*/
export interface sortOrder {
kind: "InputField",
name: "sortOrder",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EntityExternalLinkUpdateInput}.
*
* [Internal] The resource folder containing the link.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EntityExternalLinkUpdateInput} |
* | **Path** | `EntityExternalLinkUpdateInput.resourceFolderId` |
* | **Nullability** | Optional |
*/
export interface resourceFolderId {
kind: "InputField",
name: "resourceFolderId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}