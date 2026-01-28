import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"CustomerNeedUpdatePayload"`
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
value: "CustomerNeedUpdatePayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerNeedUpdatePayload}.
*
* The identifier of the last sync operation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedUpdatePayload} |
* | **Path** | `CustomerNeedUpdatePayload.lastSyncId` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerNeedUpdatePayload}.
*
* The customer need that was created or updated.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeed}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomerNeedUpdatePayload} |
* | **Path** | `CustomerNeedUpdatePayload.need` |
* | **Nullability** | Required |
*/
export interface need {
kind: "OutputField",
name: "need",
arguments: {},
inlineType: [1, ],
namedType: $Schema.CustomerNeed
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerNeedUpdatePayload}.
*
* Whether the operation was successful.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomerNeedUpdatePayload} |
* | **Path** | `CustomerNeedUpdatePayload.success` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomerNeedUpdatePayload}.
*
* The related customer needs that were updated.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeed}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomerNeedUpdatePayload} |
* | **Path** | `CustomerNeedUpdatePayload.updatedRelatedNeeds` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface updatedRelatedNeeds {
kind: "OutputField",
name: "updatedRelatedNeeds",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.CustomerNeed
}
