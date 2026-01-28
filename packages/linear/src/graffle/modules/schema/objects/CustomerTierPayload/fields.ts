import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"CustomerTierPayload"`
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
value: "CustomerTierPayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerTierPayload}.
*
* The identifier of the last sync operation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerTierPayload} |
* | **Path** | `CustomerTierPayload.lastSyncId` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerTierPayload}.
*
* The customer tier that was created or updated.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerTier}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomerTierPayload} |
* | **Path** | `CustomerTierPayload.tier` |
* | **Nullability** | Required |
*/
export interface tier {
kind: "OutputField",
name: "tier",
arguments: {},
inlineType: [1, ],
namedType: $Schema.CustomerTier
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerTierPayload}.
*
* Whether the operation was successful.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerTierPayload} |
* | **Path** | `CustomerTierPayload.success` |
* | **Nullability** | Required |
*/
export interface success {
kind: "OutputField",
name: "success",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}
