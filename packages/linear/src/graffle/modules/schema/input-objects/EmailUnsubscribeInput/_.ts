import type * as $Fields from './fields.js'

export * as EmailUnsubscribeInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | No |
*/
export interface EmailUnsubscribeInput {
kind: "InputObject",
name: "EmailUnsubscribeInput",
isAllFieldsNullable: false,
fields: {
type: $Fields.type,
token: $Fields.token,
userId: $Fields.userId
},
type: {
type: $Fields.type['type'],
token: $Fields.token['type'],
userId: $Fields.userId['type']
}
}