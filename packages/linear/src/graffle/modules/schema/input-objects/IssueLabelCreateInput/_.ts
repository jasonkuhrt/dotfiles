import type * as $Fields from './fields.js'

export * as IssueLabelCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 8 |
* | **All Fields Nullable** | Yes |
*/
export interface IssueLabelCreateInput {
kind: "InputObject",
name: "IssueLabelCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
name: $Fields.name,
description: $Fields.description,
color: $Fields.color,
parentId: $Fields.parentId,
teamId: $Fields.teamId,
isGroup: $Fields.isGroup,
retiredAt: $Fields.retiredAt
},
type: {
id?: $Fields.id['type'],
name: $Fields.name['type'],
description?: $Fields.description['type'],
color?: $Fields.color['type'],
parentId?: $Fields.parentId['type'],
teamId?: $Fields.teamId['type'],
isGroup?: $Fields.isGroup['type'],
retiredAt?: $Fields.retiredAt['type']
}
}