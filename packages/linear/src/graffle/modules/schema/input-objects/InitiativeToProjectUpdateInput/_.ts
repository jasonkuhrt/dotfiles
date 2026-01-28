import type * as $Fields from './fields.js'

export * as InitiativeToProjectUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* The properties of the initiativeToProject to update.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 1 |
* | **All Fields Nullable** | Yes |
*/
export interface InitiativeToProjectUpdateInput {
kind: "InputObject",
name: "InitiativeToProjectUpdateInput",
isAllFieldsNullable: true,
fields: {
sortOrder: $Fields.sortOrder
},
type: {
sortOrder?: $Fields.sortOrder['type']
}
}