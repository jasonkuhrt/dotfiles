import type * as $Fields from './fields.js'

export * as EntityExternalLink from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* An external link for an entity like initiative, etc...
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 9 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface EntityExternalLink {
kind: "Object",
name: "EntityExternalLink",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
url: $Fields.url,
label: $Fields.label,
sortOrder: $Fields.sortOrder,
creator: $Fields.creator,
initiative: $Fields.initiative
}
}