import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"WebhookFailureEvent"`
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
value: "WebhookFailureEvent"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WebhookFailureEvent}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.WebhookFailureEvent} |
* | **Path** | `WebhookFailureEvent.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "OutputField",
name: "id",
arguments: {},
inlineType: [1, ],
namedType: $Schema.ID
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WebhookFailureEvent}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.WebhookFailureEvent} |
* | **Path** | `WebhookFailureEvent.createdAt` |
* | **Nullability** | Required |
*/
export interface createdAt {
kind: "OutputField",
name: "createdAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WebhookFailureEvent}.
*
* The webhook that this failure event is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Webhook}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.WebhookFailureEvent} |
* | **Path** | `WebhookFailureEvent.webhook` |
* | **Nullability** | Required |
*/
export interface webhook {
kind: "OutputField",
name: "webhook",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Webhook
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WebhookFailureEvent}.
*
* The URL that the webhook was trying to push to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.WebhookFailureEvent} |
* | **Path** | `WebhookFailureEvent.url` |
* | **Nullability** | Required |
*/
export interface url {
kind: "OutputField",
name: "url",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WebhookFailureEvent}.
*
* The HTTP status code returned by the recipient.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.WebhookFailureEvent} |
* | **Path** | `WebhookFailureEvent.httpStatus` |
* | **Nullability** | Optional |
*/
export interface httpStatus {
kind: "OutputField",
name: "httpStatus",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WebhookFailureEvent}.
*
* The HTTP response body returned by the recipient or error occured.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.WebhookFailureEvent} |
* | **Path** | `WebhookFailureEvent.responseOrError` |
* | **Nullability** | Optional |
*/
export interface responseOrError {
kind: "OutputField",
name: "responseOrError",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.WebhookFailureEvent}.
*
* The unique execution ID of the webhook push. This is retained between retries of the same push.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.WebhookFailureEvent} |
* | **Path** | `WebhookFailureEvent.executionId` |
* | **Nullability** | Required |
*/
export interface executionId {
kind: "OutputField",
name: "executionId",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}
