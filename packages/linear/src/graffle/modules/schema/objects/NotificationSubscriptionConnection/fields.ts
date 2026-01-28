import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"NotificationSubscriptionConnection"`
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
value: "NotificationSubscriptionConnection"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationSubscriptionConnection}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationSubscriptionEdge}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationSubscriptionConnection} |
* | **Path** | `NotificationSubscriptionConnection.edges` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface edges {
kind: "OutputField",
name: "edges",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.NotificationSubscriptionEdge
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationSubscriptionConnection}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationSubscription}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface ↗} |
* | **Parent** | {@link $Schema.NotificationSubscriptionConnection} |
* | **Path** | `NotificationSubscriptionConnection.nodes` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface nodes {
kind: "OutputField",
name: "nodes",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.NotificationSubscription
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.NotificationSubscriptionConnection}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PageInfo}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.NotificationSubscriptionConnection} |
* | **Path** | `NotificationSubscriptionConnection.pageInfo` |
* | **Nullability** | Required |
*/
export interface pageInfo {
kind: "OutputField",
name: "pageInfo",
arguments: {},
inlineType: [1, ],
namedType: $Schema.PageInfo
}
