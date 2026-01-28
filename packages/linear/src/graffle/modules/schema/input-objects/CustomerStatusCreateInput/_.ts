import type * as $Fields from './fields.js'

export * as CustomerStatusCreateInput from './fields.js'

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
export interface CustomerStatusCreateInput {
kind: "InputObject",
name: "CustomerStatusCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
name: $Fields.name,
color: $Fields.color,
description: $Fields.description,
position: $Fields.position,
displayName: $Fields.displayName
},
type: {
id?: $Fields.id['type'],
name?: $Fields.name['type'],
color: $Fields.color['type'],
description?: $Fields.description['type'],
position?: $Fields.position['type'],
displayName?: $Fields.displayName['type']
}
}