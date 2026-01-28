import type * as $Fields from './fields.js'

export * as UploadFile from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Object representing Google Cloud upload policy, plus additional data.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 7 |
*/
export interface UploadFile {
kind: "Object",
name: "UploadFile",
fields: {
__typename: $Fields.__typename,
filename: $Fields.filename,
contentType: $Fields.contentType,
size: $Fields.size,
uploadUrl: $Fields.uploadUrl,
assetUrl: $Fields.assetUrl,
metaData: $Fields.metaData,
headers: $Fields.headers
}
}