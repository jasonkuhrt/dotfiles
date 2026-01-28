import type * as $Fields from './fields.js'

export * as Comment from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A comment associated with an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 37 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface Comment {
kind: "Object",
name: "Comment",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
body: $Fields.body,
issue: $Fields.issue,
issueId: $Fields.issueId,
documentContent: $Fields.documentContent,
documentContentId: $Fields.documentContentId,
projectUpdate: $Fields.projectUpdate,
projectUpdateId: $Fields.projectUpdateId,
initiativeUpdate: $Fields.initiativeUpdate,
initiativeUpdateId: $Fields.initiativeUpdateId,
post: $Fields.post,
parent: $Fields.parent,
parentId: $Fields.parentId,
resolvingUser: $Fields.resolvingUser,
resolvedAt: $Fields.resolvedAt,
resolvingComment: $Fields.resolvingComment,
resolvingCommentId: $Fields.resolvingCommentId,
user: $Fields.user,
externalUser: $Fields.externalUser,
editedAt: $Fields.editedAt,
bodyData: $Fields.bodyData,
quotedText: $Fields.quotedText,
reactionData: $Fields.reactionData,
threadSummary: $Fields.threadSummary,
url: $Fields.url,
children: $Fields.children,
agentSession: $Fields.agentSession,
agentSessions: $Fields.agentSessions,
createdIssues: $Fields.createdIssues,
botActor: $Fields.botActor,
externalThread: $Fields.externalThread,
hideInLinear: $Fields.hideInLinear,
reactions: $Fields.reactions,
syncedWith: $Fields.syncedWith
}
}