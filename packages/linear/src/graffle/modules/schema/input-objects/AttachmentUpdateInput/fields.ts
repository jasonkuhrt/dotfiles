import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AttachmentUpdateInput}.
*
* The attachment title.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AttachmentUpdateInput} |
* | **Path** | `AttachmentUpdateInput.title` |
* | **Nullability** | Required |
*/
export interface title {
kind: "InputField",
name: "title",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AttachmentUpdateInput}.
*
* The attachment subtitle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AttachmentUpdateInput} |
* | **Path** | `AttachmentUpdateInput.subtitle` |
* | **Nullability** | Optional |
*/
export interface subtitle {
kind: "InputField",
name: "subtitle",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AttachmentUpdateInput}.
*
* Attachment metadata object with string and number values.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AttachmentUpdateInput} |
* | **Path** | `AttachmentUpdateInput.metadata` |
* | **Nullability** | Optional |
*/
export interface metadata {
kind: "InputField",
name: "metadata",
inlineType: [0, ],
namedType: $Schema.JSONObject,
type: $Schema.JSONObject['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AttachmentUpdateInput}.
*
* An icon url to display with the attachment. Should be of jpg or png format. Maximum of 1MB in size. Dimensions should be 20x20px for optimal display quality.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AttachmentUpdateInput} |
* | **Path** | `AttachmentUpdateInput.iconUrl` |
* | **Nullability** | Optional |
*/
export interface iconUrl {
kind: "InputField",
name: "iconUrl",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}