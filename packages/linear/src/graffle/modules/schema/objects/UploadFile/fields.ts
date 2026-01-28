import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"UploadFile"`
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
value: "UploadFile"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UploadFile}.
*
* The filename.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UploadFile} |
* | **Path** | `UploadFile.filename` |
* | **Nullability** | Required |
*/
export interface filename {
kind: "OutputField",
name: "filename",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UploadFile}.
*
* The content type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UploadFile} |
* | **Path** | `UploadFile.contentType` |
* | **Nullability** | Required |
*/
export interface contentType {
kind: "OutputField",
name: "contentType",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UploadFile}.
*
* The size of the uploaded file.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Int}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UploadFile} |
* | **Path** | `UploadFile.size` |
* | **Nullability** | Required |
*/
export interface size {
kind: "OutputField",
name: "size",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Int
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UploadFile}.
*
* The signed URL the for the uploaded file. (assigned automatically).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UploadFile} |
* | **Path** | `UploadFile.uploadUrl` |
* | **Nullability** | Required |
*/
export interface uploadUrl {
kind: "OutputField",
name: "uploadUrl",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UploadFile}.
*
* The asset URL for the uploaded file. (assigned automatically).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UploadFile} |
* | **Path** | `UploadFile.assetUrl` |
* | **Nullability** | Required |
*/
export interface assetUrl {
kind: "OutputField",
name: "assetUrl",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UploadFile}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.UploadFile} |
* | **Path** | `UploadFile.metaData` |
* | **Nullability** | Optional |
*/
export interface metaData {
kind: "OutputField",
name: "metaData",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UploadFile}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UploadFileHeader}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.UploadFile} |
* | **Path** | `UploadFile.headers` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface headers {
kind: "OutputField",
name: "headers",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.UploadFileHeader
}
