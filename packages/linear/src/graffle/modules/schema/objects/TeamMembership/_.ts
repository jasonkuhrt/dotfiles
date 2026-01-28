import type * as $Fields from './fields.js'

export * as TeamMembership from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Defines the membership of a user to a team.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 8 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface TeamMembership {
kind: "Object",
name: "TeamMembership",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
user: $Fields.user,
team: $Fields.team,
owner: $Fields.owner,
sortOrder: $Fields.sortOrder
}
}