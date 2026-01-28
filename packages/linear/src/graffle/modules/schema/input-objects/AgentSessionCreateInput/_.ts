import type * as $Fields from './fields.js'

export * as AgentSessionCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface AgentSessionCreateInput {
kind: "InputObject",
name: "AgentSessionCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
issueId: $Fields.issueId,
appUserId: $Fields.appUserId,
context: $Fields.context
},
type: {
id?: $Fields.id['type'],
issueId?: $Fields.issueId['type'],
appUserId: $Fields.appUserId['type'],
context?: $Fields.context['type']
}
}