import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as ReactionCreateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 9 |
* | **All Fields Nullable** | Yes |
*/
export interface ReactionCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The emoji the user reacted with.
*/
emoji: $Scalars.String$NonNull<_$Context>,
/**
* The comment to associate the reaction with.
*/
commentId?: $Scalars.String<_$Context>,
/**
* The project update to associate the reaction with.
*/
projectUpdateId?: $Scalars.String<_$Context>,
/**
* The update to associate the reaction with.
*/
initiativeUpdateId?: $Scalars.String<_$Context>,
/**
* The issue to associate the reaction with. Can be a UUID or issue identifier (e.g., 'LIN-123').
*/
issueId?: $Scalars.String<_$Context>,
/**
* [Internal] The post to associate the reaction with.
*/
postId?: $Scalars.String<_$Context>,
/**
* [Internal] The pull request to associate the reaction with.
*/
pullRequestId?: $Scalars.String<_$Context>,
/**
* [Internal] The pull request comment to associate the reaction with.
*/
pullRequestCommentId?: $Scalars.String<_$Context>
}