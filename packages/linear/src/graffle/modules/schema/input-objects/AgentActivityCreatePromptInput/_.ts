import type * as $Fields from './fields.js'

export * as AgentActivityCreatePromptInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* [Internal] Input for creating prompt-type agent activities (created by users).
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 7 |
* | **All Fields Nullable** | Yes |
*/
export interface AgentActivityCreatePromptInput {
kind: "InputObject",
name: "AgentActivityCreatePromptInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
agentSessionId: $Fields.agentSessionId,
signal: $Fields.signal,
signalMetadata: $Fields.signalMetadata,
contextualMetadata: $Fields.contextualMetadata,
content: $Fields.content,
sourceCommentId: $Fields.sourceCommentId
},
type: {
id?: $Fields.id['type'],
agentSessionId: $Fields.agentSessionId['type'],
signal?: $Fields.signal['type'],
signalMetadata?: $Fields.signalMetadata['type'],
contextualMetadata?: $Fields.contextualMetadata['type'],
content: $Fields.content['type'],
sourceCommentId?: $Fields.sourceCommentId['type']
}
}