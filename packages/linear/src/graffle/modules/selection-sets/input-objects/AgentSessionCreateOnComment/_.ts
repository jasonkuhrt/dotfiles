import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as AgentSessionCreateOnComment from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | Yes |
*/
export interface AgentSessionCreateOnComment<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The root comment that this session will be associated with.
*/
commentId: $Scalars.String$NonNull<_$Context>,
/**
* The URL of an external agent-hosted page associated with this session.
*/
externalLink?: $Scalars.String<_$Context>,
/**
* URLs of external resources associated with this session.
*/
externalUrls?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AgentSessionExternalUrlInput<_$Context> | null | undefined>> | null | undefined>
}