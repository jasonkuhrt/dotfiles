import type * as $Fields from './fields.js'

export * as RoadmapUpdateInput from './fields.js'

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
export interface RoadmapUpdateInput {
kind: "InputObject",
name: "RoadmapUpdateInput",
isAllFieldsNullable: true,
fields: {
name: $Fields.name,
description: $Fields.description,
ownerId: $Fields.ownerId,
sortOrder: $Fields.sortOrder,
color: $Fields.color
},
type: {
name?: $Fields.name['type'],
description?: $Fields.description['type'],
ownerId?: $Fields.ownerId['type'],
sortOrder?: $Fields.sortOrder['type'],
color?: $Fields.color['type']
}
}