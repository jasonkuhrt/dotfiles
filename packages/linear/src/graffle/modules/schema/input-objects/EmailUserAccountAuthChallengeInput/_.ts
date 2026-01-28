import type * as $Fields from './fields.js'

export * as EmailUserAccountAuthChallengeInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 7 |
* | **All Fields Nullable** | Yes |
*/
export interface EmailUserAccountAuthChallengeInput {
kind: "InputObject",
name: "EmailUserAccountAuthChallengeInput",
isAllFieldsNullable: true,
fields: {
email: $Fields.email,
isDesktop: $Fields.isDesktop,
clientAuthCode: $Fields.clientAuthCode,
signupCode: $Fields.signupCode,
inviteLink: $Fields.inviteLink,
loginCodeOnly: $Fields.loginCodeOnly,
challengeResponse: $Fields.challengeResponse
},
type: {
email: $Fields.email['type'],
isDesktop?: $Fields.isDesktop['type'],
clientAuthCode?: $Fields.clientAuthCode['type'],
signupCode?: $Fields.signupCode['type'],
inviteLink?: $Fields.inviteLink['type'],
loginCodeOnly?: $Fields.loginCodeOnly['type'],
challengeResponse?: $Fields.challengeResponse['type']
}
}