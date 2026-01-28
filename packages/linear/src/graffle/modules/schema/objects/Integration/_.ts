import type * as $Fields from './fields.js'

export * as Integration from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* An integration with an external service.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 8 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface Integration {
kind: "Object",
name: "Integration",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
service: $Fields.service,
organization: $Fields.organization,
team: $Fields.team,
creator: $Fields.creator
}
}