import type * as $Fields from './fields.js'

export * as TeamMembershipUpdateInput from './fields.js'

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
export interface TeamMembershipUpdateInput {
kind: "InputObject",
name: "TeamMembershipUpdateInput",
isAllFieldsNullable: true,
fields: {
owner: $Fields.owner,
sortOrder: $Fields.sortOrder
},
type: {
owner?: $Fields.owner['type'],
sortOrder?: $Fields.sortOrder['type']
}
}