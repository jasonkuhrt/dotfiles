import type * as $Fields from './fields.js'

export * as InitiativeRelationCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface InitiativeRelationCreateInput {
kind: "InputObject",
name: "InitiativeRelationCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
initiativeId: $Fields.initiativeId,
relatedInitiativeId: $Fields.relatedInitiativeId,
sortOrder: $Fields.sortOrder
},
type: {
id?: $Fields.id['type'],
initiativeId: $Fields.initiativeId['type'],
relatedInitiativeId: $Fields.relatedInitiativeId['type'],
sortOrder?: $Fields.sortOrder['type']
}
}