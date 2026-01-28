import type * as $Fields from './fields.js'

export * as GitAutomationState from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A trigger that updates the issue status according to Git automations.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 9 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface GitAutomationState {
kind: "Object",
name: "GitAutomationState",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
state: $Fields.state,
team: $Fields.team,
targetBranch: $Fields.targetBranch,
event: $Fields.event,
branchPattern: $Fields.branchPattern
}
}