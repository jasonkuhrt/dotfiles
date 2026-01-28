import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"ExternalEntitySlackMetadata"`
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
value: "ExternalEntitySlackMetadata"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ExternalEntitySlackMetadata}.
*
* Whether the entity originated from Slack (not Linear).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ExternalEntitySlackMetadata} |
* | **Path** | `ExternalEntitySlackMetadata.isFromSlack` |
* | **Nullability** | Required |
*/
export interface isFromSlack {
kind: "OutputField",
name: "isFromSlack",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ExternalEntitySlackMetadata}.
*
* The id of the Slack channel.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ExternalEntitySlackMetadata} |
* | **Path** | `ExternalEntitySlackMetadata.channelId` |
* | **Nullability** | Optional |
*/
export interface channelId {
kind: "OutputField",
name: "channelId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ExternalEntitySlackMetadata}.
*
* The name of the Slack channel.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ExternalEntitySlackMetadata} |
* | **Path** | `ExternalEntitySlackMetadata.channelName` |
* | **Nullability** | Optional |
*/
export interface channelName {
kind: "OutputField",
name: "channelName",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ExternalEntitySlackMetadata}.
*
* The URL of the Slack message.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ExternalEntitySlackMetadata} |
* | **Path** | `ExternalEntitySlackMetadata.messageUrl` |
* | **Nullability** | Optional |
*/
export interface messageUrl {
kind: "OutputField",
name: "messageUrl",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}
