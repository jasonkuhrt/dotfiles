import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomerNeedCreateFromAttachmentInput}.
*
* The attachment this need is created from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedCreateFromAttachmentInput} |
* | **Path** | `CustomerNeedCreateFromAttachmentInput.attachmentId` |
* | **Nullability** | Required |
*/
export interface attachmentId {
kind: "InputField",
name: "attachmentId",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}