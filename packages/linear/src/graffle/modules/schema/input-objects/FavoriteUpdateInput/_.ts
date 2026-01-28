import type * as $Fields from './fields.js'

export * as FavoriteUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | Yes |
*/
export interface FavoriteUpdateInput {
kind: "InputObject",
name: "FavoriteUpdateInput",
isAllFieldsNullable: true,
fields: {
sortOrder: $Fields.sortOrder,
parentId: $Fields.parentId,
folderName: $Fields.folderName
},
type: {
sortOrder?: $Fields.sortOrder['type'],
parentId?: $Fields.parentId['type'],
folderName?: $Fields.folderName['type']
}
}