import type * as $Fields from './fields.js'

export * as AgentActivityFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Agent activity filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 8 |
* | **All Fields Nullable** | Yes |
*/
export interface AgentActivityFilter {
kind: "InputObject",
name: "AgentActivityFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
agentSessionId: $Fields.agentSessionId,
type: $Fields.type,
sourceComment: $Fields.sourceComment,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
agentSessionId?: $Fields.agentSessionId['type'],
type?: $Fields.type['type'],
sourceComment?: $Fields.sourceComment['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}