import type * as $Fields from './fields.js'

export * as RoadmapToProjectCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface RoadmapToProjectCreateInput {
kind: "InputObject",
name: "RoadmapToProjectCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
projectId: $Fields.projectId,
roadmapId: $Fields.roadmapId,
sortOrder: $Fields.sortOrder
},
type: {
id?: $Fields.id['type'],
projectId: $Fields.projectId['type'],
roadmapId: $Fields.roadmapId['type'],
sortOrder?: $Fields.sortOrder['type']
}
}