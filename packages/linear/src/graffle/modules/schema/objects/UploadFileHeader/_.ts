import type * as $Fields from './fields.js'

export * as UploadFileHeader from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 2 |
*/
export interface UploadFileHeader {
kind: "Object",
name: "UploadFileHeader",
fields: {
__typename: $Fields.__typename,
key: $Fields.key,
value: $Fields.value
}
}