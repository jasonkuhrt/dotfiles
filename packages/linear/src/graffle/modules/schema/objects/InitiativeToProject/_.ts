import type * as $Fields from './fields.js'

export * as InitiativeToProject from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Join table between projects and initiatives.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 7 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface InitiativeToProject {
kind: "Object",
name: "InitiativeToProject",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
project: $Fields.project,
initiative: $Fields.initiative,
sortOrder: $Fields.sortOrder
}
}