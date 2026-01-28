import type * as $Fields from './fields.js'

export * as CustomerNeedCreateFromAttachmentInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 1 |
* | **All Fields Nullable** | No |
*/
export interface CustomerNeedCreateFromAttachmentInput {
kind: "InputObject",
name: "CustomerNeedCreateFromAttachmentInput",
isAllFieldsNullable: false,
fields: {
attachmentId: $Fields.attachmentId
},
type: {
attachmentId: $Fields.attachmentId['type']
}
}