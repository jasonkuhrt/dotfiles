import type * as $Fields from './fields.js'

export * as InitiativeHistory from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A initiative history containing relevant change events.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 6 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface InitiativeHistory {
kind: "Object",
name: "InitiativeHistory",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
entries: $Fields.entries,
initiative: $Fields.initiative
}
}