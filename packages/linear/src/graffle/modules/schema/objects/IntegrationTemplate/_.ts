import type * as $Fields from './fields.js'

export * as IntegrationTemplate from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Join table between templates and integrations.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 7 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface IntegrationTemplate {
kind: "Object",
name: "IntegrationTemplate",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
template: $Fields.template,
integration: $Fields.integration,
foreignEntityId: $Fields.foreignEntityId
}
}