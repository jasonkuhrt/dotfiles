import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"GitHubEnterpriseServerPayload"`
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
value: "GitHubEnterpriseServerPayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.GitHubEnterpriseServerPayload}.
*
* The identifier of the last sync operation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitHubEnterpriseServerPayload} |
* | **Path** | `GitHubEnterpriseServerPayload.lastSyncId` |
* | **Nullability** | Required |
*/
export interface lastSyncId {
kind: "OutputField",
name: "lastSyncId",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.GitHubEnterpriseServerPayload}.
*
* The integration that was created or updated.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Integration} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.GitHubEnterpriseServerPayload} |
* | **Path** | `GitHubEnterpriseServerPayload.integration` |
* | **Nullability** | Optional |
*/
export interface integration {
kind: "OutputField",
name: "integration",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Integration
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.GitHubEnterpriseServerPayload}.
*
* Whether the operation was successful.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitHubEnterpriseServerPayload} |
* | **Path** | `GitHubEnterpriseServerPayload.success` |
* | **Nullability** | Required |
*/
export interface success {
kind: "OutputField",
name: "success",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.GitHubEnterpriseServerPayload}.
*
* The setup address.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitHubEnterpriseServerPayload} |
* | **Path** | `GitHubEnterpriseServerPayload.setupUrl` |
* | **Nullability** | Required |
*/
export interface setupUrl {
kind: "OutputField",
name: "setupUrl",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.GitHubEnterpriseServerPayload}.
*
* The app install address.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitHubEnterpriseServerPayload} |
* | **Path** | `GitHubEnterpriseServerPayload.installUrl` |
* | **Nullability** | Required |
*/
export interface installUrl {
kind: "OutputField",
name: "installUrl",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.GitHubEnterpriseServerPayload}.
*
* The webhook secret to provide to GitHub.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitHubEnterpriseServerPayload} |
* | **Path** | `GitHubEnterpriseServerPayload.webhookSecret` |
* | **Nullability** | Required |
*/
export interface webhookSecret {
kind: "OutputField",
name: "webhookSecret",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}
