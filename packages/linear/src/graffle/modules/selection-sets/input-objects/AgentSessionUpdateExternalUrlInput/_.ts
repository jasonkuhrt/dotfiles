import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as AgentSessionUpdateExternalUrlInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface AgentSessionUpdateExternalUrlInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The URL of an external agent-hosted page associated with this session.
*/
externalLink?: $Scalars.String<_$Context>,
/**
* URLs of external resources associated with this session. Replaces existing URLs.
*/
externalUrls?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AgentSessionExternalUrlInput<_$Context> | null | undefined>> | null | undefined>,
/**
* URLs of external resources to be added to this session.
*/
addedExternalUrls?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AgentSessionExternalUrlInput<_$Context> | null | undefined>> | null | undefined>,
/**
* URLs to be removed from this session.
*/
removedExternalUrls?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>
}