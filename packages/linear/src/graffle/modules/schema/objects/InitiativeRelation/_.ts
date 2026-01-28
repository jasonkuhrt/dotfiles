import type * as $Fields from './fields.js'

export * as InitiativeRelation from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A relation representing the dependency between two initiatives.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 8 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface InitiativeRelation {
kind: "Object",
name: "InitiativeRelation",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
initiative: $Fields.initiative,
relatedInitiative: $Fields.relatedInitiative,
user: $Fields.user,
sortOrder: $Fields.sortOrder
}
}