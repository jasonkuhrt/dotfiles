import type * as $Fields from './fields.js'

export * as OrganizationInviteUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 1 |
* | **All Fields Nullable** | No |
*/
export interface OrganizationInviteUpdateInput {
kind: "InputObject",
name: "OrganizationInviteUpdateInput",
isAllFieldsNullable: false,
fields: {
teamIds: $Fields.teamIds
},
type: {
teamIds: $Fields.teamIds['type']
}
}