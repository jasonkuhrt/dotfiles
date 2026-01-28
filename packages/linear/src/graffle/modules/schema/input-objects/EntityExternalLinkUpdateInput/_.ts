import type * as $Fields from './fields.js'

export * as EntityExternalLinkUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface EntityExternalLinkUpdateInput {
kind: "InputObject",
name: "EntityExternalLinkUpdateInput",
isAllFieldsNullable: true,
fields: {
url: $Fields.url,
label: $Fields.label,
sortOrder: $Fields.sortOrder,
resourceFolderId: $Fields.resourceFolderId
},
type: {
url?: $Fields.url['type'],
label?: $Fields.label['type'],
sortOrder?: $Fields.sortOrder['type'],
resourceFolderId?: $Fields.resourceFolderId['type']
}
}