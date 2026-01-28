import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"ExternalEntityInfo"`
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
value: "ExternalEntityInfo"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ExternalEntityInfo}.
*
* The id of the external entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ExternalEntityInfo} |
* | **Path** | `ExternalEntityInfo.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "OutputField",
name: "id",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ExternalEntityInfo}.
*
* The name of the service this entity is synced with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ExternalSyncService}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.ExternalEntityInfo} |
* | **Path** | `ExternalEntityInfo.service` |
* | **Nullability** | Required |
*/
export interface service {
kind: "OutputField",
name: "service",
arguments: {},
inlineType: [1, ],
namedType: $Schema.ExternalSyncService
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ExternalEntityInfo}.
*
* Metadata about the external entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ExternalEntityInfoMetadata} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union ↗} |
* | **Parent** | {@link $Schema.ExternalEntityInfo} |
* | **Path** | `ExternalEntityInfo.metadata` |
* | **Nullability** | Optional |
*/
export interface metadata {
kind: "OutputField",
name: "metadata",
arguments: {},
inlineType: [0, ],
namedType: $Schema.ExternalEntityInfoMetadata
}
