import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentSessionUpdateExternalUrlInput}.
*
* The URL of an external agent-hosted page associated with this session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AgentSessionUpdateExternalUrlInput} |
* | **Path** | `AgentSessionUpdateExternalUrlInput.externalLink` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentSessionUpdateExternalUrlInput}.
*
* URLs of external resources associated with this session. Replaces existing URLs.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSessionExternalUrlInput}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.AgentSessionUpdateExternalUrlInput} |
* | **Path** | `AgentSessionUpdateExternalUrlInput.externalUrls` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentSessionUpdateExternalUrlInput}.
*
* URLs of external resources to be added to this session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSessionExternalUrlInput}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.AgentSessionUpdateExternalUrlInput} |
* | **Path** | `AgentSessionUpdateExternalUrlInput.addedExternalUrls` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentSessionUpdateExternalUrlInput}.
*
* URLs to be removed from this session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AgentSessionUpdateExternalUrlInput} |
* | **Path** | `AgentSessionUpdateExternalUrlInput.removedExternalUrls` |
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