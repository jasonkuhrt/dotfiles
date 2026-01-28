import type * as $Fields from './fields.js'

export * as OrganizationDomainUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 1 |
* | **All Fields Nullable** | Yes |
*/
export interface OrganizationDomainUpdateInput {
kind: "InputObject",
name: "OrganizationDomainUpdateInput",
isAllFieldsNullable: true,
fields: {
disableOrganizationCreation: $Fields.disableOrganizationCreation
},
type: {
disableOrganizationCreation?: $Fields.disableOrganizationCreation['type']
}
}