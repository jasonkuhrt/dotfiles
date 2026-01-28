import type * as $Fields from './fields.js'

export * as InitiativeUpdate from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* An initiative update.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 21 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface InitiativeUpdate {
kind: "Object",
name: "InitiativeUpdate",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
body: $Fields.body,
editedAt: $Fields.editedAt,
reactionData: $Fields.reactionData,
bodyData: $Fields.bodyData,
slugId: $Fields.slugId,
initiative: $Fields.initiative,
user: $Fields.user,
health: $Fields.health,
infoSnapshot: $Fields.infoSnapshot,
isDiffHidden: $Fields.isDiffHidden,
url: $Fields.url,
isStale: $Fields.isStale,
diff: $Fields.diff,
diffMarkdown: $Fields.diffMarkdown,
reactions: $Fields.reactions,
comments: $Fields.comments,
commentCount: $Fields.commentCount
}
}