import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedUpdateInput}.
*
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedUpdateInput} |
* | **Path** | `CustomerNeedUpdateInput.id` |
* | **Nullability** | Optional |
*/
export interface id {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedUpdateInput}.
*
* The uuid of the customer the need belongs to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedUpdateInput} |
* | **Path** | `CustomerNeedUpdateInput.customerId` |
* | **Nullability** | Optional |
*/
export interface customerId {
kind: "InputField",
name: "customerId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedUpdateInput}.
*
* The external ID of the customer the need belongs to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedUpdateInput} |
* | **Path** | `CustomerNeedUpdateInput.customerExternalId` |
* | **Nullability** | Optional |
*/
export interface customerExternalId {
kind: "InputField",
name: "customerExternalId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedUpdateInput}.
*
* The issue this need is referencing. Can be a UUID or issue identifier (e.g., 'LIN-123').
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedUpdateInput} |
* | **Path** | `CustomerNeedUpdateInput.issueId` |
* | **Nullability** | Optional |
*/
export interface issueId {
kind: "InputField",
name: "issueId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedUpdateInput}.
*
* [INTERNAL] The project this need is referencing.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedUpdateInput} |
* | **Path** | `CustomerNeedUpdateInput.projectId` |
* | **Nullability** | Optional |
*/
export interface projectId {
kind: "InputField",
name: "projectId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedUpdateInput}.
*
* Whether the customer need is important or not. 0 = Not important, 1 = Important.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedUpdateInput} |
* | **Path** | `CustomerNeedUpdateInput.priority` |
* | **Nullability** | Optional |
*/
export interface priority {
kind: "InputField",
name: "priority",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedUpdateInput}.
*
* Whether to also update the priority of needs from the same customer on the same issue/project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedUpdateInput} |
* | **Path** | `CustomerNeedUpdateInput.applyPriorityToRelatedNeeds` |
* | **Nullability** | Optional |
*/
export interface applyPriorityToRelatedNeeds {
kind: "InputField",
name: "applyPriorityToRelatedNeeds",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedUpdateInput}.
*
* The content of the need in markdown format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedUpdateInput} |
* | **Path** | `CustomerNeedUpdateInput.body` |
* | **Nullability** | Optional |
*/
export interface body {
kind: "InputField",
name: "body",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedUpdateInput}.
*
* [Internal] The content of the need as a Prosemirror document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSON} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.CustomerNeedUpdateInput} |
* | **Path** | `CustomerNeedUpdateInput.bodyData` |
* | **Nullability** | Optional |
*/
export interface bodyData {
kind: "InputField",
name: "bodyData",
inlineType: [0, ],
namedType: $Schema.JSON,
type: $Schema.JSON['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedUpdateInput}.
*
* [DEPRECATED] Optional URL to the source of the customer need.
*
* @deprecated Use attachmentUrl instead
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedUpdateInput} |
* | **Path** | `CustomerNeedUpdateInput.url` |
* | **⚠ Deprecated** | Use attachmentUrl instead |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedUpdateInput}.
*
* Optional URL for the attachment associated with the customer need.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedUpdateInput} |
* | **Path** | `CustomerNeedUpdateInput.attachmentUrl` |
* | **Nullability** | Optional |
*/
export interface attachmentUrl {
kind: "InputField",
name: "attachmentUrl",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}