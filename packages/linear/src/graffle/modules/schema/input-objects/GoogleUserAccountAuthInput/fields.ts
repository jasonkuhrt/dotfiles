import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GoogleUserAccountAuthInput}.
*
* Code returned from Google's OAuth flow.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GoogleUserAccountAuthInput} |
* | **Path** | `GoogleUserAccountAuthInput.code` |
* | **Nullability** | Required |
*/
export interface code {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GoogleUserAccountAuthInput}.
*
* The URI to redirect the user to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GoogleUserAccountAuthInput} |
* | **Path** | `GoogleUserAccountAuthInput.redirectUri` |
* | **Nullability** | Optional |
*/
export interface redirectUri {
kind: "InputField",
name: "redirectUri",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GoogleUserAccountAuthInput}.
*
* The timezone of the user's browser.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GoogleUserAccountAuthInput} |
* | **Path** | `GoogleUserAccountAuthInput.timezone` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GoogleUserAccountAuthInput}.
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
* | **Parent** | {@link $Schema.GoogleUserAccountAuthInput} |
* | **Path** | `GoogleUserAccountAuthInput.teamIdsToJoin` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GoogleUserAccountAuthInput}.
*
* Signup code.
*
* @deprecated Not used anymore
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GoogleUserAccountAuthInput} |
* | **Path** | `GoogleUserAccountAuthInput.signupCode` |
* | **⚠ Deprecated** | Not used anymore |
* | **Nullability** | Optional |
*/
export interface signupCode {
kind: "InputField",
name: "signupCode",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GoogleUserAccountAuthInput}.
*
* An optional invite link for an organization used to populate available organizations.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GoogleUserAccountAuthInput} |
* | **Path** | `GoogleUserAccountAuthInput.inviteLink` |
* | **Nullability** | Optional |
*/
export interface inviteLink {
kind: "InputField",
name: "inviteLink",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GoogleUserAccountAuthInput}.
*
* An optional parameter to disable new user signup and force login. Default: false.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GoogleUserAccountAuthInput} |
* | **Path** | `GoogleUserAccountAuthInput.disallowSignup` |
* | **Nullability** | Optional |
*/
export interface disallowSignup {
kind: "InputField",
name: "disallowSignup",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}