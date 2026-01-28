import type * as $Fields from './fields.js'

export * as GitAutomationTargetBranch from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A Git target branch for which there are automations (GitAutomationState).
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 8 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface GitAutomationTargetBranch {
kind: "Object",
name: "GitAutomationTargetBranch",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
team: $Fields.team,
branchPattern: $Fields.branchPattern,
isRegex: $Fields.isRegex,
automationStates: $Fields.automationStates
}
}