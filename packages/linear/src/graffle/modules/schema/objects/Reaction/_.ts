import type * as $Fields from './fields.js'

export * as Reaction from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A reaction associated with a comment or a project update.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 12 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface Reaction {
kind: "Object",
name: "Reaction",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
emoji: $Fields.emoji,
issue: $Fields.issue,
comment: $Fields.comment,
projectUpdate: $Fields.projectUpdate,
initiativeUpdate: $Fields.initiativeUpdate,
post: $Fields.post,
user: $Fields.user,
externalUser: $Fields.externalUser
}
}