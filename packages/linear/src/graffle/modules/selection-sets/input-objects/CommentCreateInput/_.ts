import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as CommentCreateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 16 |
* | **All Fields Nullable** | Yes |
*/
export interface CommentCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The comment content in markdown format.
*/
body?: $Scalars.String<_$Context>,
/**
* [Internal] The comment content as a Prosemirror document.
*/
bodyData?: $Scalars.JSON<_$Context>,
/**
* The issue to associate the comment with. Can be a UUID or issue identifier (e.g., 'LIN-123').
*/
issueId?: $Scalars.String<_$Context>,
/**
* The project update to associate the comment with.
*/
projectUpdateId?: $Scalars.String<_$Context>,
/**
* The initiative update to associate the comment with.
*/
initiativeUpdateId?: $Scalars.String<_$Context>,
/**
* The post to associate the comment with.
*/
postId?: $Scalars.String<_$Context>,
/**
* The document content to associate the comment with.
*/
documentContentId?: $Scalars.String<_$Context>,
/**
* The parent comment under which to nest a current comment.
*/
parentId?: $Scalars.String<_$Context>,
/**
* Create comment as a user with the provided name. This option is only available to OAuth applications creating comments in `actor=app` mode.
*/
createAsUser?: $Scalars.String<_$Context>,
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*/
displayIconUrl?: $Scalars.String<_$Context>,
/**
* The date when the comment was created (e.g. if importing from another system). Must be a date in the past. If none is provided, the backend will generate the time as now.
*/
createdAt?: $Scalars.DateTime<_$Context>,
/**
* Flag to prevent auto subscription to the issue the comment is created on.
*/
doNotSubscribeToIssue?: $Scalars.Boolean<_$Context>,
/**
* Flag to indicate this comment should be created on the issue's synced Slack comment thread. If no synced Slack comment thread exists, the mutation will fail.
*/
createOnSyncedSlackThread?: $Scalars.Boolean<_$Context>,
/**
* The text that this comment references. Only defined for inline comments.
*/
quotedText?: $Scalars.String<_$Context>,
/**
* [INTERNAL] The identifiers of the users subscribing to this comment thread.
*/
subscriberIds?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>
}