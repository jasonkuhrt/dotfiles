import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TokenUserAccountAuthInput}.
*
* The email which to login via the magic login code.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TokenUserAccountAuthInput} |
* | **Path** | `TokenUserAccountAuthInput.email` |
* | **Nullability** | Required |
*/
export interface email {
kind: "InputField",
name: "email",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TokenUserAccountAuthInput}.
*
* The magic login code.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TokenUserAccountAuthInput} |
* | **Path** | `TokenUserAccountAuthInput.token` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TokenUserAccountAuthInput}.
*
* The timezone of the user's browser.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TokenUserAccountAuthInput} |
* | **Path** | `TokenUserAccountAuthInput.timezone` |
* | **Nullability** | Required |
*/
export interface timezone {
kind: "InputField",
name: "timezone",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TokenUserAccountAuthInput}.
*
* The identifiers of the teams to auto-join.
*
* @deprecated Not used anymore
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TokenUserAccountAuthInput} |
* | **Path** | `TokenUserAccountAuthInput.teamIdsToJoin` |
* | **⚠ Deprecated** | Not used anymore |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface teamIdsToJoin {
kind: "InputField",
name: "teamIdsToJoin",
inlineType: [0, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TokenUserAccountAuthInput}.
*
* An optional invite link for an organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TokenUserAccountAuthInput} |
* | **Path** | `TokenUserAccountAuthInput.inviteLink` |
* | **Nullability** | Optional |
*/
export interface inviteLink {
kind: "InputField",
name: "inviteLink",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}