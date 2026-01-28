import type * as $Fields from './fields.js'

export * as ReactionCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 9 |
* | **All Fields Nullable** | Yes |
*/
export interface ReactionCreateInput {
kind: "InputObject",
name: "ReactionCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
emoji: $Fields.emoji,
commentId: $Fields.commentId,
projectUpdateId: $Fields.projectUpdateId,
initiativeUpdateId: $Fields.initiativeUpdateId,
issueId: $Fields.issueId,
postId: $Fields.postId,
pullRequestId: $Fields.pullRequestId,
pullRequestCommentId: $Fields.pullRequestCommentId
},
type: {
id?: $Fields.id['type'],
emoji: $Fields.emoji['type'],
commentId?: $Fields.commentId['type'],
projectUpdateId?: $Fields.projectUpdateId['type'],
initiativeUpdateId?: $Fields.initiativeUpdateId['type'],
issueId?: $Fields.issueId['type'],
postId?: $Fields.postId['type'],
pullRequestId?: $Fields.pullRequestId['type'],
pullRequestCommentId?: $Fields.pullRequestCommentId['type']
}
}