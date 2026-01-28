import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedCreateInput}.
*
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedCreateInput} |
* | **Path** | `CustomerNeedCreateInput.id` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedCreateInput}.
*
* The uuid of the customer the need belongs to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedCreateInput} |
* | **Path** | `CustomerNeedCreateInput.customerId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedCreateInput}.
*
* The external ID of the customer the need belongs to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedCreateInput} |
* | **Path** | `CustomerNeedCreateInput.customerExternalId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedCreateInput}.
*
* The issue this need is referencing. Can be a UUID or issue identifier (e.g., 'LIN-123').
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedCreateInput} |
* | **Path** | `CustomerNeedCreateInput.issueId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedCreateInput}.
*
* [INTERNAL] The project this need is referencing.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedCreateInput} |
* | **Path** | `CustomerNeedCreateInput.projectId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedCreateInput}.
*
* The comment this need is referencing.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedCreateInput} |
* | **Path** | `CustomerNeedCreateInput.commentId` |
* | **Nullability** | Optional |
*/
export interface commentId {
kind: "InputField",
name: "commentId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedCreateInput}.
*
* The attachment this need is referencing.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedCreateInput} |
* | **Path** | `CustomerNeedCreateInput.attachmentId` |
* | **Nullability** | Optional |
*/
export interface attachmentId {
kind: "InputField",
name: "attachmentId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedCreateInput}.
*
* Whether the customer need is important or not. 0 = Not important, 1 = Important.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedCreateInput} |
* | **Path** | `CustomerNeedCreateInput.priority` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedCreateInput}.
*
* The content of the need in markdown format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedCreateInput} |
* | **Path** | `CustomerNeedCreateInput.body` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedCreateInput}.
*
* [Internal] The content of the need as a Prosemirror document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSON} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.CustomerNeedCreateInput} |
* | **Path** | `CustomerNeedCreateInput.bodyData` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedCreateInput}.
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
* | **Parent** | {@link $Schema.CustomerNeedCreateInput} |
* | **Path** | `CustomerNeedCreateInput.url` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedCreateInput}.
*
* Optional URL for the attachment associated with the customer need.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedCreateInput} |
* | **Path** | `CustomerNeedCreateInput.attachmentUrl` |
* | **Nullability** | Optional |
*/
export interface attachmentUrl {
kind: "InputField",
name: "attachmentUrl",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedCreateInput}.
*
* Create need as a user with the provided name. This option is only available to OAuth applications creating needs in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedCreateInput} |
* | **Path** | `CustomerNeedCreateInput.createAsUser` |
* | **Nullability** | Optional |
*/
export interface createAsUser {
kind: "InputField",
name: "createAsUser",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedCreateInput}.
*
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating needs in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedCreateInput} |
* | **Path** | `CustomerNeedCreateInput.displayIconUrl` |
* | **Nullability** | Optional |
*/
export interface displayIconUrl {
kind: "InputField",
name: "displayIconUrl",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}