import type * as $Fields from './fields.js'

export * as AgentSessionExternalUrlInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Input for an external URL associated with an agent session.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | No |
*/
export interface AgentSessionExternalUrlInput {
kind: "InputObject",
name: "AgentSessionExternalUrlInput",
isAllFieldsNullable: false,
fields: {
url: $Fields.url,
label: $Fields.label
},
type: {
url: $Fields.url['type'],
label: $Fields.label['type']
}
}