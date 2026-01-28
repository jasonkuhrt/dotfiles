import type * as $Fields from './fields.js'

export * as IssueStateSpan from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A continuous period of time during which an issue remained in a specific workflow state.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 5 |
*/
export interface IssueStateSpan {
kind: "Object",
name: "IssueStateSpan",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
stateId: $Fields.stateId,
startedAt: $Fields.startedAt,
endedAt: $Fields.endedAt,
state: $Fields.state
}
}