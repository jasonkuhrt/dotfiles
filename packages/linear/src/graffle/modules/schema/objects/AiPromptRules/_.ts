import type * as $Fields from './fields.js'

export * as AiPromptRules from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* AI prompt rules for a team.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 5 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface AiPromptRules {
kind: "Object",
name: "AiPromptRules",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
updatedBy: $Fields.updatedBy
}
}