import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"IntegrationHasScopesPayload"`
*
* {@link https://graphql.org/learn/queries/#meta-fields | GraphQL __typename documentation}
*/
export interface __typename {
kind: "OutputField",
name: "__typename",
arguments: {},
inlineType: [1],
namedType: {
kind: "__typename",
value: "IntegrationHasScopesPayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IntegrationHasScopesPayload}.
*
* Whether the integration has the required scopes.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationHasScopesPayload} |
* | **Path** | `IntegrationHasScopesPayload.hasAllScopes` |
* | **Nullability** | Required |
*/
export interface hasAllScopes {
kind: "OutputField",
name: "hasAllScopes",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IntegrationHasScopesPayload}.
*
* The missing scopes.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationHasScopesPayload} |
* | **Path** | `IntegrationHasScopesPayload.missingScopes` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface missingScopes {
kind: "OutputField",
name: "missingScopes",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.String
}
