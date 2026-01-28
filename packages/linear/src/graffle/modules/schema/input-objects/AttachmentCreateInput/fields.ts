import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AttachmentCreateInput}.
*
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AttachmentCreateInput} |
* | **Path** | `AttachmentCreateInput.id` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AttachmentCreateInput}.
*
* The attachment title.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AttachmentCreateInput} |
* | **Path** | `AttachmentCreateInput.title` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AttachmentCreateInput}.
*
* The attachment subtitle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AttachmentCreateInput} |
* | **Path** | `AttachmentCreateInput.subtitle` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AttachmentCreateInput}.
*
* Attachment location which is also used as an unique identifier for the attachment. If another attachment is created with the same `url` value, existing record is updated instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AttachmentCreateInput} |
* | **Path** | `AttachmentCreateInput.url` |
* | **Nullability** | Required |
*/
export interface url {
kind: "InputField",
name: "url",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AttachmentCreateInput}.
*
* The issue to associate the attachment with. Can be a UUID or issue identifier (e.g., 'LIN-123').
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AttachmentCreateInput} |
* | **Path** | `AttachmentCreateInput.issueId` |
* | **Nullability** | Required |
*/
export interface issueId {
kind: "InputField",
name: "issueId",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AttachmentCreateInput}.
*
* An icon url to display with the attachment. Should be of jpg or png format. Maximum of 1MB in size. Dimensions should be 20x20px for optimal display quality.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AttachmentCreateInput} |
* | **Path** | `AttachmentCreateInput.iconUrl` |
* | **Nullability** | Optional |
*/
export interface iconUrl {
kind: "InputField",
name: "iconUrl",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AttachmentCreateInput}.
*
* Attachment metadata object with string and number values.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AttachmentCreateInput} |
* | **Path** | `AttachmentCreateInput.metadata` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AttachmentCreateInput}.
*
* Indicates if attachments for the same source application should be grouped in the Linear UI.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AttachmentCreateInput} |
* | **Path** | `AttachmentCreateInput.groupBySource` |
* | **Nullability** | Optional |
*/
export interface groupBySource {
kind: "InputField",
name: "groupBySource",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AttachmentCreateInput}.
*
* Create a linked comment with markdown body.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AttachmentCreateInput} |
* | **Path** | `AttachmentCreateInput.commentBody` |
* | **Nullability** | Optional |
*/
export interface commentBody {
kind: "InputField",
name: "commentBody",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AttachmentCreateInput}.
*
* [Internal] Create a linked comment with Prosemirror body. Please use `commentBody` instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AttachmentCreateInput} |
* | **Path** | `AttachmentCreateInput.commentBodyData` |
* | **Nullability** | Optional |
*/
export interface commentBodyData {
kind: "InputField",
name: "commentBodyData",
inlineType: [0, ],
namedType: $Schema.JSONObject,
type: $Schema.JSONObject['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AttachmentCreateInput}.
*
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=application` mode.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AttachmentCreateInput} |
* | **Path** | `AttachmentCreateInput.createAsUser` |
* | **Nullability** | Optional |
*/
export interface createAsUser {
kind: "InputField",
name: "createAsUser",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}