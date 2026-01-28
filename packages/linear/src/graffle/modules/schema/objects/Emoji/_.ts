import type * as $Fields from './fields.js'

export * as Emoji from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A custom emoji.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 9 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface Emoji {
kind: "Object",
name: "Emoji",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
name: $Fields.name,
url: $Fields.url,
source: $Fields.source,
creator: $Fields.creator,
organization: $Fields.organization
}
}