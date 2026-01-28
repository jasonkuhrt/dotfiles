import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentSessionUpdateInput}.
*
* The URL of an external agent-hosted page associated with this session. Only updatable by the OAuth application that owns the session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AgentSessionUpdateInput} |
* | **Path** | `AgentSessionUpdateInput.externalLink` |
* | **Nullability** | Optional |
*/
export interface externalLink {
kind: "InputField",
name: "externalLink",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentSessionUpdateInput}.
*
* URLs of external resources associated with this session. Replaces existing URLs. Only updatable by the OAuth application that owns the session. If supplied, addedExternalUrls and removedExternalUrls are ignored.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSessionExternalUrlInput}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.AgentSessionUpdateInput} |
* | **Path** | `AgentSessionUpdateInput.externalUrls` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface externalUrls {
kind: "InputField",
name: "externalUrls",
inlineType: [0, [1, ]],
namedType: $Schema.AgentSessionExternalUrlInput,
type: readonly ($Schema.AgentSessionExternalUrlInput['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentSessionUpdateInput}.
*
* URLs of external resources to be added to this session. Only updatable by the OAuth application that owns the session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSessionExternalUrlInput}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.AgentSessionUpdateInput} |
* | **Path** | `AgentSessionUpdateInput.addedExternalUrls` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface addedExternalUrls {
kind: "InputField",
name: "addedExternalUrls",
inlineType: [0, [1, ]],
namedType: $Schema.AgentSessionExternalUrlInput,
type: readonly ($Schema.AgentSessionExternalUrlInput['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentSessionUpdateInput}.
*
* URLs to be removed from this session. Only updatable by the OAuth application that owns the session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AgentSessionUpdateInput} |
* | **Path** | `AgentSessionUpdateInput.removedExternalUrls` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface removedExternalUrls {
kind: "InputField",
name: "removedExternalUrls",
inlineType: [0, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentSessionUpdateInput}.
*
* A dynamically updated list of the agent's execution strategy. Only updatable by the OAuth application that owns the session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AgentSessionUpdateInput} |
* | **Path** | `AgentSessionUpdateInput.plan` |
* | **Nullability** | Optional |
*/
export interface plan {
kind: "InputField",
name: "plan",
inlineType: [0, ],
namedType: $Schema.JSONObject,
type: $Schema.JSONObject['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentSessionUpdateInput}.
*
* [Internal] The time the agent session was dismissed. Only updatable by internal clients.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AgentSessionUpdateInput} |
* | **Path** | `AgentSessionUpdateInput.dismissedAt` |
* | **Nullability** | Optional |
*/
export interface dismissedAt {
kind: "InputField",
name: "dismissedAt",
inlineType: [0, ],
namedType: $Schema.DateTime,
type: $Schema.DateTime['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentSessionUpdateInput}.
*
* [Internal] User-specific state for the agent session. Only updatable by internal clients.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSessionUserStateInput}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.AgentSessionUpdateInput} |
* | **Path** | `AgentSessionUpdateInput.userState` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface userState {
kind: "InputField",
name: "userState",
inlineType: [0, [1, ]],
namedType: $Schema.AgentSessionUserStateInput,
type: readonly ($Schema.AgentSessionUserStateInput['type'])[] | null | undefined
}