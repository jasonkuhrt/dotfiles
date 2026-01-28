import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ContactCreateInput}.
*
* The type of support contact.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ContactCreateInput} |
* | **Path** | `ContactCreateInput.type` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ContactCreateInput}.
*
* The message the user sent.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ContactCreateInput} |
* | **Path** | `ContactCreateInput.message` |
* | **Nullability** | Required |
*/
export interface message {
kind: "InputField",
name: "message",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ContactCreateInput}.
*
* User's operating system.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ContactCreateInput} |
* | **Path** | `ContactCreateInput.operatingSystem` |
* | **Nullability** | Optional |
*/
export interface operatingSystem {
kind: "InputField",
name: "operatingSystem",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ContactCreateInput}.
*
* User's browser information.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ContactCreateInput} |
* | **Path** | `ContactCreateInput.browser` |
* | **Nullability** | Optional |
*/
export interface browser {
kind: "InputField",
name: "browser",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ContactCreateInput}.
*
* User's device information.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ContactCreateInput} |
* | **Path** | `ContactCreateInput.device` |
* | **Nullability** | Optional |
*/
export interface device {
kind: "InputField",
name: "device",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ContactCreateInput}.
*
* User's Linear client information.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ContactCreateInput} |
* | **Path** | `ContactCreateInput.clientVersion` |
* | **Nullability** | Optional |
*/
export interface clientVersion {
kind: "InputField",
name: "clientVersion",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ContactCreateInput}.
*
* How disappointed the user would be if they could no longer use Linear.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Int} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ContactCreateInput} |
* | **Path** | `ContactCreateInput.disappointmentRating` |
* | **Nullability** | Optional |
*/
export interface disappointmentRating {
kind: "InputField",
name: "disappointmentRating",
inlineType: [0, ],
namedType: $Schema.Int,
type: $Schema.Int['codec']['_typeDecoded'] | null | undefined
}