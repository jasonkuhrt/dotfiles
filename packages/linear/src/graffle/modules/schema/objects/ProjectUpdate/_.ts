import type * as $Fields from './fields.js'

export * as ProjectUpdate from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* An update associated with a project.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 21 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface ProjectUpdate {
kind: "Object",
name: "ProjectUpdate",
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
project: $Fields.project,
health: $Fields.health,
user: $Fields.user,
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