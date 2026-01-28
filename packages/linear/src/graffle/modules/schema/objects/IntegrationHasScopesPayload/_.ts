import type * as $Fields from './fields.js'

export * as IntegrationHasScopesPayload from './fields.js'

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
export interface IntegrationHasScopesPayload {
kind: "Object",
name: "IntegrationHasScopesPayload",
fields: {
__typename: $Fields.__typename,
hasAllScopes: $Fields.hasAllScopes,
missingScopes: $Fields.missingScopes
}
}