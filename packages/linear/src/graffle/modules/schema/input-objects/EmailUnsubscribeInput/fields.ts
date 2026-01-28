import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailUnsubscribeInput}.
*
* Email type to unsubscribe from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailUnsubscribeInput} |
* | **Path** | `EmailUnsubscribeInput.type` |
* | **Nullability** | Required |
*/
export interface type {
kind: "InputField",
name: "type",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailUnsubscribeInput}.
*
* The user's email validation token.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailUnsubscribeInput} |
* | **Path** | `EmailUnsubscribeInput.token` |
* | **Nullability** | Required |
*/
export interface token {
kind: "InputField",
name: "token",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailUnsubscribeInput}.
*
* The identifier of the user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailUnsubscribeInput} |
* | **Path** | `EmailUnsubscribeInput.userId` |
* | **Nullability** | Required |
*/
export interface userId {
kind: "InputField",
name: "userId",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}