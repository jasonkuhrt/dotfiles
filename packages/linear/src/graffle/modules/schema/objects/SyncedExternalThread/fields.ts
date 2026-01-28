import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"SyncedExternalThread"`
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
value: "SyncedExternalThread"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SyncedExternalThread}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SyncedExternalThread} |
* | **Path** | `SyncedExternalThread.id` |
* | **Nullability** | Optional |
*/
export interface id {
kind: "OutputField",
name: "id",
arguments: {},
inlineType: [0, ],
namedType: $Schema.ID
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SyncedExternalThread}.
*
* The type of the external source.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SyncedExternalThread} |
* | **Path** | `SyncedExternalThread.type` |
* | **Nullability** | Required |
*/
export interface type {
kind: "OutputField",
name: "type",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SyncedExternalThread}.
*
* The sub type of the external source.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SyncedExternalThread} |
* | **Path** | `SyncedExternalThread.subType` |
* | **Nullability** | Optional |
*/
export interface subType {
kind: "OutputField",
name: "subType",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SyncedExternalThread}.
*
* The display name of the source.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SyncedExternalThread} |
* | **Path** | `SyncedExternalThread.name` |
* | **Nullability** | Optional |
*/
export interface name {
kind: "OutputField",
name: "name",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SyncedExternalThread}.
*
* The display name of the thread.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SyncedExternalThread} |
* | **Path** | `SyncedExternalThread.displayName` |
* | **Nullability** | Optional |
*/
export interface displayName {
kind: "OutputField",
name: "displayName",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SyncedExternalThread}.
*
* The external url of the thread.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SyncedExternalThread} |
* | **Path** | `SyncedExternalThread.url` |
* | **Nullability** | Optional |
*/
export interface url {
kind: "OutputField",
name: "url",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SyncedExternalThread}.
*
* Whether this thread is syncing with the external service.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SyncedExternalThread} |
* | **Path** | `SyncedExternalThread.isConnected` |
* | **Nullability** | Required |
*/
export interface isConnected {
kind: "OutputField",
name: "isConnected",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SyncedExternalThread}.
*
* Whether the current user has the corresponding personal integration connected for the external service.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SyncedExternalThread} |
* | **Path** | `SyncedExternalThread.isPersonalIntegrationConnected` |
* | **Nullability** | Required |
*/
export interface isPersonalIntegrationConnected {
kind: "OutputField",
name: "isPersonalIntegrationConnected",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SyncedExternalThread}.
*
* Whether a connected personal integration is required to comment in this thread.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SyncedExternalThread} |
* | **Path** | `SyncedExternalThread.isPersonalIntegrationRequired` |
* | **Nullability** | Required |
*/
export interface isPersonalIntegrationRequired {
kind: "OutputField",
name: "isPersonalIntegrationRequired",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}
