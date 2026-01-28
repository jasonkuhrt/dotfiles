import type * as $Fields from './fields.js'

export * as AgentActivityCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 7 |
* | **All Fields Nullable** | Yes |
*/
export interface AgentActivityCreateInput {
kind: "InputObject",
name: "AgentActivityCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
agentSessionId: $Fields.agentSessionId,
signal: $Fields.signal,
signalMetadata: $Fields.signalMetadata,
contextualMetadata: $Fields.contextualMetadata,
content: $Fields.content,
ephemeral: $Fields.ephemeral
},
type: {
id?: $Fields.id['type'],
agentSessionId: $Fields.agentSessionId['type'],
signal?: $Fields.signal['type'],
signalMetadata?: $Fields.signalMetadata['type'],
contextualMetadata?: $Fields.contextualMetadata['type'],
content: $Fields.content['type'],
ephemeral?: $Fields.ephemeral['type']
}
}