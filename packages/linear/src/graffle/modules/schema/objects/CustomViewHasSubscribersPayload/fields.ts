import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"CustomViewHasSubscribersPayload"`
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
value: "CustomViewHasSubscribersPayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomViewHasSubscribersPayload}.
*
* Whether the custom view has subscribers.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomViewHasSubscribersPayload} |
* | **Path** | `CustomViewHasSubscribersPayload.hasSubscribers` |
* | **Nullability** | Required |
*/
export interface hasSubscribers {
kind: "OutputField",
name: "hasSubscribers",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}
