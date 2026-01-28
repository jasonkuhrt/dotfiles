import type * as $Fields from './fields.js'

export * as TriageResponsibilityManualSelection from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 2 |
*/
export interface TriageResponsibilityManualSelection {
kind: "Object",
name: "TriageResponsibilityManualSelection",
fields: {
__typename: $Fields.__typename,
userIds: $Fields.userIds,
assignmentIndex: $Fields.assignmentIndex
}
}