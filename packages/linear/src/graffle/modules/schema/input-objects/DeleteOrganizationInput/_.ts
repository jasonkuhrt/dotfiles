import type * as $Fields from './fields.js'

export * as DeleteOrganizationInput from './fields.js'

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
export interface DeleteOrganizationInput {
kind: "InputObject",
name: "DeleteOrganizationInput",
isAllFieldsNullable: false,
fields: {
deletionCode: $Fields.deletionCode
},
type: {
deletionCode: $Fields.deletionCode['type']
}
}