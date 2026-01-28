import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"EmailUserAccountAuthChallengeResponse"`
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
value: "EmailUserAccountAuthChallengeResponse"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailUserAccountAuthChallengeResponse}.
*
* Whether the operation was successful.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailUserAccountAuthChallengeResponse} |
* | **Path** | `EmailUserAccountAuthChallengeResponse.success` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailUserAccountAuthChallengeResponse}.
*
* Supported challenge for this user account. Can be either verificationCode or password.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailUserAccountAuthChallengeResponse} |
* | **Path** | `EmailUserAccountAuthChallengeResponse.authType` |
* | **Nullability** | Required |
*/
export interface authType {
kind: "OutputField",
name: "authType",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}
