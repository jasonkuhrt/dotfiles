import type * as $Fields from './fields.js'

export * as TokenUserAccountAuthInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 5 |
* | **All Fields Nullable** | Yes |
*/
export interface TokenUserAccountAuthInput {
kind: "InputObject",
name: "TokenUserAccountAuthInput",
isAllFieldsNullable: true,
fields: {
email: $Fields.email,
token: $Fields.token,
timezone: $Fields.timezone,
teamIdsToJoin: $Fields.teamIdsToJoin,
inviteLink: $Fields.inviteLink
},
type: {
email: $Fields.email['type'],
token: $Fields.token['type'],
timezone: $Fields.timezone['type'],
teamIdsToJoin?: $Fields.teamIdsToJoin['type'],
inviteLink?: $Fields.inviteLink['type']
}
}