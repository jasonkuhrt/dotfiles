import type * as $Fields from './fields.js'

export * as InitiativeCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* The properties of the initiative to create.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 11 |
* | **All Fields Nullable** | Yes |
*/
export interface InitiativeCreateInput {
kind: "InputObject",
name: "InitiativeCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
name: $Fields.name,
description: $Fields.description,
ownerId: $Fields.ownerId,
sortOrder: $Fields.sortOrder,
color: $Fields.color,
icon: $Fields.icon,
status: $Fields.status,
targetDate: $Fields.targetDate,
targetDateResolution: $Fields.targetDateResolution,
content: $Fields.content
},
type: {
id?: $Fields.id['type'],
name: $Fields.name['type'],
description?: $Fields.description['type'],
ownerId?: $Fields.ownerId['type'],
sortOrder?: $Fields.sortOrder['type'],
color?: $Fields.color['type'],
icon?: $Fields.icon['type'],
status?: $Fields.status['type'],
targetDate?: $Fields.targetDate['type'],
targetDateResolution?: $Fields.targetDateResolution['type'],
content?: $Fields.content['type']
}
}