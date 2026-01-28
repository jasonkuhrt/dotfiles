import type * as $Fields from './fields.js'

export * as OrganizationDomainCreateInput from './fields.js'

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
export interface OrganizationDomainCreateInput {
kind: "InputObject",
name: "OrganizationDomainCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
identityProviderId: $Fields.identityProviderId,
name: $Fields.name,
verificationEmail: $Fields.verificationEmail,
authType: $Fields.authType
},
type: {
id?: $Fields.id['type'],
identityProviderId?: $Fields.identityProviderId['type'],
name: $Fields.name['type'],
verificationEmail?: $Fields.verificationEmail['type'],
authType?: $Fields.authType['type']
}
}