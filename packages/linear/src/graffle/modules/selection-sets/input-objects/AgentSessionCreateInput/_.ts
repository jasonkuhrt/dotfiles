import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as AgentSessionCreateInput from './fields.js'

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
export interface AgentSessionCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The issue that this session will be associated with. Can be a UUID or issue identifier (e.g., 'LIN-123').
*/
issueId?: $Scalars.String<_$Context>,
/**
* The app user (agent) to create a session for.
*/
appUserId: $Scalars.String$NonNull<_$Context>,
/**
* [Internal] Serialized JSON representing the page contexts this session is related to. Used for direct chat sessions to provide context about the current page (e.g., Issue, Project).
*/
context?: $Scalars.JSONObject<_$Context>
}