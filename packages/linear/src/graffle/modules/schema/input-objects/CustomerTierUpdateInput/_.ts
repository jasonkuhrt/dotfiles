import type * as $Fields from './fields.js'

export * as CustomerTierUpdateInput from './fields.js'

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
export interface CustomerTierUpdateInput {
kind: "InputObject",
name: "CustomerTierUpdateInput",
isAllFieldsNullable: true,
fields: {
name: $Fields.name,
color: $Fields.color,
description: $Fields.description,
position: $Fields.position,
displayName: $Fields.displayName
},
type: {
name?: $Fields.name['type'],
color?: $Fields.color['type'],
description?: $Fields.description['type'],
position?: $Fields.position['type'],
displayName?: $Fields.displayName['type']
}
}