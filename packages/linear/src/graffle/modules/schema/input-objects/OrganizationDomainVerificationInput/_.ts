import type * as $Fields from './fields.js'

export * as OrganizationDomainVerificationInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | No |
*/
export interface OrganizationDomainVerificationInput {
kind: "InputObject",
name: "OrganizationDomainVerificationInput",
isAllFieldsNullable: false,
fields: {
organizationDomainId: $Fields.organizationDomainId,
verificationCode: $Fields.verificationCode
},
type: {
organizationDomainId: $Fields.organizationDomainId['type'],
verificationCode: $Fields.verificationCode['type']
}
}