import type * as $Fields from './fields.js'

export * as WorkflowState from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A state in a team workflow.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 12 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface WorkflowState {
kind: "Object",
name: "WorkflowState",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
name: $Fields.name,
color: $Fields.color,
description: $Fields.description,
position: $Fields.position,
type: $Fields.type,
team: $Fields.team,
inheritedFrom: $Fields.inheritedFrom,
issues: $Fields.issues
}
}