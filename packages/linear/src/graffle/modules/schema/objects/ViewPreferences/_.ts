import type * as $Fields from './fields.js'

export * as ViewPreferences from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* View preferences.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 7 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface ViewPreferences {
kind: "Object",
name: "ViewPreferences",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
type: $Fields.type,
viewType: $Fields.viewType,
preferences: $Fields.preferences
}
}