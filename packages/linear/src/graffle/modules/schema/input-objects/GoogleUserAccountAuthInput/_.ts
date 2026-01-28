import type * as $Fields from './fields.js'

export * as GoogleUserAccountAuthInput from './fields.js'

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
export interface GoogleUserAccountAuthInput {
kind: "InputObject",
name: "GoogleUserAccountAuthInput",
isAllFieldsNullable: true,
fields: {
code: $Fields.code,
redirectUri: $Fields.redirectUri,
timezone: $Fields.timezone,
teamIdsToJoin: $Fields.teamIdsToJoin,
signupCode: $Fields.signupCode,
inviteLink: $Fields.inviteLink,
disallowSignup: $Fields.disallowSignup
},
type: {
code: $Fields.code['type'],
redirectUri?: $Fields.redirectUri['type'],
timezone: $Fields.timezone['type'],
teamIdsToJoin?: $Fields.teamIdsToJoin['type'],
signupCode?: $Fields.signupCode['type'],
inviteLink?: $Fields.inviteLink['type'],
disallowSignup?: $Fields.disallowSignup['type']
}
}