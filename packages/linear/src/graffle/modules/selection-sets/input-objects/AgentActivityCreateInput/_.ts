import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as AgentActivityCreateInput from './fields.js'

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
export interface AgentActivityCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The agent session this activity belongs to.
*/
agentSessionId: $Scalars.String$NonNull<_$Context>,
/**
* An optional modifier that provides additional instructions on how the activity should be interpreted.
*/
$signal?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AgentActivitySignal | null | undefined>,
/**
* Metadata about this agent activity's signal.
*/
signalMetadata?: $Scalars.JSONObject<_$Context>,
/**
* [Internal] Metadata about user-provided contextual information for this agent activity.
*/
contextualMetadata?: $Scalars.JSONObject<_$Context>,
/**
* The content payload of the agent activity. This object is not strictly typed.
* See https://linear.app/developers/agent-interaction#activity-content-payload for typing details.
*/
content: $Scalars.JSONObject$NonNull<_$Context>,
/**
* Whether the activity is ephemeral, and should disappear after the next activity. Defaults to false.
*/
ephemeral?: $Scalars.Boolean<_$Context>
}