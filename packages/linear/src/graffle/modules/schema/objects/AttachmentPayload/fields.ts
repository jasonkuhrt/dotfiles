import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"AttachmentPayload"`
*
* {@link https://graphql.org/learn/queries/#meta-fields | GraphQL __typename documentation}
*/
export interface __typename {
kind: "OutputField",
name: "__typename",
arguments: {},
inlineType: [1],
namedType: {
kind: "__typename",
value: "AttachmentPayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AttachmentPayload}.
*
* The identifier of the last sync operation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AttachmentPayload} |
* | **Path** | `AttachmentPayload.lastSyncId` |
* | **Nullability** | Required |
*/
export interface lastSyncId {
kind: "OutputField",
name: "lastSyncId",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AttachmentPayload}.
*
* The issue attachment that was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Attachment}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.AttachmentPayload} |
* | **Path** | `AttachmentPayload.attachment` |
* | **Nullability** | Required |
*/
export interface attachment {
kind: "OutputField",
name: "attachment",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Attachment
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AttachmentPayload}.
*
* Whether the operation was successful.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AttachmentPayload} |
* | **Path** | `AttachmentPayload.success` |
* | **Nullability** | Required |
*/
export interface success {
kind: "OutputField",
name: "success",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}
