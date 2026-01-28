import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailUserAccountAuthChallengeInput}.
*
* The email for which to generate the magic login code.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailUserAccountAuthChallengeInput} |
* | **Path** | `EmailUserAccountAuthChallengeInput.email` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailUserAccountAuthChallengeInput}.
*
* Whether the login was requested from the desktop app.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailUserAccountAuthChallengeInput} |
* | **Path** | `EmailUserAccountAuthChallengeInput.isDesktop` |
* | **Nullability** | Optional |
*/
export interface isDesktop {
kind: "InputField",
name: "isDesktop",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailUserAccountAuthChallengeInput}.
*
* Auth code for the client initiating the sequence.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailUserAccountAuthChallengeInput} |
* | **Path** | `EmailUserAccountAuthChallengeInput.clientAuthCode` |
* | **Nullability** | Optional |
*/
export interface clientAuthCode {
kind: "InputField",
name: "clientAuthCode",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailUserAccountAuthChallengeInput}.
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
* | **Parent** | {@link $Schema.EmailUserAccountAuthChallengeInput} |
* | **Path** | `EmailUserAccountAuthChallengeInput.signupCode` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailUserAccountAuthChallengeInput}.
*
* The organization invite link to associate with this authentication.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailUserAccountAuthChallengeInput} |
* | **Path** | `EmailUserAccountAuthChallengeInput.inviteLink` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailUserAccountAuthChallengeInput}.
*
* Whether to only return the login code. This is used by mobile apps to skip showing the login link.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailUserAccountAuthChallengeInput} |
* | **Path** | `EmailUserAccountAuthChallengeInput.loginCodeOnly` |
* | **Nullability** | Optional |
*/
export interface loginCodeOnly {
kind: "InputField",
name: "loginCodeOnly",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailUserAccountAuthChallengeInput}.
*
* Response from the login challenge.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailUserAccountAuthChallengeInput} |
* | **Path** | `EmailUserAccountAuthChallengeInput.challengeResponse` |
* | **Nullability** | Optional |
*/
export interface challengeResponse {
kind: "InputField",
name: "challengeResponse",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}