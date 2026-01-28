import type * as $Fields from './fields.js'

export * as TriageResponsibility from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A team's triage responsibility.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 9 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface TriageResponsibility {
kind: "Object",
name: "TriageResponsibility",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
action: $Fields.action,
manualSelection: $Fields.manualSelection,
team: $Fields.team,
timeSchedule: $Fields.timeSchedule,
currentUser: $Fields.currentUser
}
}