import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentActivityCreatePromptInput}.
*
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AgentActivityCreatePromptInput} |
* | **Path** | `AgentActivityCreatePromptInput.id` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentActivityCreatePromptInput}.
*
* The agent session this activity belongs to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AgentActivityCreatePromptInput} |
* | **Path** | `AgentActivityCreatePromptInput.agentSessionId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentActivityCreatePromptInput}.
*
* An optional modifier that provides additional instructions on how the activity should be interpreted.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentActivitySignal} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.AgentActivityCreatePromptInput} |
* | **Path** | `AgentActivityCreatePromptInput.signal` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentActivityCreatePromptInput}.
*
* Metadata about this agent activity's signal.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AgentActivityCreatePromptInput} |
* | **Path** | `AgentActivityCreatePromptInput.signalMetadata` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentActivityCreatePromptInput}.
*
* [Internal] Metadata about user-provided contextual information for this agent activity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AgentActivityCreatePromptInput} |
* | **Path** | `AgentActivityCreatePromptInput.contextualMetadata` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentActivityCreatePromptInput}.
*
* The content payload of the prompt agent activity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AgentActivityCreatePromptInput} |
* | **Path** | `AgentActivityCreatePromptInput.content` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentActivityCreatePromptInput}.
*
* The comment that contains the content of this activity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AgentActivityCreatePromptInput} |
* | **Path** | `AgentActivityCreatePromptInput.sourceCommentId` |
* | **Nullability** | Optional |
*/
export interface sourceCommentId {
kind: "InputField",
name: "sourceCommentId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}