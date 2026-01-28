import type * as $Fields from './fields.js'

export * as ContactSalesCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* [INTERNAL] Input for sending a message to the Linear Sales team.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 6 |
* | **All Fields Nullable** | Yes |
*/
export interface ContactSalesCreateInput {
kind: "InputObject",
name: "ContactSalesCreateInput",
isAllFieldsNullable: true,
fields: {
name: $Fields.name,
email: $Fields.email,
companySize: $Fields.companySize,
message: $Fields.message,
url: $Fields.url,
distinctId: $Fields.distinctId
},
type: {
name: $Fields.name['type'],
email: $Fields.email['type'],
companySize?: $Fields.companySize['type'],
message?: $Fields.message['type'],
url?: $Fields.url['type'],
distinctId?: $Fields.distinctId['type']
}
}