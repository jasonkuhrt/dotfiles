import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentActivityCreateInput}.
*
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AgentActivityCreateInput} |
* | **Path** | `AgentActivityCreateInput.id` |
* | **Nullability** | Optional |
*/
export interface id {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentActivityCreateInput}.
*
* The agent session this activity belongs to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AgentActivityCreateInput} |
* | **Path** | `AgentActivityCreateInput.agentSessionId` |
* | **Nullability** | Required |
*/
export interface agentSessionId {
kind: "InputField",
name: "agentSessionId",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentActivityCreateInput}.
*
* An optional modifier that provides additional instructions on how the activity should be interpreted.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentActivitySignal} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.AgentActivityCreateInput} |
* | **Path** | `AgentActivityCreateInput.signal` |
* | **Nullability** | Optional |
*/
export interface signal {
kind: "InputField",
name: "signal",
inlineType: [0, ],
namedType: $Schema.AgentActivitySignal,
type: $Schema.AgentActivitySignal['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentActivityCreateInput}.
*
* Metadata about this agent activity's signal.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AgentActivityCreateInput} |
* | **Path** | `AgentActivityCreateInput.signalMetadata` |
* | **Nullability** | Optional |
*/
export interface signalMetadata {
kind: "InputField",
name: "signalMetadata",
inlineType: [0, ],
namedType: $Schema.JSONObject,
type: $Schema.JSONObject['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentActivityCreateInput}.
*
* [Internal] Metadata about user-provided contextual information for this agent activity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AgentActivityCreateInput} |
* | **Path** | `AgentActivityCreateInput.contextualMetadata` |
* | **Nullability** | Optional |
*/
export interface contextualMetadata {
kind: "InputField",
name: "contextualMetadata",
inlineType: [0, ],
namedType: $Schema.JSONObject,
type: $Schema.JSONObject['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentActivityCreateInput}.
*
* The content payload of the agent activity. This object is not strictly typed.
* See https://linear.app/developers/agent-interaction#activity-content-payload for typing details.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AgentActivityCreateInput} |
* | **Path** | `AgentActivityCreateInput.content` |
* | **Nullability** | Required |
*/
export interface content {
kind: "InputField",
name: "content",
inlineType: [1, ],
namedType: $Schema.JSONObject,
type: $Schema.JSONObject['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentActivityCreateInput}.
*
* Whether the activity is ephemeral, and should disappear after the next activity. Defaults to false.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AgentActivityCreateInput} |
* | **Path** | `AgentActivityCreateInput.ephemeral` |
* | **Nullability** | Optional |
*/
export interface ephemeral {
kind: "InputField",
name: "ephemeral",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}