import type * as $Fields from './fields.js'

export * as CommentCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 16 |
* | **All Fields Nullable** | Yes |
*/
export interface CommentCreateInput {
kind: "InputObject",
name: "CommentCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
body: $Fields.body,
bodyData: $Fields.bodyData,
issueId: $Fields.issueId,
projectUpdateId: $Fields.projectUpdateId,
initiativeUpdateId: $Fields.initiativeUpdateId,
postId: $Fields.postId,
documentContentId: $Fields.documentContentId,
parentId: $Fields.parentId,
createAsUser: $Fields.createAsUser,
displayIconUrl: $Fields.displayIconUrl,
createdAt: $Fields.createdAt,
doNotSubscribeToIssue: $Fields.doNotSubscribeToIssue,
createOnSyncedSlackThread: $Fields.createOnSyncedSlackThread,
quotedText: $Fields.quotedText,
subscriberIds: $Fields.subscriberIds
},
type: {
id?: $Fields.id['type'],
body?: $Fields.body['type'],
bodyData?: $Fields.bodyData['type'],
issueId?: $Fields.issueId['type'],
projectUpdateId?: $Fields.projectUpdateId['type'],
initiativeUpdateId?: $Fields.initiativeUpdateId['type'],
postId?: $Fields.postId['type'],
documentContentId?: $Fields.documentContentId['type'],
parentId?: $Fields.parentId['type'],
createAsUser?: $Fields.createAsUser['type'],
displayIconUrl?: $Fields.displayIconUrl['type'],
createdAt?: $Fields.createdAt['type'],
doNotSubscribeToIssue?: $Fields.doNotSubscribeToIssue['type'],
createOnSyncedSlackThread?: $Fields.createOnSyncedSlackThread['type'],
quotedText?: $Fields.quotedText['type'],
subscriberIds?: $Fields.subscriberIds['type']
}
}