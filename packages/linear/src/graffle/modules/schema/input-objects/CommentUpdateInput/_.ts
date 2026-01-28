import type * as $Fields from './fields.js'

export * as CommentUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 7 |
* | **All Fields Nullable** | Yes |
*/
export interface CommentUpdateInput {
kind: "InputObject",
name: "CommentUpdateInput",
isAllFieldsNullable: true,
fields: {
body: $Fields.body,
bodyData: $Fields.bodyData,
resolvingUserId: $Fields.resolvingUserId,
resolvingCommentId: $Fields.resolvingCommentId,
quotedText: $Fields.quotedText,
subscriberIds: $Fields.subscriberIds,
doNotSubscribeToIssue: $Fields.doNotSubscribeToIssue
},
type: {
body?: $Fields.body['type'],
bodyData?: $Fields.bodyData['type'],
resolvingUserId?: $Fields.resolvingUserId['type'],
resolvingCommentId?: $Fields.resolvingCommentId['type'],
quotedText?: $Fields.quotedText['type'],
subscriberIds?: $Fields.subscriberIds['type'],
doNotSubscribeToIssue?: $Fields.doNotSubscribeToIssue['type']
}
}