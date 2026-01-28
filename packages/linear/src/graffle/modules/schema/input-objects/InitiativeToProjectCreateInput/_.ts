import type * as $Fields from './fields.js'

export * as InitiativeToProjectCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* The properties of the initiativeToProject to create.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface InitiativeToProjectCreateInput {
kind: "InputObject",
name: "InitiativeToProjectCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
projectId: $Fields.projectId,
initiativeId: $Fields.initiativeId,
sortOrder: $Fields.sortOrder
},
type: {
id?: $Fields.id['type'],
projectId: $Fields.projectId['type'],
initiativeId: $Fields.initiativeId['type'],
sortOrder?: $Fields.sortOrder['type']
}
}