import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"AsksChannelConnectPayload"`
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
value: "AsksChannelConnectPayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AsksChannelConnectPayload}.
*
* The identifier of the last sync operation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AsksChannelConnectPayload} |
* | **Path** | `AsksChannelConnectPayload.lastSyncId` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AsksChannelConnectPayload}.
*
* The integration that was created or updated.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Integration} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.AsksChannelConnectPayload} |
* | **Path** | `AsksChannelConnectPayload.integration` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AsksChannelConnectPayload}.
*
* Whether the operation was successful.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AsksChannelConnectPayload} |
* | **Path** | `AsksChannelConnectPayload.success` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AsksChannelConnectPayload}.
*
* The new Asks Slack channel mapping for the connected channel.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SlackChannelNameMapping}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.AsksChannelConnectPayload} |
* | **Path** | `AsksChannelConnectPayload.mapping` |
* | **Nullability** | Required |
*/
export interface mapping {
kind: "OutputField",
name: "mapping",
arguments: {},
inlineType: [1, ],
namedType: $Schema.SlackChannelNameMapping
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AsksChannelConnectPayload}.
*
* Whether the bot needs to be manually added to the channel.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AsksChannelConnectPayload} |
* | **Path** | `AsksChannelConnectPayload.addBot` |
* | **Nullability** | Required |
*/
export interface addBot {
kind: "OutputField",
name: "addBot",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}
