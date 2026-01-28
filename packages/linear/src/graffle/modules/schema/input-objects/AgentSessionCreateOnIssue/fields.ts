import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentSessionCreateOnIssue}.
*
* The issue that this session will be associated with. Can be a UUID or issue identifier (e.g., 'LIN-123').
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AgentSessionCreateOnIssue} |
* | **Path** | `AgentSessionCreateOnIssue.issueId` |
* | **Nullability** | Required |
*/
export interface issueId {
kind: "InputField",
name: "issueId",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentSessionCreateOnIssue}.
*
* The URL of an external agent-hosted page associated with this session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AgentSessionCreateOnIssue} |
* | **Path** | `AgentSessionCreateOnIssue.externalLink` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentSessionCreateOnIssue}.
*
* URLs of external resources associated with this session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSessionExternalUrlInput}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.AgentSessionCreateOnIssue} |
* | **Path** | `AgentSessionCreateOnIssue.externalUrls` |
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