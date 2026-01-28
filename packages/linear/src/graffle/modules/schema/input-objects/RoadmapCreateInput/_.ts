import type * as $Fields from './fields.js'

export * as RoadmapCreateInput from './fields.js'

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
export interface RoadmapCreateInput {
kind: "InputObject",
name: "RoadmapCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
name: $Fields.name,
description: $Fields.description,
ownerId: $Fields.ownerId,
sortOrder: $Fields.sortOrder,
color: $Fields.color
},
type: {
id?: $Fields.id['type'],
name: $Fields.name['type'],
description?: $Fields.description['type'],
ownerId?: $Fields.ownerId['type'],
sortOrder?: $Fields.sortOrder['type'],
color?: $Fields.color['type']
}
}