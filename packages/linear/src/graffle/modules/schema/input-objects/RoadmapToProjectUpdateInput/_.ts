import type * as $Fields from './fields.js'

export * as RoadmapToProjectUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 1 |
* | **All Fields Nullable** | Yes |
*/
export interface RoadmapToProjectUpdateInput {
kind: "InputObject",
name: "RoadmapToProjectUpdateInput",
isAllFieldsNullable: true,
fields: {
sortOrder: $Fields.sortOrder
},
type: {
sortOrder?: $Fields.sortOrder['type']
}
}