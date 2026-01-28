import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentSessionExternalUrlInput}.
*
* The URL of the external resource.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AgentSessionExternalUrlInput} |
* | **Path** | `AgentSessionExternalUrlInput.url` |
* | **Nullability** | Required |
*/
export interface url {
kind: "InputField",
name: "url",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentSessionExternalUrlInput}.
*
* Label for the URL.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AgentSessionExternalUrlInput} |
* | **Path** | `AgentSessionExternalUrlInput.label` |
* | **Nullability** | Required |
*/
export interface label {
kind: "InputField",
name: "label",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}