import type * as $Fields from './fields.js'

export * as InitiativeUpdateCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 6 |
* | **All Fields Nullable** | Yes |
*/
export interface InitiativeUpdateCreateInput {
kind: "InputObject",
name: "InitiativeUpdateCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
body: $Fields.body,
bodyData: $Fields.bodyData,
health: $Fields.health,
initiativeId: $Fields.initiativeId,
isDiffHidden: $Fields.isDiffHidden
},
type: {
id?: $Fields.id['type'],
body?: $Fields.body['type'],
bodyData?: $Fields.bodyData['type'],
health?: $Fields.health['type'],
initiativeId: $Fields.initiativeId['type'],
isDiffHidden?: $Fields.isDiffHidden['type']
}
}