import type * as $Fields from './fields.js'

export * as JoinOrganizationInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | Yes |
*/
export interface JoinOrganizationInput {
kind: "InputObject",
name: "JoinOrganizationInput",
isAllFieldsNullable: true,
fields: {
organizationId: $Fields.organizationId,
inviteLink: $Fields.inviteLink
},
type: {
organizationId: $Fields.organizationId['type'],
inviteLink?: $Fields.inviteLink['type']
}
}