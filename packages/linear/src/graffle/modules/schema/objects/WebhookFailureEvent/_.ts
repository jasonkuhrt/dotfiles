import type * as $Fields from './fields.js'

export * as WebhookFailureEvent from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Entity representing a webhook execution failure.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 7 |
*/
export interface WebhookFailureEvent {
kind: "Object",
name: "WebhookFailureEvent",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
webhook: $Fields.webhook,
url: $Fields.url,
httpStatus: $Fields.httpStatus,
responseOrError: $Fields.responseOrError,
executionId: $Fields.executionId
}
}