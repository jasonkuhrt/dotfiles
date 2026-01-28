import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as AgentSessionUpdateInput from './fields.js'

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
export interface AgentSessionUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The URL of an external agent-hosted page associated with this session. Only updatable by the OAuth application that owns the session.
*/
externalLink?: $Scalars.String<_$Context>,
/**
* URLs of external resources associated with this session. Replaces existing URLs. Only updatable by the OAuth application that owns the session. If supplied, addedExternalUrls and removedExternalUrls are ignored.
*/
externalUrls?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AgentSessionExternalUrlInput<_$Context> | null | undefined>> | null | undefined>,
/**
* URLs of external resources to be added to this session. Only updatable by the OAuth application that owns the session.
*/
addedExternalUrls?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AgentSessionExternalUrlInput<_$Context> | null | undefined>> | null | undefined>,
/**
* URLs to be removed from this session. Only updatable by the OAuth application that owns the session.
*/
removedExternalUrls?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>,
/**
* A dynamically updated list of the agent's execution strategy. Only updatable by the OAuth application that owns the session.
*/
plan?: $Scalars.JSONObject<_$Context>,
/**
* [Internal] The time the agent session was dismissed. Only updatable by internal clients.
*/
dismissedAt?: $Scalars.DateTime<_$Context>,
/**
* [Internal] User-specific state for the agent session. Only updatable by internal clients.
*/
userState?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AgentSessionUserStateInput<_$Context> | null | undefined>> | null | undefined>
}