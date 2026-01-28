import type * as $Fields from './fields.js'

export * as TeamMembershipCreateInput from './fields.js'

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
export interface TeamMembershipCreateInput {
kind: "InputObject",
name: "TeamMembershipCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
userId: $Fields.userId,
teamId: $Fields.teamId,
owner: $Fields.owner,
sortOrder: $Fields.sortOrder
},
type: {
id?: $Fields.id['type'],
userId: $Fields.userId['type'],
teamId: $Fields.teamId['type'],
owner?: $Fields.owner['type'],
sortOrder?: $Fields.sortOrder['type']
}
}