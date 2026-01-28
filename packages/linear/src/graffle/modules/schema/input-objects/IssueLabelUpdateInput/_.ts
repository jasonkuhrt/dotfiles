import type * as $Fields from './fields.js'

export * as IssueLabelUpdateInput from './fields.js'

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
export interface IssueLabelUpdateInput {
kind: "InputObject",
name: "IssueLabelUpdateInput",
isAllFieldsNullable: true,
fields: {
name: $Fields.name,
description: $Fields.description,
parentId: $Fields.parentId,
color: $Fields.color,
isGroup: $Fields.isGroup,
retiredAt: $Fields.retiredAt
},
type: {
name?: $Fields.name['type'],
description?: $Fields.description['type'],
parentId?: $Fields.parentId['type'],
color?: $Fields.color['type'],
isGroup?: $Fields.isGroup['type'],
retiredAt?: $Fields.retiredAt['type']
}
}