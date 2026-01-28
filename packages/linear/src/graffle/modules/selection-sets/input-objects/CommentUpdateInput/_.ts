import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as CommentUpdateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 7 |
* | **All Fields Nullable** | Yes |
*/
export interface CommentUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The comment content.
*/
body?: $Scalars.String<_$Context>,
/**
* [Internal] The comment content as a Prosemirror document.
*/
bodyData?: $Scalars.JSON<_$Context>,
/**
* [INTERNAL] The user who resolved this thread.
*/
resolvingUserId?: $Scalars.String<_$Context>,
/**
* [INTERNAL] The child comment that resolves this thread.
*/
resolvingCommentId?: $Scalars.String<_$Context>,
/**
* The text that this comment references. Only defined for inline comments.
*/
quotedText?: $Scalars.String<_$Context>,
/**
* [INTERNAL] The identifiers of the users subscribing to this comment.
*/
subscriberIds?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>,
/**
* [INTERNAL] Flag to prevent auto subscription to the issue the comment is updated on.
*/
doNotSubscribeToIssue?: $Scalars.Boolean<_$Context>
}